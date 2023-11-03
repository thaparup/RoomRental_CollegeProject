import 'package:flutter/material.dart';
import 'package:room_rent/helpers/loading_status.dart';

import '../models/room.dart';

class RoomProvider with ChangeNotifier {
  LoadingStatus loadingStatus = LoadingStatus.idle;

  List<Room> all = [];

  List<Room> mine = [];

  void init() async {
    await fetchAll();
    await fetchMine();
  }

  RoomProvider() {
    init();
  }

  Future<void> fetchAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Room.fetcher.fetchAll();
    loadingStatus = LoadingStatus.loaded;
    all = Room.fetcher.all;
    notifyListeners();
  }

  Future<void> fetchMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Room.fetcher.fetchMine();
    loadingStatus = LoadingStatus.loaded;
    mine = Room.fetcher.mine;
    notifyListeners();
  }

  Future<void> getAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Room.fetcher.getAll();
    loadingStatus = LoadingStatus.loaded;
    all = Room.fetcher.all;
    notifyListeners();
  }

  Future<void> getMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Room.fetcher.getMine();
    loadingStatus = LoadingStatus.loaded;
    mine = Room.fetcher.mine;
    notifyListeners();
  }
}
