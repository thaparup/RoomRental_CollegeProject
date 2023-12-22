import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ContactOwnerDialog extends StatelessWidget {
  final String name;
  // final String phoneNumber;
  final String email;

  const ContactOwnerDialog({
    super.key,
    required this.name,
    // required this.phoneNumber,
    required this.email,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DialogTitle(title: 'Owner Details'), // Added DialogTitle
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                ListTile(
                  leading: Icon(Icons.person),
                  title: Text(name),
                  trailing: IconButton(
                    icon: Icon(Icons.copy),
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: name));
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Name copied to clipboard')),
                      );
                    },
                  ),
                ),
                // ListTile(
                //   leading: Icon(Icons.phone),
                //   title: Text(phoneNumber),
                //   trailing: IconButton(
                //     icon: Icon(Icons.copy),
                //     onPressed: () {
                //       Clipboard.setData(ClipboardData(text: phoneNumber));
                //       ScaffoldMessenger.of(context).showSnackBar(
                //         SnackBar(
                //             content: Text('Phone number copied to clipboard')),
                //       );
                //     },
                //   ),
                // ),
                ListTile(
                  leading: Icon(Icons.email),
                  title: Text(email),
                  trailing: IconButton(
                    icon: Icon(Icons.copy),
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: email));
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Email copied to clipboard')),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class DialogTitle extends StatelessWidget {
  final String title;

  const DialogTitle({required this.title, super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20.0),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18.0,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
