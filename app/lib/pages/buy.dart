
import 'package:flutter/material.dart';
import 'package:room_rent/widgets/app_bar.dart';

class MyBuyPage extends StatefulWidget {
  const MyBuyPage({super.key});

  @override
  State<MyBuyPage> createState() => _MyBuyPageState();
}

class _MyBuyPageState extends State<MyBuyPage> {
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: MyAppBar(title: 'Buy'),
      body: MyBuyCard(),
    );
  }
}
/* https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg */
class MyBuyCard extends StatelessWidget {
  const MyBuyCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        margin: const EdgeInsets.all(16.0),
        elevation: 4.0,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.1,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.vertical(top: Radius.circular(12.0)),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage('https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg'),
                ),
              ),
            ),
            const ListTile(
              title: Text(
                'House in Switzerland',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20.0,
                ),
              ),
              subtitle: Text('Pokhara-25, Hemja'),
            ),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'Cost',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}