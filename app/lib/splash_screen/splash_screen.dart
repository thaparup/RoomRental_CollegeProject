import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/login_page/login.dart';
import 'package:room_rent/pages/home_page.dart';
import 'package:room_rent/providers/session_provider.dart';
import '../helpers/loading_status.dart';

class MySplashSreen extends StatefulWidget {
  const MySplashSreen({super.key});

  @override
  State<MySplashSreen> createState() => _MySplashSreenState();
}

class _MySplashSreenState extends State<MySplashSreen> {
  @override
  Widget build(BuildContext context) {
    return Consumer<SessionProvider>(
        builder: (context, sessionProvider, child) {
      MaterialPageRoute? toNavigateTo;
      if (sessionProvider.loadingStatus.isFinalised) {
        if (sessionProvider.session == null) {
          toNavigateTo =
              MaterialPageRoute(builder: (context) => const MyLoginPage());
        } else {
          toNavigateTo =
              MaterialPageRoute(builder: (context) => const MyHomePage());
        }

        Future.microtask(() {
          if (toNavigateTo != null) {
            Future.delayed(Duration(seconds: 5), () {
              Navigator.pushReplacement(context, toNavigateTo!);
            });
          }
        });
      }
      return Scaffold(
        backgroundColor: MyAppColors.kScaffoldColor,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                height: 200,
                width: 200,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(1000),
                  image: DecorationImage(
                    image: AssetImage("assets/images/bishal-logo.png"),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Rental System',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: MyAppColors.kBaseColor,
                ),
              ),
            ],
          ),
        ),
      );
    });
  }
}
