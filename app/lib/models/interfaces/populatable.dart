import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:room_rent/helpers/handle_response.dart';

import '../../helpers/functions.dart';

abstract class ImageAndOwnerPopulatable {
  List<String>? _images;

  Map<String, dynamic>? _owner;

  bool get isPopulated => _images != null && _owner != null;

  List<String> get images {
    if (!isPopulated) throw Exception("Not Populated yet");
    return _images!;
  }

  Map<String, dynamic> get owner {
    if (!isPopulated) throw Exception("Not Populated yet");
    return _owner!;
  }

  Future<bool> ensurePopulated() async {
    if (!isPopulated) {
      await getImages();
      await getOwner();
    }
    return true;
  }

// abstract methods
  String getImageFetchingURL();
  String getOwnerFetchingURL();

  Future<void> _fetchImages() async {
    try {
      var response = await http.get(Uri.parse(getImageFetchingURL()),
          headers: getSessionCookieHeader());
      handleResponse(response);
      _images = [];
      if (response.statusCode != 200) {
        throw Exception("Invalid Response");
      } else {
        var decoded = jsonDecode(response.body);

        for (var entry in decoded) {
          _images!.add(entry['image']);
        }
      }
    } catch (e) {
      print("Error Fetching Images: $e");
    }
  }

  Future<List<String>> getImages() async {
    if (_images == null) {
      await _fetchImages();
    }
    return _images!;
  }

  Future<void> _fetchOwner() async {
    try {
      var response = await http.get(Uri.parse(getOwnerFetchingURL()),
          headers: getSessionCookieHeader());
      _owner = {};
      if (response.statusCode != 200) {
        throw Exception("Invalid Response");
      } else {
        var decoded = jsonDecode(response.body) as Map;
        _owner = decoded['user'];
      }
    } catch (e) {
      print("Error Fetching Images: $e");
    }
  }

  Future<Map<String, dynamic>> getOwner() async {
    if (_owner == null) {
      await _fetchOwner();
    }
    return _owner!;
  }
}
