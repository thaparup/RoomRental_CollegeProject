import 'package:flutter/material.dart';


class RadioButtonExample extends StatefulWidget {
  const RadioButtonExample({super.key});

  @override
  _RadioButtonExampleState createState() => _RadioButtonExampleState();
}

class _RadioButtonExampleState extends State<RadioButtonExample> {
  String? _selectedOption;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Radio Button Example'),
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Choose one:',
              style: TextStyle(fontSize: 18.0),
            ),
            Row(
              children: [
                Radio<String>(
                  value: 'Rent',
                  groupValue: _selectedOption,
                  onChanged: (value) {
                    setState(() {
                      _selectedOption = value;
                    });
                  },
                ),
                Text('Rent'),
                Radio<String>(
                  value: 'Sell',
                  groupValue: _selectedOption,
                  onChanged: (value) {
                    setState(() {
                      _selectedOption = value;
                    });
                  },
                ),
                Text('Sell'),
              ],
            ),
            SizedBox(height: 16.0),
            Text(
              'You chose : $_selectedOption',
              style: TextStyle(fontSize: 18.0),
            ),
          ],
        ),
      ),
    );
  }
}
