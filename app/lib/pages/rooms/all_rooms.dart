import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/helpers/loading_status.dart';
import 'package:room_rent/pages/rooms/rooms.dart';
import 'package:room_rent/providers/room_provider.dart';

class AllRooms extends StatefulWidget {
  const AllRooms({super.key});

  @override
  State<AllRooms> createState() => _AllRoomsState();
}

class _AllRoomsState extends State<AllRooms> {
  @override
  Widget build(BuildContext context) {
    return Consumer<RoomProvider>(builder: (context, roomProvider, child) {
      return Scaffold(
        appBar: AppBar(title: Text("All Rooms")),
        body: roomProvider.loadingStatus.isFinalised
            ? Rooms(rooms: roomProvider.all)
            : CircularProgressIndicator(),
      );
    });
  }
}
