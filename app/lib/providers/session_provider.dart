import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/helpers/functions.dart';
import 'package:room_rent/helpers/handle_response.dart';
import 'package:room_rent/helpers/loading_status.dart';
import 'package:room_rent/models/session.dart';
import 'package:room_rent/models/user.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class SessionProvider with ChangeNotifier {
  Session? session;

  LoadingStatus loadingStatus = LoadingStatus.idle;

  User? get loggedInUser => session?.user;

  String? get userProfileImage => loggedInUser?.profileImage;

  Future<void> load() async {
    print("Loading saved tokens");
    loadingStatus = LoadingStatus.loading;
    notifyListeners();

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? accessToken = prefs.getString('accessToken');
    String? reftoken = prefs.getString('accessToken');

    if (accessToken != null && reftoken != null) {
      session = Session(accessToken: accessToken, refreshToken: reftoken);

      var response = await http.get(Uri.parse("$BASE_URL/auth/user"),
          headers: getSessionCookieHeader());
      await handleResponse(response);
      if (response.statusCode == 200) {
        Map<String, dynamic> rawUser = jsonDecode(response.body);
        User user = User.fromJson(rawUser);
        session!.user = user;
      }

      loadingStatus = LoadingStatus.loaded;
      print("Loaded saved tokens");
    } else {
      loadingStatus = LoadingStatus.failed;
      print("Error Loading saved tokens");
    }
    notifyListeners();
  }

  SessionProvider() {
    load();
  }

  void set(Session? session) {
    if (session != this.session) {
      this.session = session;
      loadingStatus = LoadingStatus.loaded;
      notifyListeners();
    }
    if (session != null) {
      session.save().then((value) => load());
    } else {
      SharedPreferences.getInstance().then((value) {
        value.setString("accessToken", "");
        value.setString("refreshToken", "");
      });
    }
  }
}
