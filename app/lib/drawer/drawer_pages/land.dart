import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LandData {
  final int id;
  final String title;
  final String location;
  final String area;
  final String cost;
  final String type;
  final String facedOn;
  final String distanceFromRoad;
  final String nameOfRoad;
  final String description;
  final int propertyId;
  // final List<String> images;

  LandData({
    required this.id,
    required this.title,
    required this.location,
    required this.area,
    required this.cost,
    required this.type,
    required this.facedOn,
    required this.distanceFromRoad,
    required this.nameOfRoad,
    required this.description,
    required this.propertyId,
    // required this.images,
  });
}

class MyLand extends StatefulWidget {
  const MyLand({Key? key}) : super(key: key);

  @override
  State<MyLand> createState() => _MyLandState();
}

class _MyLandState extends State<MyLand> {
  List<LandData> landDataList = [];

  @override
  void initState() {
    super.initState();
    fetchLandData();
  }

  Future<void> fetchLandData() async {
    try {
      var inst = await SharedPreferences.getInstance();
      String? token = inst.getString("accessToken");
      String? reftoken = inst.getString("refreshToken");

      var headers = {
        'Cookie': 'access_token=$token;refresh_token=$reftoken;token=$token'
      };

      var uri = Uri.parse(apiLand);
      var request = http.Request('GET', uri);
      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        final responseBody = await response.stream.bytesToString();
        setState(() {
          landDataList = parseLandData(responseBody);
        });
      } else {
        debugPrint(response.reasonPhrase);
      }
    } catch (e) {
      debugPrint('Error $e');
    }
  }

  List<LandData> parseLandData(String responseBody) {
    final List<dynamic> parsed = jsonDecode(responseBody);
    return parsed
        .map((json) => LandData(
              // id: json['id'],
              id: int.tryParse(json['id'].toString()) ?? 0,
              title: json['title'],
              location: json['location'],
              area: json['area'],
              cost: json['cost'],
              type: json['type'],
              facedOn: json['facedOn'],
              distanceFromRoad: json['distanceFromRoad'],
              nameOfRoad: json['nameOfRoad'],
              description: json['description'],
              // propertyId: json['propertyId'],
              propertyId: int.tryParse(json['propertyId'].toString()) ?? 0,
              // images: List<String>.from(json['images']),
            ))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar:  MyAppBar(title: 'Land'),
      body: ListView.builder(
        itemCount: landDataList.length,
        itemBuilder: (BuildContext context, int index) {
          LandData landData = landDataList[index];
          return InkWell(
            onTap: () {},
            child: Card(
              child: Container(
                height: MediaQuery.of(context).size.height * 0.2,
                padding: const EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.3),
                      spreadRadius: 1,
                      blurRadius: 0,
                      offset: const Offset(0, 1),
                    ),
                  ],
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // For image...
                    SizedBox(
                      width: screenWidth * 0.3,
                      height: screenWidth,
                      child: Image.network(
                        'landData.images[0]',
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(width: 8.0),
                    // For description...
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          //1st row of 2nd column
                          Text(
                            landData.title,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16.0),
                          ),
                          //2nd row
                          Container(
                            padding: const EdgeInsets.all(3.0),
                            decoration:
                                BoxDecoration(color: Colors.grey.shade400),
                            child: Text(landData.type),
                          ),
                          //3rd row
                          Row(
                            children: [
                              const Icon(Icons.location_on),
                              const SizedBox(width: 6.0),
                              Text(landData.location),
                            ],
                          ),
                          // 4th row
                          Text(
                            'Rs. ${landData.cost}',
                            style: const TextStyle(
                              color: Colors.green,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
