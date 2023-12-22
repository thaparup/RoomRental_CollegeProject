import 'package:flutter/material.dart';

const String BASE_URL = 'http://10.0.2.2:3000/api';
const String apiProperty = '$BASE_URL/property';
const String apiRoom = '$BASE_URL/property/room';
const String apiLand = '$BASE_URL/property/land';
const String apiHouse = '$BASE_URL/property/house';
const String loginUrl = '$BASE_URL/auth/login';


final GlobalKey<NavigatorState> kNavigatorKey = GlobalKey<NavigatorState>();