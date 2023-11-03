import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/helpers/loading_status.dart';
import 'package:room_rent/pages/lands/lands.dart';
import 'package:room_rent/providers/land_provider.dart';

class AllLands extends StatefulWidget {
  const AllLands({super.key});

  @override
  State<AllLands> createState() => _AllLandsState();
}

class _AllLandsState extends State<AllLands> {
  @override
  Widget build(BuildContext context) {
    return Consumer<LandProvider>(builder: (context, landProvider, child) {
      return Scaffold(
        appBar: AppBar(title: Text("All Lands")),
        body: landProvider.loadingStatus.isFinalised
            ? Lands(lands: landProvider.all)
            : CircularProgressIndicator(),
      );
    });
  }
}
