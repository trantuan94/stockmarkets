db.createUser(
  {
      user: "stockmarket",
      pwd: "123456",
      roles: [
          {
              role: "readWrite",
              db: "stockmarket_db"
          }
      ]
  }
);