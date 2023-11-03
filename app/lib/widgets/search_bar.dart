import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MySearchBar extends StatefulWidget {
  final Function(String) onChanged;
  const MySearchBar({super.key, required this.onChanged});

  @override
  State<MySearchBar> createState() => _MySearchBarState();
}

class _MySearchBarState extends State<MySearchBar> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        left: 18.0,
        right: 18.0,
      ),
      child: SizedBox(
        height: MediaQuery.of(context).size.height * 0.08,
        child: Center(
          child: TextField(
            style: const TextStyle(
              color: Colors.white70,
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
            onChanged: widget.onChanged,
            autofocus: true,
            decoration: InputDecoration(
              filled: true,
              fillColor: MyAppColors.kScaffoldColor,
              hintText: 'Search..',
              prefixIcon: Icon(
                Icons.search,
                color: MyAppColors.kBaseColor,
              ),
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                  borderSide: BorderSide.none),
            ),
          ),
        ),
      ),
    );
  }
}
