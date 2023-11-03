import 'dart:convert';
import "package:http/http.dart" as http;
import 'package:flutter/material.dart';
import 'package:room_rent/login_page/login.dart';

import '../api/constants.dart';

Future<void> handleResponse(http.Response response) async {
  BuildContext context = kNavigatorKey.currentContext!;
  try {
    if (response.statusCode == 401) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("You need to login.")));
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => MyLoginPage()),
          (route) => false);
    }

    dynamic decodedResponse;

    String bodyString = "unset";

    bodyString = response.body;

    if (bodyString.isNotEmpty) {
      decodedResponse = jsonDecode(bodyString);
    }

    if (decodedResponse is Map && decodedResponse.containsKey("message")) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(decodedResponse['message'].toString())));
      print(response.body);
    }
  } catch (e) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(e.toString())));
  }
}
