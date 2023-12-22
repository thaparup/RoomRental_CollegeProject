import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/widgets/bottom_navigation_bar.dart';

enum ItemType { Rent, Sell }

class MySliverAppBar extends StatefulWidget {
  const MySliverAppBar({Key? key}) : super(key: key);

  @override
  State<MySliverAppBar> createState() => _MySliverAppBarState();
}

class _MySliverAppBarState extends State<MySliverAppBar> {
  final List<String> _rentItems = [
    'House',
    'Flat',
    'Room',
    'Hostel',
  ];
  final List<String> _sellItems = [
    'Land',
    'House',
    'Hostel',
  ];
  ItemType _selectedItemType = ItemType.Rent;

  List<String> getSelectedItems() {
    return _selectedItemType == ItemType.Rent ? _rentItems : _sellItems;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(
          slivers: [
            mySliverAppBar(),
            mySliverToBoxAdapter(),
          ],
        ),
        bottomNavigationBar: const MyBottomNavigationBar(),
      ),
    );
  }

  SliverAppBar mySliverAppBar() {
    return SliverAppBar(
      title: Text(
        'Room Rent',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 20,
          color: MyAppColors.kBaseColor,
        ),
      ),
      floating: true,
      pinned: true,
      flexibleSpace: const FlexibleSpaceBar(
        background: Image(
          image: AssetImage('assets/images/room.jpg'),
          fit: BoxFit.cover,
        ),
      ),
      backgroundColor: MyAppColors.kScaffoldColor,
      expandedHeight: 200,
      automaticallyImplyLeading: false,
      actions:  [
        Icon(
          Icons.settings,
          color: MyAppColors.kBaseColor,
        ),
        const SizedBox(
          width: 10,
        )
      ],
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(48),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Radio(
              value: ItemType.Rent,
              groupValue: _selectedItemType,
              onChanged: (ItemType? value) {
                setState(() {
                  _selectedItemType = value!;
                });
              },
            ),
            const Text('Rent'),
            Radio(
              value: ItemType.Sell,
              groupValue: _selectedItemType,
              onChanged: (ItemType? value) {
                setState(() {
                  _selectedItemType = value!;
                });
              },
            ),
            const Text('Sell'),
          ],
        ),
      ),
    );
  }

  SliverToBoxAdapter mySliverToBoxAdapter() {
    return SliverToBoxAdapter(
      child: ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: getSelectedItems().length,
        itemBuilder: (context, index) {
          final item = getSelectedItems()[index];
          return ListTile(
            title: Text(
              item,
              style: const TextStyle(fontSize: 16.0),
            ),
          );
          
        },
      ),
    );
  }
}