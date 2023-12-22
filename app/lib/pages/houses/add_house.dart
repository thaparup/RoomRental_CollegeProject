import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mime/mime.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:http_parser/http_parser.dart';
import 'package:room_rent/providers/house_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:http/http.dart' as http;
import 'package:room_rent/widgets/multiple_image_picker.dart';
import 'package:intl/intl.dart';

import '../../helpers/handle_response.dart';
import '../../providers/session_provider.dart';

class MyAddHouse extends StatefulWidget {
  const MyAddHouse({super.key});

  @override
  State<MyAddHouse> createState() => _MyAddHouseState();
}

class _MyAddHouseState extends State<MyAddHouse> {
  List<XFile> choosenImages = [];
  String typeValue = 'RENT';

  bool isAdding = false;
  bool booked = false;

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
  TextEditingController imageController = TextEditingController();

  Future<void> insertHouse() async {
    /* create multipart request */
    try {
      setState(() {
        isAdding = true;
      });

      var headers = {
        'Content-Type': 'multipart/form-data',
      }..addAll(Provider.of<SessionProvider>(context, listen: false)
          .session!
          .cookieHeader);

      var request = http.MultipartRequest(
        'POST',
        Uri.parse("$BASE_URL/property/house"),
      );

      request.headers.addAll(headers);

      /* add form fields */
      request.fields['title'] = titleController.text;
      request.fields['type'] = typeValue;
      request.fields['occupancy'] = occupancyController.text;
      request.fields['bathRoom'] = bathRoomController.text;
      request.fields['cost'] = costController.text;
      request.fields['address'] = addressController.text;
      request.fields['bedRoom'] = bedRoomController.text;
      request.fields['diningRoom'] = diningRoomController.text;
      request.fields['kitchen'] = kitchenController.text;
      request.fields['livingRoom'] = livingRoomController.text;
      request.fields['hall'] = hallController.text;
      request.fields['area'] = areaController.text;
      request.fields['price'] = priceController.text;
      request.fields['booked'] = booked.toString();
      /* format yearBuilt, listingDate and ClosingDate before adding to fields */
      request.fields['yearBuilt'] = yearBuiltController.text;
      request.fields['listingDate'] = listingDateController.text;
      request.fields['closingDate'] = closingDateController.text;

      request.fields['description'] = descriptionController.text;
      request.fields['feature'] = featureController.text;
      request.fields['facilities'] = facilitiesController.text;

      for (XFile choosenImage in choosenImages) {
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
            .showSnackBar(SnackBar(content: Text("House Added   ✅")));
        Provider.of<HouseProvider>(context, listen: false).fetchAll();
        Provider.of<HouseProvider>(context, listen: false).fetchMine();
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
    imageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'Add House'),
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

            MultipleImagePicker(onImagesChanged: (List<XFile> images) {
              choosenImages = images;
            }),

            /* insert button */
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: ElevatedButton(
          onPressed: () {
            insertHouse();
          },
          child: !isAdding
              ? const Text('Add House')
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
