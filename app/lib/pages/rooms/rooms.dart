import 'package:flutter/material.dart';
import 'package:room_rent/pages/rooms/room_card.dart';

import '../../models/room.dart';

class Rooms extends StatefulWidget {
  final List<Room> rooms;
  const Rooms({super.key, required this.rooms});

  @override
  State<Rooms> createState() => _RoomsState();
}

class _RoomsState extends State<Rooms> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (Room r in widget.rooms) RoomCard(room: r),
      ],
    );
  }
}
