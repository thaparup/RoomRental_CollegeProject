import 'package:flutter/material.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/models/interfaces/populatable.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/pages/lands/horizontal_card.dart';
import 'package:room_rent/pages/lands/land_card.dart';
import 'fetcher.dart';

class Land extends ImageAndOwnerPopulatable implements Searchable {
  int id;
  String title;
  String address;
  String area;
  String cost;
  String type;
  String facedOn;
  String distanceFromRoad;
  String nameOfRoad;
  String description;

  Land({
    required this.id,
    required this.title,
    required this.address,
    required this.area,
    required this.cost,
    required this.type,
    required this.facedOn,
    required this.distanceFromRoad,
    required this.nameOfRoad,
    required this.description,
  });

  @override
  String getImageFetchingURL() {
    return "$BASE_URL/property/land/images/$id";
  }

  @override
  String getOwnerFetchingURL() {
    return "$BASE_URL/property/land/$id";
  }

  @override
  List<String> getRelevantSearchWords() {
    List<String> relevantWords = [];
    relevantWords.addAll(title.trim().split(" "));
    relevantWords.addAll(address.trim().split(" "));
    relevantWords.addAll(description.trim().split(" "));
    relevantWords.add(cost.toString());
    return relevantWords;
  }
    @override
  String getType() => type;

  @override
  Widget buildSearchResultCard(BuildContext context) => LandCard(land: this);

  @override
  Widget buildHorizontalCard(BuildContext context) =>
      LandHorizontalCard(land: this);

// fetcher
  static Fetcher<Land> fetcher =
      Fetcher(uri: "/property/land", parsingFunction: fromJSON);

  static Land fromJSON(Map<String, dynamic> rawLand) {
    return Land(
      id: rawLand['id'],
      title: rawLand['title'],
      address: rawLand['address'],
      area: rawLand['area'],
      cost: rawLand['cost'],
      type: rawLand['type'],
      facedOn: rawLand['facedOn'],
      distanceFromRoad: rawLand['distanceFromRoad'],
      nameOfRoad: rawLand['nameOfRoad'],
      description: rawLand['description'],
    );
  }
}
