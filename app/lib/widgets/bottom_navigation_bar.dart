import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:room_rent/pages/buy.dart';
import 'package:room_rent/pages/profile.dart';
import 'package:room_rent/pages/rent.dart';
import 'package:room_rent/pages/sell.dart';

class MyBottomNavigationBar extends StatefulWidget {
  const MyBottomNavigationBar({super.key});

  @override
  State<MyBottomNavigationBar> createState() => _MyBottomNavigationBarState();
}

class _MyBottomNavigationBarState extends State<MyBottomNavigationBar>
    with TickerProviderStateMixin {
  late TabController _tabController;
  int _selectedIndex = 0;

  static List<String> tabsString = [
    'Home',
    // 'Buy',
    'Rent',
    'Sell',
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
          // MyHomePage(title: 'Home Page'),
          MyBuyPage(),
          MyRentPage(),
          MySellPage(),
          MyProfilePage(),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: MyAppColors.kScaffoldColor,
          borderRadius: const BorderRadius.only(
            topLeft:Radius.circular(25),
            topRight: Radius.circular(25),
          )
        ),
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
