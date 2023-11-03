import 'package:flutter/material.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/models/interfaces/populatable.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/pages/houses/horizontal_card.dart';
import 'package:room_rent/pages/houses/house_card.dart';
import 'fetcher.dart';

class House extends ImageAndOwnerPopulatable implements Searchable {
  int id;
  String title;
  String type;
  String occupancy;
  String bathRoom;
  String address;
  String bedRoom;
  String diningRoom;
  String kitchen;
  String livingRoom;
  String hall;
  String area;
  String yearBuilt;
  String price;
  String listingDate;
  String closingDate;
  String description;
  String feature;
  bool? booked;
  String facilities;

  House({
    required this.id,
    required this.title,
    required this.type,
    required this.occupancy,
    required this.bathRoom,
    required this.address,
    required this.bedRoom,
    required this.diningRoom,
    required this.kitchen,
    required this.livingRoom,
    required this.hall,
    required this.area,
    required this.yearBuilt,
    required this.price,
    required this.listingDate,
    required this.closingDate,
    this.booked,
    required this.description,
    required this.feature,
    required this.facilities,
  });

  @override
  String getImageFetchingURL() {
    return "$BASE_URL/property/house/images/$id";
  }

  @override
  String getOwnerFetchingURL() {
    return "$BASE_URL/property/house/$id";
  }

  @override
  List<String> getRelevantSearchWords() {
    List<String> relevantWords = [];
    relevantWords.addAll(title.trim().split(" "));
    relevantWords.addAll(address.trim().split(" "));
    relevantWords.addAll(description.trim().split(" "));
    relevantWords.addAll(feature.trim().split(" "));
    relevantWords.addAll(facilities.trim().split(" "));
    relevantWords.add(price.toString());
    return relevantWords;
  }

  @override
  String getType() => type;

  @override
  Widget buildSearchResultCard(BuildContext context) => HouseCard(house: this);

  @override
  Widget buildHorizontalCard(BuildContext context) =>
      HouseHorizontalCard(house: this);

// fetcher
  static Fetcher<House> fetcher =
      Fetcher(uri: "/property/house", parsingFunction: fromJSON);

  static House fromJSON(Map<String, dynamic> rawHouse) {
    return House(
      id: rawHouse['id'],
      title: rawHouse['title'],
      type: rawHouse['type'],
      occupancy: rawHouse['occupancy'],
      bathRoom: rawHouse['bathRoom'],
      address: rawHouse['address'],
      bedRoom: rawHouse['bedRoom'],
      diningRoom: rawHouse['diningRoom'],
      booked: rawHouse['booked'],
      kitchen: rawHouse['kitchen'],
      livingRoom: rawHouse['livingRoom'],
      hall: rawHouse['hall'],
      area: rawHouse['area'],
      yearBuilt: rawHouse['yearBuilt'],
      price: rawHouse['price'],
      listingDate: rawHouse['listingDate'],
      closingDate: rawHouse['closingDate'],
      description: rawHouse['description'],
      feature: rawHouse['feature'],
      facilities: rawHouse['facilities'],
    );
  }
}
