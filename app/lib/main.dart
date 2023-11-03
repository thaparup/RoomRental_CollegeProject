import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/providers/house_provider.dart';
import 'package:room_rent/providers/land_provider.dart';
import 'package:room_rent/providers/room_provider.dart';
import 'package:room_rent/providers/session_provider.dart';
import 'package:room_rent/splash_screen/splash_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SessionProvider()),
        ChangeNotifierProvider(create: (_) => RoomProvider()),
        ChangeNotifierProvider(create: (_) => LandProvider()),
        ChangeNotifierProvider(create: (_) => HouseProvider()),
      ],
      child: MaterialApp(
        navigatorKey: kNavigatorKey,
        debugShowCheckedModeBanner: false,
        title: 'Room Rent',
        theme: ThemeData(
          primarySwatch: Colors.lightGreen,
          fontFamily: 'Poppins',
        ),
        home: const MySplashSreen(),
      ),
    );
  }
}
