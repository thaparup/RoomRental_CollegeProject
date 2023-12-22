import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/helpers/loading_status.dart';
import 'package:room_rent/pages/houses/houses.dart';
import 'package:room_rent/providers/house_provider.dart';

class AllHouses extends StatefulWidget {
  const AllHouses({super.key});

  @override
  State<AllHouses> createState() => _AllHousesState();
}

class _AllHousesState extends State<AllHouses> {
  @override
  Widget build(BuildContext context) {
    return Consumer<HouseProvider>(builder: (context, houseProvider, child) {
      return Scaffold(
        appBar: AppBar(title: Text("All Houses")),
        body: houseProvider.loadingStatus.isFinalised
            ? Houses(houses: houseProvider.all)
            : CircularProgressIndicator(),
      );
    });
  }
}
