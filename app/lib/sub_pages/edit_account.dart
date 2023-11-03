import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/widgets/app_bar.dart';

class MyEditAccountPage extends StatefulWidget {
  const MyEditAccountPage({super.key});

  @override
  State<MyEditAccountPage> createState() => _MyEditAccountPageState();
}

class _MyEditAccountPageState extends State<MyEditAccountPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  MyAppBar(title: 'Account'),
      body: SingleChildScrollView(
        child: Column(
          children: [
            //edit profile image
            // Container(
            //   margin: const EdgeInsets.only(left: 20.0, right: 20.0),
            //   child: Image.asset('assets/images/room.jpg'),
            // ),
            //edit first and last name
            Container(
              // color: Colors.grey.withAlpha(20),
              margin: const EdgeInsets.only(left: 20.0, right: 20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  //for first name
                  const SizedBox(
                    height: 20.0,
                  ),
                  _myTextFormField('Enter new first name'),
                  const SizedBox(
                    height: 20.0,
                  ),
                  _myTextFormField('Enter new last name'),
                  const SizedBox(
                    height: 20.0,
                  ),
                  _myTextFormField('Enter new email'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  SizedBox _myTextFormField(String hintTitle) {
    String activeHintTitle = hintTitle;

    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.07,
      child: TextFormField(
        decoration: InputDecoration(
          label: Text(
            activeHintTitle,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: MyAppColors.kScaffoldColor,
            ),
          ),
          floatingLabelStyle: TextStyle(
            fontWeight: FontWeight.bold,
            color: MyAppColors.kScaffoldColor,
          ),
          border: InputBorder.none,
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10.0),
            borderSide: BorderSide(
              color: MyAppColors.kScaffoldColor,
            ),
          ),
          filled: true,
          fillColor: MyAppColors.kScaffoldColor.withOpacity(0.06),
        ),
      ),
    );
  }
}
