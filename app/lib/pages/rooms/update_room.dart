import 'dart:convert';
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/helpers/handle_response.dart';
import 'package:room_rent/providers/room_provider.dart';
import 'package:room_rent/providers/session_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/widgets/multiple_image_picker.dart';
import 'package:http/http.dart' as http;
import '../../models/room.dart';

class MyUpdateRoom extends StatefulWidget {
  final Room room;
  const MyUpdateRoom({super.key, required this.room});

  @override
  State<MyUpdateRoom> createState() => _MyUpdateRoomState();
}

class _MyUpdateRoomState extends State<MyUpdateRoom> {
  final _formKey = GlobalKey<FormState>();
  late String typeValue = widget.room.type;

  bool isAdding = false;

  List<XFile> selectedImages = [];

  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _occupancyController = TextEditingController();
  final TextEditingController _bathroomController = TextEditingController();
  final TextEditingController _costController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _sizeController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _featureController = TextEditingController();
  final TextEditingController _facilitiesController = TextEditingController();
  final TextEditingController _tocController = TextEditingController();
  File? selectedImage;

  //error message
  String? _titleErrorMessage;
  String? _occupancyErrorMessage;
  String? _bathroomErrorMessage;
  String? _costErrorMessage;
  String? _addressErrorMessage;
  String? _sizeErrorMessage;
  String? _descriptionErrorMessage;
  String? _featuresErrorMessage;
  String? _facilitiesErrorMessage;
  String? _toc;

  @override
  void initState() {
    super.initState();
    _titleController.text = widget.room.title;
    _occupancyController.text = widget.room.occupancy;
    _bathroomController.text = widget.room.bathRoom;
    _costController.text = widget.room.cost;
    _addressController.text = widget.room.address;
    _sizeController.text = widget.room.size;
    _descriptionController.text = widget.room.description;
    _featureController.text = widget.room.feature;
    _facilitiesController.text = widget.room.facilities;
    _tocController.text = widget.room.termsAndConditions;
  }

  Future<void> _updateRoom() async {
    try {
      if (_formKey.currentState!.validate()) {
        setState(() {
          isAdding = true;
        });
        var headers = {
          'Content-Type': 'application/json',
        }..addAll(Provider.of<SessionProvider>(context, listen: false)
            .session!
            .cookieHeader);

        var request = http.Request(
            'PATCH', Uri.parse('$BASE_URL/property/room/${widget.room.id}'));

        request.headers.addAll(headers);
        request.body = jsonEncode({
          'title': _titleController.text,
          'type': typeValue,
          'occupancy': _occupancyController.text,
          'bathRoom': _bathroomController.text,
          'cost': _costController.text,
          'address': _addressController.text,
          'size': _sizeController.text,
          'description': _descriptionController.text,
          'feature': _featureController.text,
          'facilities': _facilitiesController.text,
          "termsAndConditions": _tocController.text,
        });

        http.Response response =
            await http.Response.fromStream(await request.send());

        await handleResponse(response);

        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text("Room Updated   ✅")));
          Provider.of<RoomProvider>(context, listen: false).fetchAll();
          Provider.of<RoomProvider>(context, listen: false).fetchMine();
          Navigator.of(context).pop();
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
    } finally {
      setState(() {
        isAdding = false;
      });
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _occupancyController.dispose();
    _bathroomController.dispose();
    _costController.dispose();
    _addressController.dispose();
    _sizeController.dispose();
    _descriptionController.dispose();
    _featureController.dispose();
    _facilitiesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Update Room Details'),
      body: MyPadding(
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                //title
                _myTextFormField(
                  'Title',
                  _titleErrorMessage,
                  _titleController,
                  (value) {
                    if (value == null || value.trim().isEmpty) {
                      return "Title must be given.";
                    } else if (value.trim().length < 3) {
                      return "Minimum length required is 3 characters.";
                    } else {
                      return null;
                    }
                  },
                ),
                const MySizedBox10(),
                /* type */
                DropdownButtonFormField<String>(
                  value: typeValue,
                  onChanged: (value) {
                    setState(() {
                      typeValue = value!;
                    });
                  },
                  items: ['RENT', 'SELL'].map((type) {
                    return DropdownMenuItem<String>(
                      value: type,
                      child: Text(type),
                    );
                  }).toList(),
                  decoration: const InputDecoration(labelText: 'Type'),
                ),
                const MySizedBox10(),
                //occupancy
                _myTextFormField(
                  'Occupancy',
                  _occupancyErrorMessage,
                  _occupancyController,
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "Occupancy value is required.";
                    }
                    try {
                      final occupancy = int.parse(value);
                      if (occupancy <= 0) {
                        return "Occupancy value must be greater than zero.";
                      }
                    } catch (e) {
                      return "Invalid occupancy value. Please enter a valid number.";
                    }
                    return null;
                  },
                ),
                const MySizedBox10(),
                //cost
                _myTextFormField(
                  'Cost',
                  _costErrorMessage,
                  _costController,
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "Cost is required.";
                    }
                    try {
                      final cost = double.parse(value);
                      if (cost <= 0) {
                        return "Cost must be greater than zero.";
                      }
                    } catch (e) {
                      return "Invalid cost. Please enter a valid cost.";
                    }
                    return null;
                  },
                ),
                const MySizedBox10(),
                //bathroom
                _myTextFormField(
                  'Bathroom',
                  _bathroomErrorMessage,
                  _bathroomController,
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "No. of bathroom is required.";
                    }
                    try {
                      final bathroom = int.parse(value);
                      if (bathroom <= 0) {
                        return "Bathroom value must be greater than zero.";
                      }
                    } catch (e) {
                      return "Invalid no. of bathroom. Please enter a valid number.";
                    }
                    return null;
                  },
                ),
                const MySizedBox10(),
                //address
                _myTextFormField(
                  'Address',
                  _addressErrorMessage,
                  _addressController,
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "Address is required.";
                    }
                    return null;
                  },
                ),
                const MySizedBox10(),
                //size
                _myTextFormField(
                  'Size',
                  _sizeErrorMessage,
                  _sizeController,
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "Size is required.";
                    }
                    final size = double.tryParse(value);
                    if (size == null || size <= 0) {
                      return "Size must be greater than zero.";
                    } else if (double.tryParse(value) == null) {
                      return "Size must be a valid number.";
                    }
                    return null;
                  },
                ),
                const MySizedBox10(),
                //description
                _myTextFormField('Description', _descriptionErrorMessage,
                    _descriptionController),
                const MySizedBox10(),
                //feature
                _myTextFormField(
                    'Feature', _featuresErrorMessage, _featureController),
                const MySizedBox10(),
                //facilities
                _myTextFormField('Facilities', _facilitiesErrorMessage,
                    _facilitiesController),
                const MySizedBox10(),
                _myTextFormField('Terms and Conditions', _toc, _tocController),
                const MySizedBox10(),
                const SizedBox(height: 16.0),

                MultipleImagePicker(onImagesChanged: (images) {
                  selectedImages = images;
                }),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: ElevatedButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              _updateRoom();
            }
          },
          child: !isAdding
              ? const Text('Update Room')
              : CupertinoActivityIndicator(
                  color: Colors.white,
                ),
        ),
      ),
    );
  }

  TextFormField _myTextFormField(String titleForField, errormessage,
      TextEditingController controllerForTextField,
      [String? Function(String?)? validator]) {
    return TextFormField(
      controller: controllerForTextField,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      decoration: InputDecoration(
        labelText: titleForField,
        errorText: errormessage,
        border: const OutlineInputBorder(),
      ),
      validator: validator,
    );
  }
}
