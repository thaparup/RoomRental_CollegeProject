import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

//Herda kheri matrai ko card design
class MyCardDesign extends StatelessWidget {
  final String imageurl;
  final String title;
  final String type;
  final String location;
  final int bedno;
  final double size;
  final double cost;

  const MyCardDesign(
      {super.key,
      required this.title,
      required this.type,
      required this.location,
      required this.bedno,
      required this.size,
      required this.cost,
      required this.imageurl});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return InkWell(
      onTap: () {},
      child: Card(
        child: Container(
          height: MediaQuery.of(context).size.height * 0.2,
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.3),
                spreadRadius: 3,
                blurRadius: 5,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // For image...
              SizedBox(
                width: screenWidth * 0.3,
                height: screenWidth,
                child: Image.network(
                  imageurl,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 8.0),
              // For description...
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    //1st row of 2nd column
                    Text(
                      title,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 16.0),
                    ),
                    //2nd row
                    Container(
                      padding: const EdgeInsets.all(3.0),
                      decoration: BoxDecoration(color: Colors.grey.shade400),
                      child: Text(type),
                    ),
                    //3rd row
                    Row(
                      children: [
                        myIconForCard(Icons.location_on),
                        mySizedBoxForCard(),
                        Text(location),
                      ],
                    ),
                    // 4th row
                    Row(
                      children: [
                        myIconForCard(Icons.bed),
                        mySizedBoxForCard(),
                        //
                        Text(bedno.toString()),
                        //
                        const SizedBox(width: 50.0),
                        myIconForCard(Icons.area_chart_rounded),
                        mySizedBoxForCard(),
                        Text('$size sq. ft.'),
                      ],
                    ),
                    //5th row
                    Text(
                      'Rs. ${cost.toStringAsFixed(2)}',
                      style: const TextStyle(
                        color: Colors.green,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  SizedBox mySizedBoxForCard() {
    return const SizedBox(
      width: 6.0,
    );
  }

  Icon myIconForCard(IconData icon) => Icon(
        icon,
        color: MyAppColors.kBaseColor,
        size: 16.0,
      );
}
