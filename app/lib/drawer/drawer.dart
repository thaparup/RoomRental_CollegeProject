import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/pages/houses/add_house.dart';
import 'package:room_rent/pages/lands/add_land.dart';
import 'package:room_rent/pages/rooms/add_room.dart';
import 'package:room_rent/pages/favorite.dart';
import 'package:room_rent/pages/houses/all_houses.dart';
import 'package:room_rent/pages/lands/all_lands.dart';
import 'package:room_rent/pages/rooms/all_rooms.dart';
import 'package:room_rent/pages/search.dart';
import 'package:room_rent/widgets/list_tile.dart';

class MyDrawer extends StatefulWidget {
  const MyDrawer({super.key});

  @override
  State<MyDrawer> createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  bool isDrawerOpen = false;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 0.6,
        height: MediaQuery.of(context).size.height * 0.8,
        child: Drawer(
          backgroundColor: MyAppColors.kBodyColor,
          child: ListView(
            children: [
              Container(
                height: MediaQuery.of(context).size.height * 0.1,
                color: MyAppColors.kScaffoldColor,
                child: Center(
                    child: Text(
                  'Rental App',
                  style: TextStyle(
                      color: MyAppColors.kBaseColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 16.0),
                )),
              ),
              //liked
              // MyCustomListTile(
              //   icon: Icons.favorite,
              //   iconColor: MyAppColors.kScaffoldColor,
              //   title: 'Favorite',
              //   onTap: () {
              //     Navigator.push(
              //       context,
              //       MaterialPageRoute(
              //         builder: (context) => const MyFavoritePage(),
              //       ),
              //     );
              //   },
              // ),
              //search
              MyCustomListTile(
                icon: Icons.search,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Search',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const SearchPage(),
                    ),
                  );
                },
              ),
              //add room feature
              MyCustomListTile(
                icon: Icons.add_circle,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Add Room',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MyAddRoom(),
                    ),
                  );
                },
              ),
              //add house feature
              MyCustomListTile(
                icon: Icons.add_home,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Add House',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MyAddHouse(),
                    ),
                  );
                },
              ),
              MyCustomListTile(
                icon: Icons.landscape,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Add Land',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MyAddLand(),
                    ),
                  );
                },
              ),
              MyCustomListTile(
                icon: Icons.room,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Room',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const AllRooms(),
                    ),
                  );
                },
              ),
              MyCustomListTile(
                icon: Icons.landscape,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'Land',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const AllLands(),
                    ),
                  );
                },
              ),
              MyCustomListTile(
                icon: Icons.home,
                iconColor: MyAppColors.kScaffoldColor,
                title: 'House',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const AllHouses(),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
