import 'package:flutter/material.dart';
import 'package:room_rent/pages/rooms/single_room_page.dart';
import '../../models/room.dart';

class RoomCard extends StatelessWidget {
  final Room room;
  const RoomCard({super.key, required this.room});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => SingleRoomPage(
              room: room,
            ),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.all(6.0),
        margin: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
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
                future: room.getImages(),
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
                        // height: MediaQuery.of(context).size.width,
                        // child: Image.network(
                        //   snapshot.data![0],
                        // )
                      );
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
                    room.title,
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
                            'Room',
                            style: TextStyle(
                              color: Colors.white, // Text color
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(3.0),
                        decoration: BoxDecoration(color: Colors.grey.shade400),
                        child: Text(
                          'For ${room.type}',
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
                      Text(room.address),
                    ],
                  ),
                  //4th row
                  Text(
                    'Rs. ${room.cost}',
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16.0),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
