import 'package:flutter/material.dart';
import 'package:room_rent/pages/lands/land_card.dart';

import '../../models/land.dart';

class Lands extends StatefulWidget {
  final List<Land> lands;
  const Lands({super.key, required this.lands});

  @override
  State<Lands> createState() => _LandsState();
}

class _LandsState extends State<Lands> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (Land r in widget.lands) LandCard(land: r),
      ],
    );
  }
}
