import 'package:flutter/material.dart';

abstract class Searchable {
  List<String> getRelevantSearchWords();

  Widget buildSearchResultCard(BuildContext context);

  Widget buildHorizontalCard(BuildContext context);

  String getType();
}

extension SearchExtension on Searchable {
  bool matches(String query) {
    if (query.trim().isEmpty) return false;
    String refinedQuery = query.trim().toLowerCase();
    List<String> relevantWords = getRelevantSearchWords();
    for (String word in relevantWords) {
      if (word.toLowerCase().contains(refinedQuery)) {
        return true;
      }
    }
    return false;
  }
}
