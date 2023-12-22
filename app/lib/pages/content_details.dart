import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:room_rent/widgets/tab_bar.dart';

class MyContentDetailsPage extends StatefulWidget {
  const MyContentDetailsPage({super.key});

  @override
  State<MyContentDetailsPage> createState() => _MyContentDetailsPageState();
}

class _MyContentDetailsPageState extends State<MyContentDetailsPage> {
  int selectedIndex = 1;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'Details'),
      body: Padding(
        padding: const EdgeInsets.only(left: 8.0, right: 8.0),
        child: Column(
          children: [
            MyImageInHorizontalScroll(),
            const MyTabBar(),
          ],
        ),
      ),
    );
  }
}

class MyImageInHorizontalScroll extends StatelessWidget {
  MyImageInHorizontalScroll({super.key});

  final List<String> imagesList = [
    'assets/images/room.jpg',
    'assets/images/room.jpg',
    'assets/images/room.jpg',
  ];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.2,
      child: ListView.builder(
        itemCount: imagesList.length,
        scrollDirection: Axis.horizontal,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              _openImage(context, imagesList[index]);
            },
            child: Container(
              color: MyAppColors.kScaffoldColor.withOpacity(0.06),
              margin: const EdgeInsets.only(right: 8.0),
              child: Image.asset(
                imagesList[index],
                height: 200,
                width: 200,
              ),
            ),
          );
        },
      ),
    );
  }
}

void _openImage(BuildContext context, String imagePath) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return Container(
        color: MyAppColors.kScaffoldColor,
        child: Dialog(
          child: Image.asset(imagePath),
        ),
      );
    },
  );
}
