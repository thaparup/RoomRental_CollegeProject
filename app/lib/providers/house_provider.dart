import 'package:flutter/material.dart';
import 'package:room_rent/helpers/loading_status.dart';

import '../models/house.dart';

class HouseProvider with ChangeNotifier {
  LoadingStatus loadingStatus = LoadingStatus.idle;

  List<House> all = [];

  List<House> mine = [];

  void init() async {
    await fetchAll();
    await fetchMine();
  }

  HouseProvider() {
    init();
  }

  Future<void> fetchAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await House.fetcher.fetchAll();
    loadingStatus = LoadingStatus.loaded;
    all = House.fetcher.all;
    notifyListeners();
  }

  Future<void> fetchMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await House.fetcher.fetchMine();
    loadingStatus = LoadingStatus.loaded;
    mine = House.fetcher.mine;
    notifyListeners();
  }


 Future<void> getAll() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await House.fetcher.getAll();
    loadingStatus = LoadingStatus.loaded;
    all = House.fetcher.all;
    notifyListeners();
  }

  Future<void> getMine() async {
    loadingStatus = LoadingStatus.loading;
    notifyListeners();
    await House.fetcher.getMine();
    loadingStatus = LoadingStatus.loaded;
    mine = House.fetcher.mine;
    notifyListeners();
  }

}
