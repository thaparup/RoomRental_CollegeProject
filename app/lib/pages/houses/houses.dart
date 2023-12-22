import 'package:flutter/material.dart';
import 'package:room_rent/pages/houses/house_card.dart';

import '../../models/house.dart';

class Houses extends StatefulWidget {
  final List<House> houses;
  const Houses({super.key, required this.houses});

  @override
  State<Houses> createState() => _HousesState();
}

class _HousesState extends State<Houses> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (House r in widget.houses) HouseCard(house: r),
      ],
    );
  }
}
