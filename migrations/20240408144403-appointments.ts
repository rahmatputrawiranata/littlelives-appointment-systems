module.exports = {
  async up(db, client) {
    await db.createCollection('appointments', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "startDateTime", "endDateTime", "status"],
          properties: {
            userId: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            startDateTime: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            endDateTime: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            status: {
              enum: ["active", "cancelled"],
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
  },

  async down(db, client) {
    await db.collection('appointments').drop()
  }
};
