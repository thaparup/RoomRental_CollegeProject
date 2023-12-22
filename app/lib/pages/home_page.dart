import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/drawer/drawer.dart';
import 'package:room_rent/models/house.dart';
import 'package:room_rent/models/interfaces/searchable.dart';
import 'package:room_rent/models/land.dart';
import 'package:room_rent/models/room.dart';
import 'package:room_rent/pages/profile.dart';
import 'package:room_rent/pages/rent.dart';
import 'package:room_rent/pages/search.dart';
import 'package:room_rent/pages/sell.dart';
import 'package:room_rent/providers/house_provider.dart';
import 'package:room_rent/providers/land_provider.dart';
import 'package:room_rent/providers/room_provider.dart';
import 'package:room_rent/providers/session_provider.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {
  late TabController _tabController;
  int _selectedIndex = 0;

  static List<String> tabsString = [
    'Home',
    // 'Buy',
    'Rent',
    'Buy',
    'Profile',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: tabsString.length, vsync: this);
    _tabController.addListener(_handleTabChange); // Listen to tab index changes
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _handleTabChange() {
    setState(() {
      _selectedIndex = _tabController.index; // Update index
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: TabBarView(
        controller: _tabController,
        children: const [
          MyMainHomePage(),
          // MyBuyPage(),
          MyRentPage(),
          MySellPage(),
          MyProfilePage(),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
            color: MyAppColors.kScaffoldColor,
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(25),
              topRight: Radius.circular(25),
            )),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 15.0,
            vertical: 20.0,
          ),
          child: GNav(
            backgroundColor: MyAppColors.kScaffoldColor,
            color: MyAppColors.kBaseColor,
            activeColor: Colors.white,
            tabBackgroundColor: Colors.grey.shade900,
            padding: const EdgeInsets.all(10.0),
            gap: 8.0,
            selectedIndex: _selectedIndex, // Update selectedIndex property
            tabs: [
              //home
              GButton(
                icon: Icons.home,
                text: tabsString[0],
                onPressed: () {
                  _tabController.animateTo(0);
                },
              ),
              //buy
              // GButton(
              //   icon: Icons.payment,
              //   text: tabsString[1],
              //   onPressed: () {
              //     _tabController.animateTo(1);
              //   },
              // ),
              //rent
              GButton(
                icon: Icons.business,
                text: tabsString[1],
                onPressed: () {
                  _tabController.animateTo(1);
                },
              ),
              //sell
              GButton(
                icon: Icons.local_offer,
                text: tabsString[2],
                onPressed: () {
                  _tabController.animateTo(2);
                },
              ),
              //profile
              GButton(
                icon: Icons.person,
                text: tabsString[3],
                onPressed: () {
                  _tabController.animateTo(3);
                },
              ),
            ],
            onTabChange: (index) {
              _tabController.animateTo(index);
            },
          ),
        ),
      ),
    );
  }
}

//This is my actual home page and its contents
class MyMainHomePage extends StatelessWidget {
  const MyMainHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Home'),
      drawer: const MyDrawer(),
      body: SingleChildScrollView(
        //body container
        child: Consumer3<RoomProvider, HouseProvider, LandProvider>(builder:
            (context, roomProvider, houseProvider, landProvider, child) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              MyPadding(
                child: Consumer<SessionProvider>(
                    builder: (context, sessionProvider, child) {
                  return Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Hello ${sessionProvider.loggedInUser?.name.split(" ")[0] ?? "there"},',
                      style: _myTextStyle().copyWith(
                        fontSize: 24,
                      ),
                    ),
                  );
                }),
              ),
              MyPadding(
                child: Container(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Search rooms, houses, lands...',
                    style: _myTextStyle().copyWith(
                      fontSize: 17,
                      color: Colors.grey,
                    ),
                  ),
                ),
              ),
              MyPadding(
                child: InkWell(
                  onTap: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => SearchPage())),
                  child: TextField(
                    style: const TextStyle(
                      color: Colors.white70,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    onChanged: (v) {},
                    enabled: false,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: MyAppColors.kScaffoldColor,
                      hintText: 'Search..',
                      prefixIcon: Icon(
                        Icons.search,
                        color: MyAppColors.kBaseColor,
                      ),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8.0),
                          borderSide: BorderSide.none),
                    ),
                  ),
                ),
              ),
              //1st container

              FutureBuilder(
                  future: Future.value([
                    ...roomProvider.all,
                    ...landProvider.all,
                    ...houseProvider.all
                  ]),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      List<Searchable> allData = (snapshot.data as List)
                          .map((e) => e as Searchable)
                          .toList();
                      List<Searchable> recents = [
                        ...allData.whereType<Room>().toList().take(2),
                        ...allData.whereType<Land>().toList().take(2),
                        ...allData.whereType<House>().toList().take(2),
                      ];

                      List<Searchable> fromPopularCities = allData
                          .where((d) =>
                              d.matches("pokhara") ||
                              d.matches("kathmandu") ||
                              d.matches("butwal") ||
                              d.matches("lalitpur") ||
                              d.matches("bhaktapur") ||
                              d.matches("chitwan"))
                          .toList();
                      return Column(
                        children: [
                          SizedBox(
                            height: 8,
                          ),
                          MyPadding(
                            child: Container(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                'Recent Uploads',
                                style: _myTextStyle(),
                              ),
                            ),
                          ),
                          //2nd container
                          MyPadding(
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: recents
                                    .map((e) => e.buildHorizontalCard(context))
                                    .toList(),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: 8,
                          ),
                          //3rd container
                          MyPadding(
                            child: Container(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                'From Popular Cities',
                                style: _myTextStyle(),
                              ),
                            ),
                          ),
                          MyPadding(
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: fromPopularCities
                                    .map((e) => e.buildHorizontalCard(context))
                                    .toList(),
                              ),
                            ),
                          ),
                        ],
                      );
                    } else if (snapshot.hasError) {
                      return Center(child: Text("Error: ${snapshot.error}"));
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  }),
            ],
          );
        }),
      ),
    );
  }

  TextStyle _myTextStyle() {
    return const TextStyle(
      fontSize: 14.0,
      fontWeight: FontWeight.bold,
    );
  }
}
