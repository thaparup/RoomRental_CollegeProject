//main card design
import 'package:flutter/material.dart';
import 'package:room_rent/models/house.dart';
import 'package:room_rent/pages/houses/single_house_page.dart';

import '../../colors/color.dart';

class HouseHorizontalCard extends StatelessWidget {
  final House house;
  const HouseHorizontalCard({super.key, required this.house});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => SingleHousePage(
              house: house,
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
                Positioned.fill(
                  child: FutureBuilder(
                      future: house.getImages(),
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
                              house.title,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(house.address),
                          ],
                        ),
                      ),
                      //price
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            'Rs. ${house.price}',
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
                        'House',
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
