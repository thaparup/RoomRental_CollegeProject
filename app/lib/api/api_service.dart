// import 'package:flutter/material.dart';
// import 'package:room_rent/api/api.dart';
// import 'package:room_rent/api/api_model_class/propertry_model.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';

// //Property 
// class PropertyService {
//   static Future<List<Property>> fetchProperty() async { 
//    final response = await http.get(Uri.parse(apiProperty));

//    if(response.statusCode == 200) {
//     //request was successful, parse the json response
//     final data = jsonDecode(response.body);
//     debugPrint(data);

//     //convert the json data to a list of Property objects.
//     // return data['data'].map((item) => Property.fromJson(item)).toList();
//     List<dynamic> jsonData = jsonDecode(response.body);
//       List<Property> properties =
//           jsonData.map((item) => Property.fromJson(item)).toList();
//       return properties;
//    } else {
//     //the request failed, throw an exception.
//     throw Exception('Failed to fetch properties');
//    }
// }
// }