import 'package:flutter/material.dart';

class MyCustomListTile extends ListTile {
  MyCustomListTile({
    super.key,
    required IconData icon,
    required Color iconColor,
    required String title,
    void Function()? onTap,
  }) : super(
          leading: Icon(
            icon,
            color: iconColor,
          ),
          title: Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          onTap: onTap,
        );
}
