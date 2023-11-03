import 'package:flutter/material.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/models/house.dart';
import 'package:room_rent/models/room.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/widgets/category_option.dart';

import '../helpers/functions.dart';
import '../models/interfaces/searchable.dart';
import '../models/land.dart';

class MySellPage extends StatefulWidget {
  const MySellPage({super.key});

  @override
  State<MySellPage> createState() => _MySellPageState();
}

class _MySellPageState extends State<MySellPage> {
  List<String> selectedCats = ["Room"];

  late Future<List<Searchable>> getAllPropsFuture = getAllProperties(context);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Buy'),
      body: MyPadding(
        child: Column(
          children: [
            MyCategoryOption(
              onChanged: (selectedCats) {
                setState(() {
                  this.selectedCats = selectedCats;
                });
              },
            ),
            Expanded(
              child: SingleChildScrollView(
                child: FutureBuilder(
                    future: getAllPropsFuture,
                    builder: ((context, snapshot) {
                      if (snapshot.hasData) {
                        List<Searchable> allData =
                            snapshot.data as List<Searchable>;

                        print("allData: ${allData.map((e) => e.getType())}");

                        List<Searchable> filteredData =
                            allData.where((element) {
                          if (element is Land &&
                              selectedCats.contains("Land") &&
                              element.getType() == "SELL") {
                            return true;
                          } else if (element is House &&
                              selectedCats.contains("House") &&
                              element.getType() == "SELL") {
                            return true;
                          } else if (element is Room &&
                              selectedCats.contains("Room") &&
                              element.getType() == "SELL") {
                            return true;
                          } else {
                            return false;
                          }
                        }).toList();

                        return Column(
                            children: filteredData
                                .map((e) => e.buildSearchResultCard(context))
                                .toList());
                      } else if (snapshot.hasError) {
                        return Text(snapshot.error.toString());
                      } else {
                        return CircularProgressIndicator();
                      }
                    })),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
