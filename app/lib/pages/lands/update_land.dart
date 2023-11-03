import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/models/land.dart';
import 'package:room_rent/providers/land_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:http/http.dart' as http;
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

class MyUpdateLand extends StatefulWidget {
  final Land land;
  const MyUpdateLand({super.key, required this.land});

  @override
  State<MyUpdateLand> createState() => _MyUpdateLandState();
}

class _MyUpdateLandState extends State<MyUpdateLand> {
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

  late String facedOn = widget.land.facedOn;
  late String type = widget.land.type;

  bool isAdding = false;

  @override
  void initState() {
    super.initState();
    _titleController.text = widget.land.title;
    _locationController.text = widget.land.address;
    _areaController.text = widget.land.area;
    _costController.text = widget.land.cost;
    _addressController.text = widget.land.address;
    _distanceFromRoadController.text = widget.land.distanceFromRoad;
    _nameOfRoadController.text = widget.land.nameOfRoad;
    _descriptionController.text = widget.land.description;
  }

  Future<void> submitForm() async {
    try {
      setState(() {
        isAdding = true;
      });

      var headers = {
        'Content-Type': 'application/json',
      }..addAll(Provider.of<SessionProvider>(context, listen: false)
          .session!
          .cookieHeader);

      var response = await http.patch(
        Uri.parse('$BASE_URL/property/land/${widget.land.id}'),
        headers: headers,
        body: jsonEncode({
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
        }),
      );

      await handleResponse(response);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("Land Updated   ✅")));
        Provider.of<LandProvider>(context, listen: false).fetchAll();
        Provider.of<LandProvider>(context, listen: false).fetchMine();
        Navigator.of(context).pop();
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
      appBar: MyAppBar(title: 'Update Land'),
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
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: ElevatedButton(
          child: !isAdding
              ? Text('Update Land')
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
