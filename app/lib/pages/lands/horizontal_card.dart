//main card design
import 'package:flutter/material.dart';
import 'package:room_rent/models/land.dart';
import 'package:room_rent/pages/lands/single_land_page.dart';

import '../../colors/color.dart';

class LandHorizontalCard extends StatelessWidget {
  final Land land;
  const LandHorizontalCard({super.key, required this.land});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => SingleLandPage(
              land: land,
            ),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(right: 8.0),
        width: MediaQuery.of(context).size.width * 0.5,
        height: MediaQuery.of(context).size.width * 0.6,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24.0),
          child: Card(
            child: Stack(
              alignment: Alignment.bottomCenter,
              children: [
                // image
                Positioned(
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: FutureBuilder(
                      future: land.getImages(),
                      builder: (context, snapshot) {
                        if (snapshot.hasData) {
                          if (snapshot.data!.isNotEmpty) {
                            // print(snapshot.data);
                            return Container(
                              width: MediaQuery.of(context).size.width * 0.3,
                              height: 130,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  fit: BoxFit.cover,
                                  image: NetworkImage(
                                    snapshot.data![0],
                                  ),
                                ),
                              ),
                            );
                          } else {
                            return Container();
                          }
                        }
                        return Placeholder();
                      }),
                ),
                Container(
                  height: MediaQuery.of(context).size.height * 0.12,
                  width: MediaQuery.of(context).size.width,
                  decoration: BoxDecoration(
                    color: MyAppColors.kBodyColor.withOpacity(0.8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      //title and location
                      Container(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              land.title,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(land.address),
                          ],
                        ),
                      ),
                      //price
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            'Rs. ${land.cost}',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.topRight,
                  child: Container(
                    margin: EdgeInsets.all(4),
                    color: Colors.blue, // Background color
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      child: Text(
                        'Land',
                        style: TextStyle(
                          color: Colors.white, // Text color
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
