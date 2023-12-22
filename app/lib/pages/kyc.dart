import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:mime/mime.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/helpers/functions.dart';
import 'package:room_rent/helpers/handle_response.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/widgets/multiple_image_picker.dart';
import 'package:http_parser/http_parser.dart';
import 'package:flutter_holo_date_picker/flutter_holo_date_picker.dart';
import 'package:http/http.dart' as http;

import '../api/constants.dart';

class MyKYC extends StatefulWidget {
  const MyKYC({super.key});

  @override
  State<MyKYC> createState() => _MyKYCState();
}

class _MyKYCState extends State<MyKYC> {
  final _formKey = GlobalKey<FormState>();
  String typeValue = 'MALE';
  String typeValueForProvince = 'Province_1';
  DateTime? _selectedDate;

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _genderController = TextEditingController();
  final TextEditingController _dobController = TextEditingController();
  final TextEditingController _fatherNameHusbandNameController =
      TextEditingController();
  final TextEditingController _grandFatherFatherInLawController =
      TextEditingController();
  final TextEditingController _spouseNameController = TextEditingController();
  final TextEditingController _occupationController = TextEditingController();
  final TextEditingController _panNumberController = TextEditingController();
  final TextEditingController _landlineNumberController =
      TextEditingController();
  final TextEditingController _provinceController = TextEditingController();
  final TextEditingController _districtController = TextEditingController();
  final TextEditingController _mobileNumberController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _permanentAddressController =
      TextEditingController();
  final TextEditingController _temporaryAddressController =
      TextEditingController();

  List<XFile> selectedImages = [];

  /* error message */
  String? _nameErrorMessage;
  final String _dobErrorMessage = '*choose appropriate dob';
  String? _fatherNameHusbandNameErrorMessage;
  String? _grandFatherFatherInLawErrorMessage;
  String? _spouseNameErrorMessage;
  String? _occupationErrorMessage;
  String? _panNumberErrorMessage;
  String? _landlineNumberErrorMessage;
  String? _districtErrorMessage;
  String? _mobileNumberErrorMessage;
  String? _cityErrorMessage;
  String? _permanentAddressErrorMessage;
  String? _temporaryAddressErrorMessage;

  Future<void> _addKYC() async {
    try {
      if (_formKey.currentState!.validate()) {
        var headers = {
          'Content-Type': 'multipart/form-data',
        }..addAll(getSessionCookieHeader());

        var request =
            http.MultipartRequest('POST', Uri.parse('$BASE_URL/auth/kyc'));

        request.headers.addAll(headers);
        request.fields.addAll({
          "name": _nameController.text.toString(),
          "occupation": _occupationController.text.toString(),
          "dob": _dobController.text.toString(),
          "fatherName_husbandName":
              _fatherNameHusbandNameController.text.toString(),
          "grandFather_fatherInLaw":
              _grandFatherFatherInLawController.text.toString(),
          "panNumber": _panNumberController.text.toString(),
          "spouseName": _spouseNameController.text.toString(),
          "landlineNumber": _landlineNumberController.text.toString(),
          "district": _districtController.text.toString(),
          "mobileNumber": _mobileNumberController.text.toString(),
          "city": _cityController.text.toString(),
          "permanentAddress": _permanentAddressController.text.toString(),
          "temporaryAddress": _temporaryAddressController.text.toString(),
          "province": _provinceController.text,
          "gender": _genderController.text
        });

        if (selectedImages.isNotEmpty) {
          for (var chosenImage in selectedImages) {
            request.files.add(
              await http.MultipartFile.fromPath(
                "files",
                chosenImage.path,
                contentType: MediaType.parse(
                  lookupMimeType(chosenImage.path)!,
                ),
              ),
            );
          }
        }

        http.Response response =
            await http.Response.fromStream(await request.send());

        await handleResponse(response);

        if (response.statusCode == 201) {
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text("KYC Verified  ✅")));
          Navigator.of(context).pop();
        } else {
          print('Error = ${response.statusCode}');
          print('Error = ${response.reasonPhrase}');
        }
      } else {
        throw Exception("Invalid data");
      }
    } catch (e, stackTrace) {
      debugPrint('Error: $e');
      debugPrint('Error: $stackTrace');
    }

    // try {
    //   var headers = {
    //     'Content-Type': 'application/json',
    //   };
    //   headers.addAll(getSessionCookieHeader());

    //   http.Response response = await http.post(
    //     Uri.parse('$BASE_URL/auth/kyc'),
    //     body: json.encode({
    //       "name": _nameController.text.toString(),
    //       "occupation": _occupationController.text.toString(),
    //       "dob": _dobController.text.toString(),
    //       "fatherName_husbandName":
    //           _fatherNameHusbandNameController.text.toString(),
    //       "grandFather_fatherInLaw":
    //           _grandFatherFatherInLawController.text.toString(),
    //       "panNumber": _panNumberController.text.toString(),
    //       "spouseName": _spouseNameController.text.toString(),
    //       "landlineNumber": _landlineNumberController.text.toString(),
    //       "district": _districtController.text.toString(),
    //       "mobileNumber": _mobileNumberController.text.toString(),
    //       "city": _cityController.text.toString(),
    //       "permanentAddress": _permanentAddressController.text.toString(),
    //       "temporaryAddress": _temporaryAddressController.text.toString(),
    //       // "cz": _documentImageController.text.toString(),
    //       "province": _provinceController.text,
    //       "gender": _genderController.text
    //     }),
    //     headers: headers,
    //   );

    //   handleResponse(response);

    //   if (response.statusCode == 200) {
    //     showSnackBar("Verified Successfully");
    //   } else {
    //     showSnackBar("Error Verifying KYC");
    //   }
    // } catch (e) {
    //   debugPrint(e.toString());
    // }
  }

