class User {
  int id;
  String name;
  String email;
  String role;
  DateTime createdAt;
  bool disableByAdmin;
  bool verified;
  String? profileImage;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.createdAt,
    required this.disableByAdmin,
    required this.verified,
    this.profileImage,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      createdAt: DateTime.parse(json['createdAt']),
      disableByAdmin: json['disable_by_admin'],
      verified: json['verified'],
      profileImage: json['profileImage'],
    );
  }
}
