import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/login_page/login.dart';
import 'package:room_rent/pages/kyc.dart';
import 'package:room_rent/pages/listing_history.dart';
import 'package:room_rent/providers/session_provider.dart';
import 'package:http/http.dart' as http;
import 'package:room_rent/sub_pages/edit_account.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../api/constants.dart';
import '../helpers/functions.dart';
import '../helpers/handle_response.dart';

class MyProfilePage extends StatefulWidget {
  const MyProfilePage({super.key});

  @override
  State<MyProfilePage> createState() => _MyProfilePageState();
}

class _MyProfilePageState extends State<MyProfilePage> {
  Future<void> logout(BuildContext context) async {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm Logout'),
          content: const Text('Are you sure to logout?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();

                SharedPreferences prefs = await SharedPreferences.getInstance();
                await prefs.remove('accessToken');
                await prefs.remove('refreshToken');

                // ignore: use_build_context_synchronously
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const MyLoginPage()),
                );
              },
              child: const Text('Logout'),
            )
          ],
        );
      },
    );
  }

  Future<String?> getProfileImageURL() async {
    var response = await http.get(Uri.parse("$BASE_URL/auth/kyc"),
        headers: getSessionCookieHeader());
    await handleResponse(response);
    if (response.statusCode == 200) {
      try {
        var decoded = jsonDecode(response.body);
        return decoded['profileImage'];
      } catch (e) {
        print("Error getting image: $e");
        return null;
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<SessionProvider>(
        builder: (context, sessionProvider, child) {
      return Scaffold(
        appBar: MyAppBar(title: 'Profile'),
        body: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            Center(
              child: Column(
                children: [
                  const SizedBox(height: 16.0),
                  FutureBuilder(
                      future: getProfileImageURL(),
                      builder: (context, snapshot) {
                        if (snapshot.hasData) {
                          return CircleAvatar(
                              radius: 64.0,
                              backgroundImage: NetworkImage(snapshot.data ??
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6xbrL-NgoLXTLTYN_9IJaQgrhImY455xL2P4gc8&s"));
                        }
                        return CircleAvatar(
                            radius: 64.0,
                            backgroundImage: NetworkImage(sessionProvider
                                    .userProfileImage ??
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6xbrL-NgoLXTLTYN_9IJaQgrhImY455xL2P4gc8&s"));
                      }),
                  const SizedBox(height: 16.0),
                  Text(
                    sessionProvider.loggedInUser?.name ?? "Unknown",
                    // 'Bishal D.C. Tripathi',
                    style:
                        TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8.0),
                  Text(
                    'Email: ${sessionProvider.loggedInUser?.email ?? "Unknown"}',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  const SizedBox(height: 16.0),
                  IconButton(
                    icon: const Icon(Icons.edit),
                    onPressed: () {
                      //edit profile functionality
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16.0),
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                color: Colors.grey[200],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    leading: Icon(
                      Icons.person,
                      color: MyAppColors.kScaffoldColor,
                    ),
                    title: const Text('Edit Account'),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const MyEditAccountPage(),
                        ),
                      );
                    },
                  ),
                  ListTile(
                    leading: Icon(
                      Icons.history,
                      color: MyAppColors.kScaffoldColor,
                    ),
                    title: const Text('Listing History'),
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => ListingHistoryPage()));
                    },
                  ),
                  ListTile(
                    leading: Icon(
                      Icons.verified_user,
                      color: MyAppColors.kScaffoldColor,
                    ),
                    title: const Text('User Verification'),
                    onTap: () {
                      //navigate to User Verification screen
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const MyKYC(),
                        ),
                      );
                    },
                  ),
                  Center(
                    child: TextButton(
                      onPressed: () => logout(context),
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.redAccent.shade700,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5)),
                        padding: const EdgeInsets.symmetric(
                          vertical: 8.0,
                          horizontal: 25,
                        ),
                      ),
                      child: const Text(
                        'Logout',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    });
  }
}
