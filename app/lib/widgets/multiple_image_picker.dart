import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class MultipleImagePicker extends StatefulWidget {
  final Function(List<XFile>) onImagesChanged;

  final int limit;

  final int minimum;

  const MultipleImagePicker({
    super.key,
    required this.onImagesChanged,
    this.limit = 6,
    this.minimum = 1,
  });

  @override
  State<MultipleImagePicker> createState() => _MultipleImagePickerState();
}

class _MultipleImagePickerState extends State<MultipleImagePicker> {
  final double heightOfBox = 60.0;

  List<XFile> choosenImages = [];

  final ImagePicker picker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text("Choose Images"),
              if (choosenImages.length < widget.minimum)
                Text(" (Remaining: ${widget.minimum - choosenImages.length})")
            ],
          ),
          SizedBox(
            height: 12,
          ),
          Wrap(
            alignment: WrapAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: SizedBox(
                  height: heightOfBox,
                  width: heightOfBox,
                  child: InkWell(
                    onTap: () async {
                      if (choosenImages.length >= widget.limit) {
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content:
                                Text("Only ${widget.limit} images allowed")));
                        return;
                      }

                      final XFile? pickedImage =
                          await picker.pickImage(source: ImageSource.gallery);

                      if (pickedImage != null) {
                        setState(() {
                          choosenImages.add(pickedImage);
                        });
                        widget.onImagesChanged(choosenImages);
                      }
                    },
                    child: Container(
                      decoration: BoxDecoration(
                          color: Colors.grey.withOpacity(0.6),
                          border: Border.all(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8)),
                      child: Center(
                          child: Icon(
                        Icons.add,
                        size: 40,
                      )),
                    ),
                  ),
                ),
              ),
              for (XFile pickedImage in choosenImages)
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    height: heightOfBox,
                    width: heightOfBox,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: Colors.grey,
                        ),
                        image: DecorationImage(
                          image: FileImage(
                            File(pickedImage.path),
                          ),
                        ),
                      ),
                      child: Stack(
                        children: [
                          Align(
                            alignment: Alignment.topRight,
                            child: InkWell(
                              child: Icon(
                                Icons.cancel,
                                color: Colors.red.withOpacity(0.7),
                              ),
                              onTap: () {
                                setState(() {
                                  choosenImages.remove(pickedImage);
                                });
                                widget.onImagesChanged(choosenImages);
                              },
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
