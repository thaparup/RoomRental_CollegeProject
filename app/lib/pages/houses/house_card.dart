import 'package:flutter/material.dart';
import 'package:room_rent/pages/houses/single_house_page.dart';
import '../../models/house.dart';

class HouseCard extends StatelessWidget {
  final House house;
  const HouseCard({super.key, required this.house});

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
      child: Card(
        child: Container(
          height: MediaQuery.of(context).size.height * 0.2,
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.3),
                spreadRadius: 1,
                blurRadius: 0,
                offset: const Offset(0, 1),
              ),
            ],
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              /* for image */

              FutureBuilder(
                  future: house.getImages(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      if (snapshot.data!.isNotEmpty) {
                        return SizedBox(
                            width: MediaQuery.of(context).size.width * 0.3,
                            height: MediaQuery.of(context).size.width,
                            child: Image.network(
                              snapshot.data![0],
                            ));
                      } else {
                        return Container();
                      }
                    }
                    return Placeholder();
                  }),
              const SizedBox(width: 8.0),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    //first row of 2nd column
                    Text(
                      house.title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16.0,
                      ),
                    ),
                    //2nd row
                    Row(
                      children: [
                        Container(
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
                        Container(
                          padding: const EdgeInsets.all(3.0),
                          decoration:
                              BoxDecoration(color: Colors.grey.shade400),
                          child: Text(
                            'For ${house.type}',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    //3rd row
                    Row(
                      children: [
                        const Icon(
                          Icons.location_on,
                          color: Colors.amber,
                        ),
                        const SizedBox(width: 6.0),
                        Text(house.address),
                      ],
                    ),
                    //4th row
                    Text(
                      'Rs. ${house.price}',
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 16.0),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
