import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/helpers/handle_response.dart';
import 'package:room_rent/helpers/loading_status.dart';
import "package:http/http.dart" as http;
import 'package:room_rent/providers/session_provider.dart';
import '../api/constants.dart';

class Fetcher<T> {
  T Function(Map<String, dynamic> rawData) parsingFunction;

  List<T> all = [];

  List<T> mine = [];

  String uri;

  Fetcher({required this.uri, required this.parsingFunction});

  Map<String, LoadingStatus> loadingStatus = {
    "all": LoadingStatus.idle,
    "mine": LoadingStatus.idle,
  };

  Future<void> fetchAll() async {
    try {
      loadingStatus["all"] = LoadingStatus.loading;

      var response = await http.get(Uri.parse("$BASE_URL$uri"),
          headers: Provider.of<SessionProvider>(kNavigatorKey.currentContext!,
                  listen: false)
              .session!
              .cookieHeader);

      handleResponse(response);

      if (response.statusCode == 200) {
        all = (jsonDecode(response.body) as List)
            .map((e) => parsingFunction(e))
            .toList();
        loadingStatus["all"] = LoadingStatus.loaded;
        print("Fetched all: $uri");
      } else {
        loadingStatus["all"] = LoadingStatus.failed;
        throw Exception(response.body);
      }
    } catch (e, s) {
      print("Error fetching all: $uri");
      print(e);
      print(s);
      ScaffoldMessenger.of(kNavigatorKey.currentContext!)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  Future<List<T>> getAll() async {
    if (loadingStatus["all"] == LoadingStatus.failed) {
      throw Exception("Failed to fetch all");
    }
    if (loadingStatus["all"] != LoadingStatus.loaded) {
      await fetchAll();
    }
    return all;
  }

  Future<void> fetchMine() async {
    try {
      loadingStatus["mine"] = LoadingStatus.loading;

      var response = await http.get(Uri.parse("$BASE_URL$uri/my"),
          headers: Provider.of<SessionProvider>(kNavigatorKey.currentContext!,
                  listen: false)
              .session!
              .cookieHeader);

      if (response.statusCode == 200) {
        mine = (jsonDecode(response.body) as List)
            .map((e) => parsingFunction(e))
            .toList();
        loadingStatus["mine"] = LoadingStatus.loaded;
        print("Fetched mine: $uri");
      } else {
        loadingStatus["mine"] = LoadingStatus.failed;
        throw Exception(response.body);
      }
    } catch (e, s) {
      print("Error fetching mine: $uri");
      print(e);
      print(s);
      ScaffoldMessenger.of(kNavigatorKey.currentContext!)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  Future<List<T>> getMine() async {
    if (loadingStatus["mine"] == LoadingStatus.failed) {
      throw Exception("Failed to fetch mine");
    }
    if (loadingStatus["mine"] != LoadingStatus.loaded) {
      await fetchMine();
    }
    return mine;
  }
}
