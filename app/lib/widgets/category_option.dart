import 'package:flutter/material.dart';
import 'package:room_rent/colors/color.dart';

class MyCategoryOption extends StatefulWidget {
  final Function(List<String> selectedCats) onChanged;
  const MyCategoryOption({super.key, required this.onChanged});

  @override
  State<MyCategoryOption> createState() => _MyCategoryOptionState();
}

class _MyCategoryOptionState extends State<MyCategoryOption> {
  List<String> categories = [
    'Room',
    'Land',
    'House',
  ];
  late List<bool> isSelected = [true, false, false, false, false];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.1,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                isSelected[index] = !isSelected[index];
              });
              widget.onChanged(categories
                  .where((element) => isSelected[categories.indexOf(element)])
                  .toList());
            },
            child: Container(
              margin: const EdgeInsets.all(10.0),
              padding: const EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                color: isSelected[index] ? Colors.green : Colors.grey,
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    categories[index],
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 5.0),
                  isSelected[index]
                      ? Icon(
                          Icons.check,
                          color: isSelected[index]
                              ? MyAppColors.kScaffoldColor
                              : null,
                          size: 16.0,
                        )
                      : Container(),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
