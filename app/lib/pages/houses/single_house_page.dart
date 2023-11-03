import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:room_rent/colors/color.dart';
import 'package:room_rent/models/house.dart';
import 'package:room_rent/pages/houses/update_house.dart';
import 'package:room_rent/widgets/app_bar.dart';
import 'package:http/http.dart' as http;

import '../../api/constants.dart';
import '../../helpers/functions.dart';
import '../../helpers/handle_response.dart';
import '../../providers/house_provider.dart';
import '../../providers/session_provider.dart';
import '../../widgets/components/contact_owner.dart';

class SingleHousePage extends StatefulWidget {
  final House house;
  const SingleHousePage({Key? key, required this.house}) : super(key: key);

  @override
  State<SingleHousePage> createState() => _MyContentDetailsPageState();
}

class _MyContentDetailsPageState extends State<SingleHousePage> {
  int selectedIndex = 0;

  final List<String> imagesList = [
    'assets/images/house.jpg',
    'assets/images/house.jpg',
    'assets/images/house.jpg',
  ];

  List<String> buttonTitles = [
    'Description',
    'Feature',
    'Facilities',
    'Location',
  ];

  bool deleting = false;

  List<bool> containerVisibilities = [true, false, false, false];

  void updateContainerVisibilities(int index) {
    setState(() {
      for (int i = 0; i < containerVisibilities.length; i++) {
        containerVisibilities[i] = (i == index);
      }
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<SessionProvider>(
        builder: (context, sessionProvider, child) {
      int? loggedInUserId = sessionProvider.session?.user?.id;
      return Scaffold(
        appBar: MyAppBar(
          title: 'House Details',
          actions: [
            FutureBuilder(
                future: widget.house.ensurePopulated(),
                builder: (context, snapshot) {
                  if (snapshot.hasData && snapshot.data == true) {
                    return widget.house.owner['id'] == loggedInUserId
                        ? Row(
                            children: [
                              IconButton(
                                onPressed: () {
                                  showDialog(
                                    context: context,
                                    builder: (context) => StatefulBuilder(
                                        builder: (context, stateSetter) {
                                      return AlertDialog(
                                        title: Text("Are you sure?"),
                                        content: Column(
                                          mainAxisSize: MainAxisSize.min,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text("This cannot be undone."),
                                            if (deleting)
                                              Padding(
                                                padding: EdgeInsets.all(20),
                                                child:
                                                    LinearProgressIndicator(),
                                              ),
                                          ],
                                        ),
                                        actions: [
                                          if (!deleting)
                                            TextButton(
                                              onPressed: () async {
                                                stateSetter(
                                                  () {
                                                    deleting = true;
                                                  },
                                                );
                                                var resp = await http.delete(
                                                  Uri.parse(
                                                      "$BASE_URL/property/house/${widget.house.id}"),
                                                  headers:
                                                      getSessionCookieHeader(),
                                                );
                                                handleResponse(resp);
                                                if (resp.statusCode == 200) {
                                                  Provider.of<HouseProvider>(
                                                          context,
                                                          listen: false)
                                                      .fetchAll();
                                                  Provider.of<HouseProvider>(
                                                          context,
                                                          listen: false)
                                                      .fetchMine();
                                                  Navigator.of(context).pop();
                                                  Navigator.of(context).pop();
                                                  showSnackBar(
                                                      "House Deleted Successfully");
                                                }
                                              },
                                              child: Text("Yes, Delete"),
                                            ),
                                          if (!deleting)
                                            TextButton(
                                              onPressed: () {
                                                Navigator.of(context).pop();
                                              },
                                              child: Text(
                                                "No",
                                                style: TextStyle(
                                                    fontWeight:
                                                        FontWeight.bold),
                                              ),
                                            ),
                                        ],
                                      );
                                    }),
                                  );
                                },
                                icon: Icon(
                                  Icons.delete,
                                  color: Colors.red,
                                ),
                              ),
                              IconButton(
                                onPressed: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (context) =>
                                          MyUpdateHouse(house: widget.house)));
                                },
                                icon: Icon(
                                  Icons.edit,
                                  color: Colors.white,
                                ),
                              )
                            ],
                          )
                        : Container();
                  } else if (snapshot.hasError) {
                    return Text("Error: ${snapshot.error}");
                  } else {
                    return CircularProgressIndicator();
                  }
                }),
          ],
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      FutureBuilder(
                          future: widget.house.getImages(),
                          builder: (context, snapshot) {
                            if (snapshot.hasData) {
                              var images = snapshot.data as List<String>;
                              return SizedBox(
                                height:
                                    MediaQuery.of(context).size.height * 0.2,
                                child: PageView(
                                  children: [
                                    for (String image in images)
                                      Image.network(image),
                                  ],
                                ),
                              );
                            }

                            return const Placeholder();
                          }),
                      Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Text(
                          widget.house.title,
                          style: const TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 8.0),
                          height: MediaQuery.of(context).size.height * 0.06,
                          color: Colors.grey.shade300,
                          child: Row(
                            children: [
                              for (int index = 0;
                                  index < buttonTitles.length;
                                  index++)
                                Expanded(
                                  child: GestureDetector(
                                    onTap: () {
                                      updateContainerVisibilities(index);
                                    },
                                    child: Container(
                                      color: selectedIndex == index
                                          ? MyAppColors.kButtonColor
                                          : Colors.transparent,
                                      child: Center(
                                        child: Text(
                                          buttonTitles[index],
                                          style: TextStyle(
                                            color: selectedIndex == index
                                                ? MyAppColors.kBaseColor
                                                : Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ),
                      /* Inside description button container */
                      if (containerVisibilities[0])
                        Container(
                          color: Colors.grey.shade300,
                          width: MediaQuery.of(context).size.width,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              //title
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 ${widget.house.title}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                              //type
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 For ${widget.house.type}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                              //occupancy
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 Occupancy ${widget.house.occupancy}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                              //no. of bathhouse
                              // for (HouseModel house in houseDataList)
                              // Text(
                              //   '\u2022 Bathhouse ${widget.house.bathHouse}',
                              //   style: const TextStyle(
                              //       fontSize: 16.0, fontWeight: FontWeight.bold),
                              // ),
                              //no. of bathhouse
                              // for (HouseModel house in houseDataList)
                              // Text(
                              //   '\u2022 House Size: ${widget.house.size}',
                              //   style: const TextStyle(
                              //       fontSize: 16.0, fontWeight: FontWeight.bold),
                              // ),
                              //no. of bathhouse
                              // for (HouseModel house in houseDataList)
                              // Text(
                              //   '\u2022 Cost: Rs. ${widget.house.cost}',
                              //   style: const TextStyle(
                              //       fontSize: 16.0, fontWeight: FontWeight.bold),
                              // ),
                              //description
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 Description ${widget.house.description}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      /* Inside feature button container */
                      if (containerVisibilities[1])
                        Container(
                          color: Colors.grey.shade300,
                          width: MediaQuery.of(context).size.width,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              //for feature
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 ${widget.house.feature}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      /* Inside facilities button container */
                      if (containerVisibilities[2])
                        Container(
                          color: Colors.grey.shade300,
                          width: MediaQuery.of(context).size.width,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              //for facilities
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 ${widget.house.facilities}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      /* Inside location button container */
                      if (containerVisibilities[3])
                        Container(
                          color: Colors.grey.shade300,
                          width: MediaQuery.of(context).size.width,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              //for location
                              // for (HouseModel house in houseDataList)
                              Text(
                                '\u2022 ${widget.house.address}',
                                style: const TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
        bottomNavigationBar: FutureBuilder(
            future: widget.house.getOwner(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                Map<String, dynamic> ownerData =
                    snapshot.data as Map<String, dynamic>;
                return BottomAppBar(
                  child: ElevatedButton(
                    style: ButtonStyle(
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(100.0),
                        ),
                      ),
                    ),
                    child: Text("Contact Owner"),
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return ContactOwnerDialog(
                            name: ownerData['name'],
                            // phoneNumber: ownerData['phoneNumber'],
                            email: ownerData['email'],
                          );
                        },
                      );
                    },
                  ),
                );
              } else {
                return SizedBox(
                  height: 0,
                  width: 0,
                );
              }
            }),
      );
    });
  }
}
