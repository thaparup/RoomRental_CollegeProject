import 'package:flutter/material.dart';
import 'package:room_rent/models/interfaces/populatable.dart';

class EnsurePopulated extends StatelessWidget {
  final ImageAndOwnerPopulatable populatable;
  final Widget child;
  const EnsurePopulated(
      {required this.populatable, super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: populatable.ensurePopulated(),
        builder: ((context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Text("Error: ${snapshot.error}");
          } else {
            return child;
          }
        }));
  }
}