/* validation for name */
  var nameValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter a name';
    }
    return null;
  };

  /* validation for father name or husband name */
  var fatherNameHusbandNameValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter father name or husband name.';
    }
    return null;
  };

  /* validation for GrandFather or Father-in-Law */
  var grandFatherOrFatherinlawValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter grandfather name or father-in-law name.';
    }
    return null;
  };

  /* validation for spouse name */
  var spouseNameValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter spouse name.';
    }
    return null;
  };

  /* validation for occupation */
  var occupationValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your occupation.';
    }
    return null;
  };

  /* validation for district */
  var districtValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your district.';
    }
    return null;
  };

  /* validation for mobile number */
  var mobileNumberValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your mobile no.';
    }
    return null;
  };

  /* validation for city */
  var cityValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your city name';
    }
    return null;
  };

  /* validation for permanent address */
  var permanentAddressValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your permanent address.';
    }
    return null;
  };

  /* validation for permanent address */
  var temporaryAddressValidation = (value) {
    if (value == null || value.isEmpty) {
      return '* Please enter your temporary address.';
    }
    return null;
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'KYC'),
      body: MyPadding(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      const SizedBox(height: 10.0),
                      /* Name */
                      titleForTextField('Name'),
                      customTextFieldForKYC(
                        _nameController,
                        _nameErrorMessage,
                        nameValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Gender dropdown button */
                      titleForTextField('Gender'),
                      Container(
                        decoration: const BoxDecoration(
                          color: Color.fromARGB(255, 233, 247, 239),
                        ),
                        child: DropdownButtonFormField<String>(
                          value: typeValue,
                          onChanged: (value) {
                            setState(() {
                              // typeValue = value!;
                              typeValue = value!;
                              _genderController.text = typeValue;
                            });
                          },
                          items: ['MALE', 'FEMALE'].map((type) {
                            return DropdownMenuItem<String>(
                              value: type,
                              child: Text(
                                type,
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                            );
                          }).toList(),
                        ),
                      ),

                      const SizedBox(height: 10.0),

                      /* DOB (Date of Birth) */
                      //////////////////////////////////////////////////////////////////////////
                      titleForTextField('Date of Birth'),
                      InkWell(
                        onTap: () async {
                          var datePicked =
                              await DatePicker.showSimpleDatePicker(
                            context,
                            initialDate: DateTime(1990),
                            firstDate: DateTime(1960),
                            lastDate: DateTime(2030),
                            dateFormat: "yyyy-MMMM-dd",
                            locale: DateTimePickerLocale.en_us,
                            looping: false,
                          );

                          setState(() {
                            // _selectedDate = datePicked;
                            _selectedDate = datePicked;
                            _dobController.text =
                                DateFormat('yyyy-MM-dd').format(_selectedDate!);
                          });

                          const snackBar =
                              SnackBar(content: Text("Date Picked."));
                          // ignore: use_build_context_synchronously
                          ScaffoldMessenger.of(context).showSnackBar(snackBar);
                          debugPrint(datePicked.toString());
                        },
                        child: Container(
                          padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                          decoration: BoxDecoration(
                            color: const Color.fromARGB(255, 233, 247, 239),
                            border: Border.all(style: BorderStyle.solid),
                          ),
                          child: const Text("Pick a date"),
                        ),
                      ),

                      Text(
                        _selectedDate != null
                            ? DateFormat('yyyy-MM-dd').format(_selectedDate!)
                            : _dobController.text.isNotEmpty
                                ? _dobController.text
                                : _dobErrorMessage,
                      ),
                      //////////////////////////////////////////////////////////////////////////

                      const SizedBox(height: 10.0),

                      /* FatherName or HusbandName */
                      titleForTextField('FatherName or HusbandName'),
                      customTextFieldForKYC(
                        _fatherNameHusbandNameController,
                        _fatherNameHusbandNameErrorMessage,
                        fatherNameHusbandNameValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* GrandFather Father-in-Law */
                      titleForTextField('GrandFather or Father-in-Law'),
                      customTextFieldForKYC(
                        _grandFatherFatherInLawController,
                        _grandFatherFatherInLawErrorMessage,
                        grandFatherOrFatherinlawValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Spouse Name */
                      titleForTextField('Spouse Name'),
                      customTextFieldForKYC(
                        _spouseNameController,
                        _spouseNameErrorMessage,
                        spouseNameValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Occupation */
                      titleForTextField('Occupation'),
                      customTextFieldForKYC(
                        _occupationController,
                        _occupationErrorMessage,
                        occupationValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Pan Number */
                      titleForTextField('Pan Number'),
                      customTextFieldForKYC(
                        _panNumberController,
                        _panNumberErrorMessage,
                      ),
                      const SizedBox(height: 10.0),

                      /* Landline Number */
                      titleForTextField('Landline Number'),
                      customTextFieldForKYC(
                        _landlineNumberController,
                        _landlineNumberErrorMessage,
                      ),
                      const SizedBox(height: 10.0),

                      /* Province dropdown button */
                      titleForTextField('Province'),
                      Container(
                        decoration: const BoxDecoration(
                          color: Color.fromARGB(255, 233, 247, 239),
                        ),
                        child: DropdownButtonFormField<String>(
                          value: typeValueForProvince,
                          onChanged: (value) {
                            setState(() {
                              typeValueForProvince = value!;
                              _provinceController.text = typeValueForProvince;
                            });
                          },
                          items: [
                            'Province_1',
                            'Province_2',
                            'Province_3',
                            'Province_4',
                            'Province_5',
                            'Province_6',
                            'Province_7'
                          ].map((type) {
                            return DropdownMenuItem<String>(
                              value: type,
                              child: Text(
                                type,
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                            );
                          }).toList(),
                        ),
                      ),

                      const SizedBox(height: 10.0),

                      /* District */
                      titleForTextField('District'),
                      customTextFieldForKYC(
                        _districtController,
                        _districtErrorMessage,
                        districtValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Mobile Number */
                      titleForTextField('Mobile Number'),
                      customTextFieldForKYC(
                        _mobileNumberController,
                        _mobileNumberErrorMessage,
                        mobileNumberValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* City */
                      titleForTextField('City'),
                      customTextFieldForKYC(
                        _cityController,
                        _cityErrorMessage,
                        cityValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Permanent Address */
                      titleForTextField('Permanent Address'),
                      customTextFieldForKYC(
                        _permanentAddressController,
                        _permanentAddressErrorMessage,
                        permanentAddressValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Temporary Address */
                      titleForTextField('Temporary Address'),
                      customTextFieldForKYC(
                        _temporaryAddressController,
                        _temporaryAddressErrorMessage,
                        temporaryAddressValidation,
                      ),
                      const SizedBox(height: 10.0),

                      /* Document Image */
                      titleForTextField('Document Image'),
                      MultipleImagePicker(
                          minimum: 1,
                          onImagesChanged: (images) {
                            setState(() {
                              selectedImages = images;
                            });
                          }),
                      const SizedBox(height: 10.0),
                    ],
                  ),
                ),
              ),
            ),
            ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _addKYC();
                    // showSnackbar(context);
                  }
                },
                style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                        const Color.fromARGB(255, 20, 20, 20))),
                child: const Text(
                  'Submit',
                  style: TextStyle(
                      color: Color.fromARGB(255, 255, 255, 255),
                      fontWeight: FontWeight.bold),
                ))
          ],
        ),
      ),
    );
  }

  Container titleForTextField(String title) {
    return Container(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: const TextStyle(
          color: Colors.green,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

/* custom text field */
  Widget customTextFieldForKYC(TextEditingController controller,
      [String? errormessage,
      String? Function(String?)? validator,
      TextInputType? keyboardType]) {
    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 233, 247, 239),
      ),
      child: TextFormField(
        controller: controller,
        autovalidateMode: AutovalidateMode.onUserInteraction,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          errorText: errormessage,
          enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(
              width: 1,
              color: Color.fromARGB(255, 33, 33, 33),
            ),
            borderRadius: BorderRadius.circular(8.0),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(
              width: 1,
              color: Color.fromARGB(255, 151, 45, 139),
            ),
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
        validator: validator,
      ),
    );
  }

  /* snack bar */
  void showSnackbar(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Successfully Verified'),
        duration: Duration(seconds: 3),
      ),
    );
  }
}
