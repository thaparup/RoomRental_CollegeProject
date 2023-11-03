import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/sign_up/signup.dart';
import 'package:room_rent/widgets/silver_app_bar.dart';

class CustomOutlinedButton extends StatelessWidget {
  final String title;
  const CustomOutlinedButton({
    super.key,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
      onPressed: () {
        if (title == 'Log In') {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const MySliverAppBar(),
            ),
          );
        }
      },
      style: OutlinedButton.styleFrom(
        backgroundColor: const Color.fromARGB(255, 3, 28, 46),
      ),
      child: Text(
        title,
        style: TextStyle(
          color: MyAppColors.kBaseColor,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}

class CustomTextButton extends StatelessWidget {
  final String title;
  const CustomTextButton({
    super.key,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        if (title == 'Sign Up') {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const MySignupPage()),
          );
        }
      },
      child: Text(
        title,
        style: TextStyle(
          color: MyAppColors.kBaseColor,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
