enum LoadingStatus { idle, loading, failed, loaded }

extension LoadingStatusExt on LoadingStatus {
  bool get isFinalised {
    return this == LoadingStatus.failed || this == LoadingStatus.loaded;
  }
}
