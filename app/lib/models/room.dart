import 'package:flutter/material.dart';
import 'package:room_rent/models/interfaces/populatable.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/pages/rooms/horizontal_card.dart';

import '../api/constants.dart';
import '../pages/rooms/room_card.dart';
import 'fetcher.dart';

class Room extends ImageAndOwnerPopulatable implements Searchable {
  int id;
  String title;
  String type;
  String occupancy;
  String bathRoom;
  String cost;
  String address;
  String size;
  String description;
  String feature;
  String facilities;
  String termsAndConditions;
  int propertyId;

  Room({
    required this.id,
    required this.title,
    required this.type,
    required this.occupancy,
    required this.bathRoom,
    required this.cost,
    required this.address,
    required this.size,
    required this.description,
    required this.feature,
    required this.facilities,
    required this.termsAndConditions,
    required this.propertyId,
  });

  @override
  String getImageFetchingURL() {
    return "$BASE_URL/property/room/images/$id";
  }

  @override
  String getOwnerFetchingURL() {
    return "$BASE_URL/property/room/$id";
  }

  @override
  List<String> getRelevantSearchWords() {
    List<String> relevantWords = [];
    relevantWords.addAll(title.trim().split(" "));
    relevantWords.addAll(address.trim().split(" "));
    relevantWords.addAll(description.trim().split(" "));
    relevantWords.addAll(feature.trim().split(" "));
    relevantWords.addAll(facilities.trim().split(" "));
    relevantWords.add(cost.toString());
    return relevantWords;
  }

  @override
  String getType() => type;

  @override
  Widget buildSearchResultCard(BuildContext context) => RoomCard(room: this);

  @override
  Widget buildHorizontalCard(BuildContext context) =>
      RoomHorizontalCard(room: this);

// fetcher
  static Fetcher<Room> fetcher =
      Fetcher(uri: "/property/room", parsingFunction: fromJSON);

  static Room fromJSON(Map<String, dynamic> rawRoom) {
    return Room(
      id: rawRoom['id'],
      title: rawRoom['title'],
      type: rawRoom['type'],
      occupancy: rawRoom['occupancy'],
      bathRoom: rawRoom['bathRoom'],
      cost: rawRoom['cost'],
      address: rawRoom['address'],
      size: rawRoom['size'],
      description: rawRoom['description'],
      feature: rawRoom['feature'],
      termsAndConditions: rawRoom['termsAndConditions'],
      facilities: rawRoom['facilities'],
      propertyId: rawRoom['propertyId'],
    );
  }
}
