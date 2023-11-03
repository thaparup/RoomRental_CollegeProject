import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MySettingPage extends StatefulWidget {
  const MySettingPage({super.key});

  @override
  State<MySettingPage> createState() => _MySettingPageState();
}

class _MySettingPageState extends State<MySettingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       backgroundColor: MyAppColors.kBodyColor,
      // appBar:  MyAppBar(title: 'Settings'),
      body: Padding(
        padding: const EdgeInsets.only(
          left: 10.0,
          right: 10.0,
        ),
        child: ListView(
          // padding: const EdgeInsets.all(10.0),
          children: <Widget>[
            ListItem(
              title: 'Profile',
              onTap: () {},
            ),
            ListItem(
              title: 'Reset Password',
              onTap: () {},
            ),
            ListItem(
              title: 'Notifications',
              trailingWidget: const NotificationToggle(),
              onTap: () {},
            ),
            ListItem(
              title: 'Log out',
              // backgroundColor: Colors.redAccent,
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class ListItem extends StatelessWidget {
  final String title;
  final Widget? trailingWidget;
  final Color backgroundColor;
  final Function onTap;

  const ListItem({super.key, 
    required this.title,
    this.trailingWidget,
    this.backgroundColor = Colors.transparent,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap as void Function()?,
      child: Container(
        color: backgroundColor,
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Text(
              title,
              style:  TextStyle(
                  fontSize: 16.0,
                  color: MyAppColors.kScaffoldColor,
                  fontWeight: FontWeight.bold),
            ),
            if (trailingWidget != null) trailingWidget!,
          ],
        ),
      ),
    );
  }
}

//Notification...
class NotificationToggle extends StatefulWidget {
  const NotificationToggle({super.key});

  @override
  State<NotificationToggle> createState() => _NotificationToggleState();
}

class _NotificationToggleState extends State<NotificationToggle> {
  bool isToggled = true;
  @override
  Widget build(BuildContext context) {
    return Switch(
      value: isToggled,
      onChanged: (value) {
        setState(() {
          isToggled = value;
        });
      },
    );
  }
}

