import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  List<Widget>? actions;
   MyAppBar({Key? key, required this.title, this.actions}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        left: 8.0,
        right: 8.0,
        bottom: 8.0,
      ),
      child: AppBar(
        actions: actions,
        backgroundColor: MyAppColors.kScaffoldColor,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
              bottomRight: Radius.circular(25),
              bottomLeft: Radius.circular(25)),
        ),
        leading: title == 'Add Room' ||
                title == 'Add House' ||
                title == 'Search' ||
                title == 'Liked' ||
                title == 'Add Land' ||
                title == 'Account' ||
                title == 'Favorite' ||
                title == 'Rooms' ||
                title == 'Land' ||
                title == 'Add House' ||
                title == 'Add Land' ||
                title == 'Details' ||
                title == 'Room Details' ||
                title == 'Update Room' ||
                title == 'KYC'
            ? IconButton(
                icon: Icon(
                  Icons.arrow_back_ios,
                  color: MyAppColors.kBaseColor,
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            : Builder(
                builder: (BuildContext context) {
                  return IconButton(
                    icon: Icon(
                      Icons.menu,
                      color: MyAppColors.kBaseColor,
                    ),
                    onPressed: () {
                      Scaffold.of(context).openDrawer();
                    },
                  );
                },
              ),
        title: Text(
          title,
          style: TextStyle(
              color: MyAppColors.kBaseColor, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
    );
  }

  @override
  Size get preferredSize => AppBar().preferredSize;
}
