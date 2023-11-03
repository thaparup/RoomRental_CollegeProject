import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mime/mime.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/providers/land_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:http/http.dart' as http;
import 'package:room_rent/widgets/multiple_image_picker.dart';
import 'package:http_parser/http_parser.dart';
import '../../helpers/handle_response.dart';
import '../../providers/session_provider.dart';

final List<String> facedOns = [
  "East",
  "SouthEast",
  "South",
  "SouthWest",
  "West",
  "NorthWest",
  "North",
  "NorthEast",
];

final List<String> types = ['RENT', "SELL"];

class MyAddLand extends StatefulWidget {
  const MyAddLand({super.key});

  @override
  State<MyAddLand> createState() => _MyAddLandState();
}

class _MyAddLandState extends State<MyAddLand> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _areaController = TextEditingController();
  final TextEditingController _costController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _distanceFromRoadController =
      TextEditingController();
  final TextEditingController _nameOfRoadController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  List<XFile> _selectedFiles = [];

  String facedOn = facedOns[0];
  String type = types[0];

  bool isAdding = false;

  Future<void> submitForm() async {
    try {
      setState(() {
        isAdding = true;
      });

      var headers = {
        'Content-Type': 'multipart/form-data',
      }..addAll(Provider.of<SessionProvider>(context, listen: false)
          .session!
          .cookieHeader);

      var request =
          http.MultipartRequest('POST', Uri.parse('$BASE_URL/property/land'));
      request.headers.addAll(headers);
      request.fields.addAll({
        'title': _titleController.text,
        'location': _locationController.text,
        "address": _addressController.text,
        'area': _areaController.text,
        'cost': _costController.text,
        'type': type,
        'facedOn': facedOn,
        'distanceFromRoad': _distanceFromRoadController.text,
        'nameOfRoad': _nameOfRoadController.text,
        'description': _descriptionController.text,
      });

      for (XFile choosenImage in _selectedFiles) {
        request.files.add(
          await http.MultipartFile.fromPath(
            "files",
            choosenImage.path,
            contentType: MediaType.parse(
              lookupMimeType(choosenImage.path)!,
            ),
          ),
        );
      }

      http.Response response =
          await http.Response.fromStream(await request.send());

      await handleResponse(response);

      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("Land Added   ✅")));
        Provider.of<LandProvider>(context, listen: false).fetchAll();
        Provider.of<LandProvider>(context, listen: false).fetchMine();
        Navigator.of(context).pop();
      }
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("Error: $e")));
    } finally {
      setState(() {
        isAdding = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'Add Land'),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(labelText: 'Title'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter a title';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _locationController,
                decoration: InputDecoration(labelText: 'Location'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter a location';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _areaController,
                decoration: InputDecoration(labelText: 'Area'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter an area';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _costController,
                decoration: InputDecoration(labelText: 'Cost'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter a cost';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _addressController,
                decoration: InputDecoration(labelText: 'Address'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter Address';
                  }
                  return null;
                },
              ),
              Row(
                children: [
                  Text("Type: "),
                  SizedBox(
                    width: 20,
                  ),
                  DropdownButton(
                      value: type,
                      items: types
                          .map((e) => DropdownMenuItem(
                                value: e,
                                child: Text("For $e"),
                              ))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) {
                          setState(() {
                            type = val;
                          });
                        }
                      })
                ],
              ),
              Row(
                children: [
                  Text("Faced On: "),
                  SizedBox(
                    width: 20,
                  ),
                  DropdownButton(
                      value: facedOn,
                      items: facedOns
                          .map((e) => DropdownMenuItem(
                                value: e,
                                child: Text(e),
                              ))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) {
                          setState(() {
                            facedOn = val;
                          });
                        }
                      })
                ],
              ),
              TextFormField(
                controller: _distanceFromRoadController,
                decoration: InputDecoration(labelText: 'Distance From Road'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter distance from road';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _nameOfRoadController,
                decoration: InputDecoration(labelText: 'Name of Road'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter name of road';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Please enter a description';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16.0),
              MultipleImagePicker(onImagesChanged: (images) {
                _selectedFiles = images;
              }),
              SizedBox(height: 16.0),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: ElevatedButton(
          child: !isAdding
              ? Text('Add Land')
              : CupertinoActivityIndicator(
                  color: Colors.white,
                ),
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              submitForm();
            }
          },
        ),
      ),
    );
  }
}
