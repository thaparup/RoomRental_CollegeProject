import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MyUniversalTextFormField extends StatefulWidget {
  final TextEditingController myControllerForTextField;
  final String titleForField;
  final String? errormessage;

  const MyUniversalTextFormField({
    Key? key,
    required this.myControllerForTextField,
    required this.titleForField,
    required this.errormessage,
  }) : super(key: key);

  @override
  State<MyUniversalTextFormField> createState() =>
      _MyUniversalTextFormFieldState();
}

class _MyUniversalTextFormFieldState extends State<MyUniversalTextFormField> {
  String? _validateInput(String? value) {
    if (value == null || value.isEmpty) {
      return widget.errormessage;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.myControllerForTextField,
      style: const TextStyle(fontWeight: FontWeight.w600),
      decoration: InputDecoration(
        labelText: widget.titleForField,
        errorText: widget.errormessage,
        border: OutlineInputBorder(
          borderSide: BorderSide(
            color: MyAppColors.kScaffoldColor,
          ),
        ),
      ),
      validator: _validateInput,
    );
  }
}
