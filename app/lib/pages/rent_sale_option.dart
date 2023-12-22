import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MyRentSaleOption extends StatefulWidget {
  const MyRentSaleOption({super.key});

  @override
  State<MyRentSaleOption> createState() => _MyRentSaleOptionState();
}

class _MyRentSaleOptionState extends State<MyRentSaleOption> {
  String selectedItem = 'Rent';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            //1...
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
                      'Choose',
                      style: TextStyle(
                        fontSize: 24,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Poppins',
                      ),
                    ),
                    const Text(
                      '"Choose your best"',
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
            //...1
            Container(
              height: MediaQuery.of(context).size.height * 0.1,
              color: MyAppColors.kScaffoldColor,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  buttonForRentAndSell('Rent'),
                  buttonForRentAndSell('Sell'),
                ],
              ),
            ),
            // const SizedBox(
            //   height: 15,
            // ),
            //
            Expanded(
              child: Card(
                child: Center(
                  child: getContent(selectedItem),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  ElevatedButton buttonForRentAndSell(String pButtonText) {
    return ElevatedButton(
      onPressed: () {
        setState(() {
          selectedItem = pButtonText;
        });
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: selectedItem == pButtonText
            ? Colors.green
            : MyAppColors.kScaffoldColor,
      ),
      child: Text(
        pButtonText,
        style: const TextStyle(
          fontSize: 16,
          color: Colors.white,
          fontFamily: 'Poppins',
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  getContent(String selectedItem) {
    if (selectedItem == 'Rent') {
      return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          rentContents('Room', 'R', 55),
          rentContents('House', 'H', 55),
          rentContents('Flat', 'F', 55),
          rentContents('Hostel', 'Ho', 55),
        ],
      );
    } else if (selectedItem == 'Sell') {
      return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          rentContents('House', 'H', 55),
          rentContents('Hostel', 'Ho', 55),
          rentContents('Land', 'L', 55),
        ],
      );
    }
  }

  //listtile of rent category
  InkWell rentContents(String nameOfRentContent, firstLetter, int available) {
    return InkWell(
      onTap: () {},
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: MyAppColors.kScaffoldColor,
          child: Text(
            firstLetter,
            style: TextStyle(
                color: MyAppColors.kBaseColor,
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold),
          ),
        ),
        title: Text(nameOfRentContent),
        subtitle: Text(
          'Available $nameOfRentContent ${available.toString()}',
          style: const TextStyle(
            fontSize: 16,
            fontFamily: 'Poppins',
          ),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios,
          color: MyAppColors.kBaseColor,
        ),
      ),
    );
  }

  //listtile of sell category
  InkWell sellContents(String nameOfRentContent, firstLetter, int available) {
    return InkWell(
      onTap: () {},
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: MyAppColors.kScaffoldColor,
          child: Text(
            firstLetter,
            style: TextStyle(
                color: MyAppColors.kBaseColor,
                fontFamily: 'Poppins',
                fontWeight: FontWeight.bold),
          ),
        ),
        title: Text(nameOfRentContent),
        subtitle: Text(
          'Available $nameOfRentContent ${available.toString()}',
          style: const TextStyle(
            fontSize: 16,
            fontFamily: 'Poppins',
          ),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios,
          color: MyAppColors.kScaffoldColor,
        ),
      ),
    );
  }
}
