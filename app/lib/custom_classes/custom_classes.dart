import 'package:flutter/material.dart';

class MySizedBox10 extends SizedBox {
  const MySizedBox10({Key? key})
      : super(
          key: key,
          height: 10,
        );
}

class MySizedBox30 extends SizedBox {
  const MySizedBox30({Key? key})
      : super(
          key: key,
          height: 30,
        );
}

//Padding (only)
class MyPadding extends Padding {
  const MyPadding({super.key, required Widget child})
      : super(
          padding: const EdgeInsets.only(
            left: 8.0,
            right: 8.0,
            top: 8.0,
          ),
          child: child,
        );
}

//margin (only)
class MyMargin {
  final double left;
  final double top;
  final double right;
  final double bottom;

  const MyMargin({
    this.left = 8.0,
    this.top = 0,
    this.right = 8.0,
    this.bottom = 0,
  });

  EdgeInsets getEdgeInsets() {
    return EdgeInsets.fromLTRB(left, top, right, bottom);
  }
}