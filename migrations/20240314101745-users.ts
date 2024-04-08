module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["password", "username"],
          properties: {
            password: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            username: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date"
            },
          }
        }
      }
    })

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
  },

  async down(db, client) {
    await db.collection('users').drop()
  }
};
