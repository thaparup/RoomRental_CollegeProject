// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:room_rent/sub_pages/room_details.dart';
// import 'package:room_rent/widgets/app_bar.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:http/http.dart' as http;


// class MyRoom extends StatefulWidget {
//   const MyRoom({super.key});

//   @override
//   State<MyRoom> createState() => _MyRoomState();
// }

// class _MyRoomState extends State<MyRoom> {
//   List<RoomModel> roomDataList = [];

//   @override
//   void initState() {
//     super.initState();
//     fetchRoom();
//   }

//   Future<void> fetchRoom() async {
//     try {
//       var inst = await SharedPreferences.getInstance();
//       String? token = inst.getString("accessToken");
//       String? reftoken = inst.getString("refreshToken");

//       var headers = {
//         'Cookie': 'access_token=$token;refresh_token=$reftoken;token=$token'
//       };
//       var request = http.Request(
//           'GET', Uri.parse('http://10.0.2.2:3000/api/property/room'));

//       request.headers.addAll(headers);

//       http.StreamedResponse response = await request.send();

//       if (response.statusCode == 200) {
//         String responseBody = await response.stream.bytesToString();
//         debugPrint(responseBody);

//         setState(() {
//           roomDataList = parseRoomData(responseBody);
//         });
//       }
//     } catch (e, stackTrace) {
//       debugPrint('Error: $e');
//       debugPrint('Stacktrace: $stackTrace');
//     }
//   }

//   /* list */
//   List<RoomModel> parseRoomData(String responseBody) {
//     final List<dynamic> parsed = jsonDecode(responseBody);

//     return parsed.map((json) {
//       return RoomModel(
//         mid: json['id'] ?? 0,
//         mtitle: json['title'] ?? '',
//         mtype: json['type'] ?? '',
//         moccupancy: json['occupancy']?.toString() ?? '',
//         mbathRoom: json['bathRoom']?.toString() ?? '',
//         mcost: json['cost']?.toString() ?? '',
//         maddress: json['address'] ?? '',
//         msize: json['size']?.toString() ?? '',
//         mdescription: json['description']?.toString() ?? '',
//         mfeature: json['feature'] ?? '',
//         mfacilities: json['facilities'] ?? '',
//         mpropertyId: json['propertyId'] ?? 0,
//       );
//     }).toList();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: const MyAppBar(title: 'Rooms'),
//       body: ListView.builder(
//         itemCount: roomDataList.length,
//         itemBuilder: (BuildContext context, int index) {
//           RoomModel rm = roomDataList[index];
//           return InkWell(
//             onTap: () {
//               /* inside room */
//               Navigator.push(
//                 context,
//                 MaterialPageRoute(
//                     builder: (context) => const MyRoomContentDetailsPage()),
//               );
//             },
//             child: Card(
//               child: Container(
//                 height: MediaQuery.of(context).size.height * 0.2,
//                 padding: const EdgeInsets.all(8.0),
//                 decoration: BoxDecoration(
//                   boxShadow: [
//                     BoxShadow(
//                       color: Colors.grey.withOpacity(0.3),
//                       spreadRadius: 1,
//                       blurRadius: 0,
//                       offset: const Offset(0, 1),
//                     ),
//                   ],
//                 ),
//                 child: Row(
//                   crossAxisAlignment: CrossAxisAlignment.center,
//                   children: [
//                     /* for image */
//                     SizedBox(
//                       width: MediaQuery.of(context).size.width * 0.3,
//                       height: MediaQuery.of(context).size.width,
//                       child: Image.network(
//                         'https://picsum.photos/250?image=9',
//                         fit: BoxFit.cover,
//                       ),
//                     ),
//                     const SizedBox(width: 8.0),
//                     Expanded(
//                       child: Column(
//                         mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           //first row of 2nd column
//                           Text(
//                             rm.mtitle,
//                             style: const TextStyle(
//                               fontWeight: FontWeight.bold,
//                               fontSize: 16.0,
//                             ),
//                           ),
//                           //2nd row
//                           Container(
//                             padding: const EdgeInsets.all(3.0),
//                             decoration:
//                                 BoxDecoration(color: Colors.grey.shade400),
//                             child: Text(
//                               'For ${rm.mtype}',
//                               style:
//                                   const TextStyle(fontWeight: FontWeight.bold),
//                             ),
//                           ),
//                           //3rd row
//                           Row(
//                             children: [
//                               const Icon(
//                                 Icons.location_on,
//                                 color: Colors.amber,
//                               ),
//                               const SizedBox(width: 6.0),
//                               Text(rm.maddress),
//                             ],
//                           ),
//                           //4th row
//                           Text(
//                             'Rs. ${rm.mcost}',
//                             style: const TextStyle(
//                                 fontWeight: FontWeight.bold, fontSize: 16.0),
//                           )
//                         ],
//                       ),
//                     ),
//                   ],
//                 ),
//               ),
//             ),
//           );
//         },
//       ),
//     );
//   }
// }
