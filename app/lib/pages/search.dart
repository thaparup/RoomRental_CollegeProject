import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/helpers/functions.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/widgets/search_bar.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyAppColors.kBodyColor,
      appBar:  MyAppBar(title: 'Search'),
      body: FutureBuilder<List<Searchable>>(
        future: getAllProperties(context),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return SearchComponent(items: snapshot.data!);
          } else if (snapshot.hasError) {
            return Center(child: Text("${snapshot.error}"));
          }
          return Center(child: const CircularProgressIndicator());
        },
      ),
    );
  }
}

class SearchComponent extends StatefulWidget {
  final List<Searchable> items;
  const SearchComponent({super.key, required this.items});

  @override
  State<SearchComponent> createState() => _SearchComponentState();
}

class _SearchComponentState extends State<SearchComponent> {
  String query = "";

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        MySearchBar(onChanged: (val) {
          setState(() {
            query = val;
          });
        }),
        Expanded(
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: widget.items
                  .where((element) => element.matches(query))
                  .toList()
                  .map((e) => e.buildSearchResultCard(context))
                  .toList(),
            ),
          ),
        ),
      ],
    );
  }
}
