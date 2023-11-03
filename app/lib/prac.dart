import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class RoomModel {
  final int mid;
  final String mtitle;
  final String mtype;
  final String moccupancy;
  final String mbathRoom;
  final String mcost;
  final String maddress;
  final String msize;
  final String mfeature;
  final int mpropertyId;

  RoomModel({
    required this.mid,
    required this.mtitle,
    required this.mtype,
    required this.moccupancy,
    required this.mbathRoom,
    required this.mcost,
    required this.maddress,
    required this.msize,
    required this.mfeature,
    required this.mpropertyId,
  });
}

class MyRoomContentDetailsPage extends StatefulWidget {
  const MyRoomContentDetailsPage({super.key});

  @override
  State<MyRoomContentDetailsPage> createState() =>
      _MyRoomContentDetailsPageState();
}

class _MyRoomContentDetailsPageState extends State<MyRoomContentDetailsPage> {
  ///
  List<RoomModel> roomDataList = [];

  @override
  void initState() {
    super.initState();
    fetchRoom();
  }

  Future<void> fetchRoom() async {
    try {
      var inst = await SharedPreferences.getInstance();
      String? token = inst.getString("accessToken");
      String? reftoken = inst.getString("refreshToken");

      var headers = {
        'Cookie': 'access_token=$token;refresh_token=$reftoken;token=$token'
      };
      var request = http.Request(
          'GET', Uri.parse('http://10.0.2.2:3000/api/property/room'));

      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        String responseBody = await response.stream.bytesToString();
        debugPrint(responseBody);

        setState(() {
          roomDataList = parseRoomData(responseBody);
        });
      }
    } catch (e, stackTrace) {
      debugPrint('Error: $e');
      debugPrint('Stacktrace: $stackTrace');
    }
  }

  /* list */
  List<RoomModel> parseRoomData(String responseBody) {
    final List<dynamic> parsed = jsonDecode(responseBody);

    return parsed.map((json) {
      return RoomModel(
        mid: json['id'] ?? 0,
        mtitle: json['title'] ?? '',
        mtype: json['type'] ?? '',
        moccupancy: json['occupancy']?.toString() ?? '',
        mbathRoom: json['bathRoom']?.toString() ?? '',
        mcost: json['cost']?.toString() ?? '',
        maddress: json['address'] ?? '',
        msize: json['size']?.toString() ?? '',
        mfeature: json['feature'] ?? '',
        mpropertyId: json['propertyId'] ?? 0,
      );
    }).toList();
  }

  ///
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: roomDataList.map(
            (room) {
              return Column(
                children: [
                  Text(room.mid.toString()),
                  Text(room.mtitle),
                  Text(room.mtype),
                  Text(room.moccupancy),
                  Text(room.mbathRoom),
                  Text(room.mcost),
                  Text(room.maddress),
                  Text(room.msize),
                  Text(room.mfeature),
                  Text(room.mpropertyId.toString()),
                ],
              );
            },
          ).toList(),
        ),
      ),
    );
  }
}
