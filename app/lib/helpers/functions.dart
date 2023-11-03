import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/providers/session_provider.dart';

import '../api/constants.dart';
import '../models/interfaces/searchable.dart';
import '../providers/house_provider.dart';
import '../providers/land_provider.dart';
import '../providers/room_provider.dart';

void showSnackBar(String toShow) {
  ScaffoldMessenger.of(kNavigatorKey.currentContext!)
      .showSnackBar(SnackBar(content: Text(toShow)));
}

Map<String, String> getSessionCookieHeader() {
  return Provider.of<SessionProvider>(kNavigatorKey.currentContext!,
          listen: false)
      .session!
      .cookieHeader;
}

Future<List<Searchable>> getAllProperties(BuildContext context, {bool forceFetch = false }) async {
  var roomProvider = Provider.of<RoomProvider>(context, listen: false);
  var landProvider = Provider.of<LandProvider>(context, listen: false);
  var houseProvider = Provider.of<HouseProvider>(context, listen: false);
  await roomProvider.getAll();
  await landProvider.getAll();
  await houseProvider.getAll();
  return [...roomProvider.all, ...landProvider.all, ...houseProvider.all];
}

Future<List<Searchable>> getAllMyProperties(BuildContext context) async {
  var roomProvider = Provider.of<RoomProvider>(context, listen: false);
  var landProvider = Provider.of<LandProvider>(context, listen: false);
  var houseProvider = Provider.of<HouseProvider>(context, listen: false);
  await roomProvider.getMine();
  await landProvider.getMine();
  await houseProvider.getMine();
  return [...roomProvider.mine, ...landProvider.mine, ...houseProvider.mine];
}
