import 'package:room_rent/models/user.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Session {
  String accessToken;
  String refreshToken;
  User? user;

  Map<String, String> get cookieHeader => {
        "Cookie":
            "access_token=$accessToken;refresh_token=$refreshToken;token=$accessToken"
      };

  Session({required this.accessToken, required this.refreshToken, this.user});

  factory Session.fromJson(Map<String, dynamic> json) {
    return Session(
      accessToken: json['access_token'],
      refreshToken: json['refresh_token'],
    );
  }

  Future<void> save() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', accessToken);
    await prefs.setString('refreshToken', refreshToken);
    print("Saved Tokens");
  }
}
