// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'dart:io';
// // MyImagePicker




// class MyImagePicker extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Image Picker',
//       theme: ThemeData(
//         primarySwatch: Colors.blue,
//       ),
//       home: ImagePickerPage(),
//     );
//   }
// }

// class ImagePickerPage extends StatefulWidget {
//   const ImagePickerPage({super.key});

//   @override
//   _ImagePickerPageState createState() => _ImagePickerPageState();
// }

// class _ImagePickerPageState extends State<ImagePickerPage> {
//   File? _pickedImage;

//   Future<void> _pickImage(ImageSource source) async {
//     final picker = ImagePicker();
//     final pickedImage = await picker.getImage(source: source);

//     setState(() {
//       if (pickedImage != null) {
//         _pickedImage = File(pickedImage.path);
//       } else {
//         print('No image selected.');
//       }
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Image Picker'),
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             _pickedImage != null
//                 ? Image.file(
//                     _pickedImage!,
//                     height: 200,
//                   )
//                 : Text('No image selected.'),
//             SizedBox(height: 20),
//             ElevatedButton(
//               onPressed: () => _pickImage(ImageSource.gallery),
//               child: Text('Pick Image from Gallery'),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
