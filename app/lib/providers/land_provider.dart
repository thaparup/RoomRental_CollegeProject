import 'package:flutter/material.dart';
import 'package:room_rent/helpers/loading_status.dart';

import '../models/land.dart';

class LandProvider with ChangeNotifier {
  LoadingStatus loadingStatus = LoadingStatus.idle;

  List<Land> all = [];

  List<Land> mine = [];

  void init() async {
    await fetchAll();
    await fetchMine();
  }

  LandProvider() {
    init();
  }

  Future<void> fetchAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Land.fetcher.fetchAll();
    loadingStatus = LoadingStatus.loaded;
    all = Land.fetcher.all;
    notifyListeners();
  }

  Future<void> fetchMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Land.fetcher.fetchMine();
    loadingStatus = LoadingStatus.loaded;
    mine = Land.fetcher.mine;
    notifyListeners();
  }

 Future<void> getAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Land.fetcher.getAll();
    loadingStatus = LoadingStatus.loaded;
    all = Land.fetcher.all;
    notifyListeners();
  }

  Future<void> getMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await Land.fetcher.getMine();
    loadingStatus = LoadingStatus.loaded;
    mine = Land.fetcher.mine;
    notifyListeners();
  }

}
