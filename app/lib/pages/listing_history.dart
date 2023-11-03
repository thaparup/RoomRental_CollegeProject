import 'package:flutter/material.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/helpers/functions.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/widgets/app_bar.dart';
import '../models/house.dart';
import '../models/land.dart';
import '../models/room.dart';

class ListingHistoryPage extends StatefulWidget {
  const ListingHistoryPage({super.key});

  @override
  State<ListingHistoryPage> createState() => _ListingHistoryPageState();
}

final List<String> tabs = ['Land', "Room", "House"];

class _ListingHistoryPageState extends State<ListingHistoryPage> {
  String choosenTab = tabs[0];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'My Listings'),
      body: MyPadding(
        child: Column(
          children: [
            //
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var option in tabs)
                  Row(
                    children: [
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: choosenTab == option
                                ? Colors.blue
                                : Colors.green[300]),
                        onPressed: () {
                          setState(() {
                            choosenTab = option;
                          });
                        },
                        child: Text(option),
                      ),
                      const SizedBox(width: 10),
                    ],
                  ),
              ],
            ),

            SizedBox(
              height: 10,
            ),
            //
            Expanded(
              child: SingleChildScrollView(
                child: FutureBuilder(
                    future: getAllMyProperties(context),
                    builder: ((context, snapshot) {
                      if (snapshot.hasData) {
                        List<Searchable> allData =
                            snapshot.data as List<Searchable>;

                        List<Searchable> filteredData =
                            allData.where((element) {
                          if (element is Land && choosenTab == "Land") {
                            return true;
                          } else if (element is Room && choosenTab == "Room") {
                            return true;
                          } else if (element is House &&
                              choosenTab == "House") {
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
