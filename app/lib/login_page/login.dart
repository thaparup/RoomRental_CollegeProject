// ignore_for_file: use_build_context_synchronously
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/helpers/handle_response.dart';
import 'package:room_rent/models/session.dart';
import 'package:room_rent/pages/home_page.dart';
import 'package:room_rent/providers/session_provider.dart';
import 'package:room_rent/widgets/button.dart';
import 'package:email_validator/email_validator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyLoginPage extends StatefulWidget {
  const MyLoginPage({super.key});

  @override
  State<MyLoginPage> createState() => _MyLoginPageState();
}

class _MyLoginPageState extends State<MyLoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
  }

  // Future<void> checkLoginStatus() async {
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   String? accessToken = prefs.getString('accessToken');
  //   String? reftoken = prefs.getString('accessToken');
  //   String? token = prefs.getString('accessToken');

  //   if (accessToken != null) {
  //     Navigator.pushReplacement(
  //         context, MaterialPageRoute(builder: (context) => const MyHomePage()));
  //   }
  // }

  Future<void> login() async {
    setState(() {
      _isLoading = true;
    });

    try {
      var loginurl = Uri.parse(loginUrl);

      var mybody = json.encode({
        'email': _emailController.text,
        'password': _passwordController.text,
      });

      var myheaders = {
        'Content-Type': 'application/json',
      };

      var response =
          await http.post(loginurl, body: mybody, headers: myheaders);

      await handleResponse(response);

      if (response.statusCode == 200) {
        var responseData = jsonDecode(response.body);

        Session sess = Session.fromJson(responseData);

        Provider.of<SessionProvider>(context, listen: false).set(sess);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const MyHomePage(),
          ),
        );
      } else {
        if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
          throw Exception("Fill both email and password");
        } else if (!EmailValidator.validate(_emailController.text)) {
          throw Exception("Please provide a valid email address.");
        } else {
          throw Exception(
              "Please verify your provided email address and password combination.");
        }
      }
    } catch (e) {
      debugPrint('"Login Failed: $e"');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Login Failed: $e"),
        ),
      );
    }

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/room.jpg'),
          fit: BoxFit.cover,
        ),
      ),
      child: Scaffold(
        backgroundColor: const Color.fromARGB(150, 0, 0, 0),
        body: Stack(
          children: [
            //heading container
            Container(
              color: const Color.fromARGB(180, 3, 28, 46),
              height: MediaQuery.of(context).size.height * 0.3,
              child: const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.login,
                      color: Colors.amber,
                    ),
                    Text(
                      'Log In',
                      style: TextStyle(
                        fontSize: 24,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Poppins',
                      ),
                    ),
                    Text(
                      '"Welcome Back"',
                      style: TextStyle(
                        fontSize: 16,
                        color: Color.fromARGB(255, 129, 144, 155),
                        fontFamily: 'Poppins',
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SingleChildScrollView(
              child: Container(
                padding: EdgeInsets.only(
                  right: 35,
                  left: 35,
                  top: MediaQuery.of(context).size.height * 0.35,
                ),
                child: Column(
                  children: [
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        fillColor: Colors.grey.shade100,
                        filled: true,
                        hintText: 'Email',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    TextField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        fillColor: Colors.grey.shade100,
                        filled: true,
                        hintText: 'Password',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [CustomTextButton(title: 'Forgot Password?')],
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        _isLoading
                            ? const CircularProgressIndicator()
                            : ElevatedButton(
                                onPressed: login,
                                child: const Text(
                                  'Log In',
                                ),
                              ),
                      ],
                    ),
                    const SizedBox(
                      height: 40,
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          'Don\'t have an account?',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'Poppins',
                          ),
                        ),
                        CustomTextButton(
                          title: 'Sign Up',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
