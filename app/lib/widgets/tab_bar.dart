import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MyTabBar extends StatefulWidget {
  const MyTabBar({Key? key}) : super(key: key);

  @override
  State<MyTabBar> createState() => _MyTabBarState();
}

class _MyTabBarState extends State<MyTabBar> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(bottom: 8.0),
            height: MediaQuery.of(context).size.height * 0.06,
            color: Colors.grey.shade300,
            child: Row(
              children: [
                //first title
                myTabBarTitle('Description', 0),
                //second title
                myTabBarTitle('Features', 1),
                //third title
                myTabBarTitle('Facilities', 2),
                //fourth title
                myTabBarTitle('Location', 3),
              ],
            ),
          ),
          Expanded(
            child: IndexedStack(
              index: selectedIndex,
              children: const [
                // Container for the "Description" tab
                MyDataContainer(title: 'Description'),
                // Container for the "Features" tab
                MyDataContainer(title: 'Features'),
                // Container for the "Facilities" tab
                MyDataContainer(title: 'Facilities'),
                // Container for the "Location" tab
                MyDataContainer(title: 'Location'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Expanded myTabBarTitle(String title, int index) {
    bool isSelected =
        selectedIndex == index; // Check if the current title is selected
    return Expanded(
      child: InkWell(
        onTap: () {
          setState(() {
            selectedIndex = index; // Update the selected index when tapped
          });
        },
        child: Container(
          color: isSelected ? MyAppColors.kScaffoldColor : Colors.transparent,
          child: Center(
            child: Text(
              title,
              style: TextStyle(
                color: isSelected ? MyAppColors.kBaseColor : Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class MyDataContainer extends StatelessWidget {
  final String title;
  const MyDataContainer({
    super.key, required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        // color: Colors.grey[300],
        color: MyAppColors.kScaffoldColor.withOpacity(0.06),
        margin: const EdgeInsets.only(
          bottom: 8.0
        ),
        // color: Colors.grey,
        child: Center(
          child: Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
