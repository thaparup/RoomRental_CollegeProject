import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/api/constants.dart';
import 'package:room_rent/custom_classes/custom_classes.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:room_rent/helpers/handle_response.dart';
import '../models/session.dart';
import '../pages/home_page.dart';
import '../providers/session_provider.dart';

class MySignupPage extends StatefulWidget {
  const MySignupPage({Key? key}) : super(key: key);

  @override
  State<MySignupPage> createState() => _MySignupPageState();
}

class _MySignupPageState extends State<MySignupPage> {
  bool _obscureText = true;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  String? _emailErrorText;
  String? _passwordErrorText;
  String? _confirmPasswordErrorText;
  String? _firstNameErrorText;
  String? _lastNameErrorText;

  void _validateForm() async {
    if (_formKey.currentState!.validate()) {
      // Form is valid. Send the signup request to the API
      String email = _emailController.text;
      String firstName = _firstNameController.text;
      String lastName = _lastNameController.text;
      String password = _passwordController.text;
      String confirmPassword = _confirmPasswordController.text;

      final url = Uri.parse('$BASE_URL/auth/signup');
      final headers = {'Content-Type': 'application/json'};
      final body = jsonEncode({
        'email': email,
        'password': password,
        'confirmPassword': confirmPassword,
        'firstName': firstName,
        'lastName': lastName,
      });

      try {
        final response = await http.post(url, headers: headers, body: body);
        await handleResponse(response);
        if (response.statusCode == 201) {
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
          //request fail
          final errorMessage = jsonDecode(response.body)['message'];
          print('Error: $errorMessage');
        }
      } catch (e) {
        print('Exception: $e');
      }
    }
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email should not be empty';
    } else if (!EmailValidator.validate(value)) {
      return 'Email must be a valid email address';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password should not be empty';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Confirm Password should not be empty';
    } else if (value != _passwordController.text) {
      return 'Confirm Password does not match the password';
    }
    return null;
  }

  String? _validateName(String? value, String fieldName) {
    if (value == null || value.isEmpty) {
      return '$fieldName should not be empty';
    } else if (value.length < 2) {
      return '$fieldName must be at least 2 characters long';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Column(
            children: [
              //col-first-container
              Container(
                color: const Color.fromARGB(255, 3, 28, 46),
                height: MediaQuery.of(context).size.height * 0.3,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      OutlinedButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: const Icon(
                          Icons.arrow_back_ios,
                          color: Colors.amber,
                        ),
                      ),
                      const Text(
                        'Sign Up',
                        style: TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Poppins',
                        ),
                      ),
                      const Text(
                        '"Start your journey"',
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
              //col-second-container
              Expanded(
                child: SingleChildScrollView(
                  child: Container(
                    padding: const EdgeInsets.only(left: 16, right: 16),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        children: [
                          const MySizedBox10(),
                          //first name
                          TextFormField(
                            controller: _firstNameController,
                            decoration: InputDecoration(
                              labelText: 'First Name',
                              errorText: _firstNameErrorText,
                              border: const OutlineInputBorder(),
                            ),
                            validator: (value) =>
                                _validateName(value, 'First Name'),
                          ),
                          const MySizedBox10(),
                          //last name
                          TextFormField(
                            controller: _lastNameController,
                            decoration: InputDecoration(
                              labelText: 'Last Name',
                              errorText: _lastNameErrorText,
                              border: const OutlineInputBorder(),
                            ),
                            validator: (value) =>
                                _validateName(value, 'Last Name'),
                          ),
                          const MySizedBox10(),
                          //email
                          TextFormField(
                            controller: _emailController,
                            decoration: InputDecoration(
                              labelText: 'Email',
                              errorText: _emailErrorText,
                              border: const OutlineInputBorder(),
                            ),
                            validator: (value) => _validateEmail(value),
                          ),
                          const MySizedBox10(),
                          //password
                          TextFormField(
                            controller: _passwordController,
                            decoration: InputDecoration(
                              labelText: 'Password',
                              errorText: _passwordErrorText,
                              border: const OutlineInputBorder(),
                              suffixIcon: myPasswordEye(),
                            ),
                            obscureText: true,
                            validator: (value) => _validatePassword(value),
                          ),
                          const MySizedBox10(),
                          //confirm password
                          TextFormField(
                            controller: _confirmPasswordController,
                            decoration: InputDecoration(
                              labelText: 'Confirm Password',
                              errorText: _confirmPasswordErrorText,
                              border: const OutlineInputBorder(),
                              suffixIcon: myPasswordEye(),
                            ),
                            obscureText: true,
                            validator: (value) =>
                                _validateConfirmPassword(value),
                          ),
                          const MySizedBox10(),
                          //submit button
                          ElevatedButton(
                            onPressed: _validateForm,
                            child: const Text('Submit'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconButton myPasswordEye() {
    return IconButton(
      icon: Icon(
        _obscureText ? Icons.visibility : Icons.visibility_off,
        color: Colors.grey,
      ),
      onPressed: () {
        setState(() {
          _obscureText = !_obscureText;
        });
      },
    );
  }
}
