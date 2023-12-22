import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'package:room_rent/drawer/drawer.dart';
import 'package:room_rent/pages/content_details.dart';
import 'package:room_rent/widgets/app_bar.dart';

class MyFavoritePage extends StatefulWidget {
  const MyFavoritePage({super.key});

  @override
  State<MyFavoritePage> createState() => _MyFavoritePageState();
}

class _MyFavoritePageState extends State<MyFavoritePage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: MyAppColors.kBodyColor,
        appBar:   MyAppBar(title: 'Favorite'),
        drawer: const MyDrawer(),
        body: ListView.builder(
          itemCount: 1,
          itemBuilder: (BuildContext context, int index) {
            return const MyFavoritePageCard();
          },
        ),
      ),
    );
  }
}

class MyFavoritePageCard extends StatelessWidget {
  const MyFavoritePageCard({super.key});

  @override
  Widget build(BuildContext context) {
    return MyPadding(
      child: SizedBox(
        //main container
        height: MediaQuery.of(context).size.height * 0.1,
        child: Row(
          children: [
            //image...
            InkWell(
              onTap: () {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return Dialog(
                        child: SizedBox(
                          width: MediaQuery.of(context).size.width,
                          child: Image.asset(
                            'assets/images/room.jpg',
                            fit: BoxFit.contain,
                          ),
                        ),
                      );
                    });
              },
              child: SizedBox(
                height: MediaQuery.of(context).size.height,
                child: Image.asset(
                  'assets/images/room.jpg',
                  fit: BoxFit.fill,
                ),
              ),
            ),
            //description...
            Expanded(
              child: InkWell(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MyContentDetailsPage(),
                    ),
                  );
                },
                child: const SizedBox(
                  height: 100.0,
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          //title and location
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Kathmandu Ghar',
                                style: TextStyle(
                                    fontSize: 16.0, fontWeight: FontWeight.bold),
                              ),
                              Text('Pokhara-25, Hemja'),
                            ],
                          ),
                          //cost...
                          Expanded(
                            child: Center(
                              child: Text(
                                'Rs. 6000.0',
                                style: TextStyle(
                                  color: Colors.green,
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
