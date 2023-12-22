import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/models/house.dart';
import 'package:room_rent/providers/house_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import '../../helpers/handle_response.dart';
import '../../providers/session_provider.dart';

class MyUpdateHouse extends StatefulWidget {
  final House house;
  const MyUpdateHouse({super.key, required this.house});

  @override
  State<MyUpdateHouse> createState() => _MyUpdateHouseState();
}

class _MyUpdateHouseState extends State<MyUpdateHouse> {
  late String typeValue = widget.house.type;

  bool isAdding = false;
  late bool booked = widget.house.booked ?? false;

  TextEditingController titleController = TextEditingController();
  TextEditingController occupancyController = TextEditingController();
  TextEditingController bathRoomController = TextEditingController();
  TextEditingController costController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController bedRoomController = TextEditingController();
  TextEditingController diningRoomController = TextEditingController();
  TextEditingController kitchenController = TextEditingController();
  TextEditingController livingRoomController = TextEditingController();
  TextEditingController hallController = TextEditingController();
  TextEditingController areaController = TextEditingController();
  TextEditingController yearBuiltController = TextEditingController();
  TextEditingController priceController = TextEditingController();
  TextEditingController listingDateController = TextEditingController();
  TextEditingController closingDateController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  TextEditingController featureController = TextEditingController();
  TextEditingController facilitiesController = TextEditingController();

  @override
  void initState() {
    super.initState();
    titleController.text = widget.house.title;
    occupancyController.text = widget.house.occupancy;
    bathRoomController.text = widget.house.bathRoom;
    costController.text = widget.house.price;
    addressController.text = widget.house.address;
    bedRoomController.text = widget.house.bedRoom;
    diningRoomController.text = widget.house.diningRoom;
    kitchenController.text = widget.house.kitchen;
    livingRoomController.text = widget.house.livingRoom;
    hallController.text = widget.house.hall;
    areaController.text = widget.house.area;
    yearBuiltController.text = widget.house.yearBuilt;
    priceController.text = widget.house.price;
    listingDateController.text = widget.house.listingDate;
    closingDateController.text = widget.house.closingDate;
    descriptionController.text = widget.house.description;
    featureController.text = widget.house.feature;
    facilitiesController.text = widget.house.facilities;
  }

  Future<void> updateHouse() async {
    /* create multipart request */
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
          Uri.parse("$BASE_URL/property/house/${widget.house.id}"),
          headers: headers,
          body: jsonEncode({
            'title': titleController.text,
            'type': typeValue,
            'occupancy': occupancyController.text,
            'bathRoom': bathRoomController.text,
            'cost': costController.text,
            'address': addressController.text,
            'bedRoom': bedRoomController.text,
            'diningRoom': diningRoomController.text,
            'kitchen': kitchenController.text,
            'livingRoom': livingRoomController.text,
            'hall': hallController.text,
            'area': areaController.text,
            'price': priceController.text,
            'booked': booked.toString(),
            'yearBuilt': yearBuiltController.text,
            'listingDate': listingDateController.text,
            'closingDate': closingDateController.text,
            'description': descriptionController.text,
            'feature': featureController.text,
            'facilities': facilitiesController.text,
          }));

      await handleResponse(response);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("House Updated   ✅")));
        Provider.of<HouseProvider>(context, listen: false).fetchAll();
        Provider.of<HouseProvider>(context, listen: false).fetchMine();
        Navigator.of(context).pop();
        Navigator.of(context).pop();
      }
    } catch (error) {
      debugPrint('Try Catch Error: $error');
    } finally {
      setState(() {
        isAdding = false;
      });
    }
  }

  @override
  void dispose() {
    titleController.dispose();
    occupancyController.dispose();
    bathRoomController.dispose();
    costController.dispose();
    addressController.dispose();
    bedRoomController.dispose();
    diningRoomController.dispose();
    kitchenController.dispose();
    livingRoomController.dispose();
    hallController.dispose();
    areaController.dispose();
    yearBuiltController.dispose();
    priceController.dispose();
    listingDateController.dispose();
    closingDateController.dispose();
    descriptionController.dispose();
    featureController.dispose();
    facilitiesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Update House'),
      body: MyPadding(
        child: ListView(
          children: [
            //title
            TextField(
              controller: titleController,
              decoration: const InputDecoration(labelText: 'Title'),
            ),
            //type: RENT or SELL
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
            /* occupancy */
            TextField(
              controller: occupancyController,
              decoration: const InputDecoration(labelText: 'Occupancy'),
            ),
            /* bathroom */
            TextField(
              controller: bathRoomController,
              decoration: const InputDecoration(labelText: 'Bathroom'),
            ),
            /* cost */
            TextField(
              controller: costController,
              decoration: const InputDecoration(labelText: 'Cost'),
            ),
            /* address */
            TextField(
              controller: addressController,
              decoration: const InputDecoration(labelText: 'Address'),
            ),
            /* bedroom */
            TextField(
              controller: bedRoomController,
              decoration: const InputDecoration(labelText: 'Bedroom'),
            ),
            /* dining room */
            TextField(
              controller: diningRoomController,
              decoration: const InputDecoration(labelText: 'Dining room'),
            ),
            /* kitchen */
            TextField(
              controller: kitchenController,
              decoration: const InputDecoration(labelText: 'Kitchen'),
            ),
            /* living room */
            TextField(
              controller: livingRoomController,
              decoration: const InputDecoration(labelText: 'Living room'),
            ),
            /* hall */
            TextField(
              controller: hallController,
              decoration: const InputDecoration(labelText: 'Hall'),
            ),
            /* area */
            TextField(
              controller: areaController,
              decoration: const InputDecoration(labelText: 'Area'),
            ),
            /* year built */
            TextField(
              controller: yearBuiltController,
              decoration: const InputDecoration(labelText: 'Established Date'),
            ),
            /* price */
            TextField(
              controller: priceController,
              decoration: const InputDecoration(labelText: 'Price'),
            ),
            /* listing date */
            TextField(
              controller: listingDateController,
              decoration: const InputDecoration(labelText: 'Listing Date'),
            ),
            /* closing date */
            TextField(
              controller: closingDateController,
              decoration: const InputDecoration(labelText: 'Closing Date'),
            ),
            /* description */
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(labelText: 'Description'),
            ),
            /* feature */
            TextField(
              controller: featureController,
              decoration: const InputDecoration(labelText: 'Feature'),
            ),
            /* facilities */
            TextField(
              controller: facilitiesController,
              decoration: const InputDecoration(labelText: 'Facilities'),
            ),

            SizedBox(
              height: 12,
            ),
            Row(
              children: [
                Text("Booked: "),
                Checkbox(
                    value: booked,
                    onChanged: (val) {
                      if (val != null) {
                        setState(() {
                          booked = val;
                        });
                      }
                    })
              ],
            ),

            /* insert button */
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: ElevatedButton(
          onPressed: () {
            updateHouse();
          },
          child: !isAdding
              ? const Text('Update House')
              : CupertinoActivityIndicator(
                  color: Colors.white,
                ),
        ),
      ),
    );
  }

  // Future<void> chooseImageFromGallery() async {
  //   final picker = ImagePicker();
  //   // ignore: deprecated_member_use
  //   final pickedImage = await picker.getImage(source: ImageSource.gallery);
  //   if (pickedImage != null) {
  //     setState(() {
  //       selectedImage = File(pickedImage.path);
  //     });
  //   }
  // }
  String formatDateTime(DateTime dateTime) {
    final formatter = DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    return formatter.format(dateTime);
  }
}
