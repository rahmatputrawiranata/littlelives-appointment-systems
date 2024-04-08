module.exports = {
  async up(db, client) {
    await db.createCollection('configs', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          properties: {
            workingDays: {
              bsonType: "array",
              description: "must be a array",
              items: {
                bsonType: "object",
                required: ["day", "start", "end"],
                properties: {
                  day: {
                    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    description: "must be a string and is required"
                  },
                  start: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  end: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  breaks: {
                    bsonType: "array",
                    description: "must be a array",
                    items: {
                      bsonType: "object",
                      required: ["start", "end"],
                      properties: {
                        start: {
                          bsonType: "string",
                          description: "must be a string and is required"
                        },
                        end: {
                          bsonType: "string",
                          description: "must be a string and is required"
                        }
                      }
                    }
                  }
                }
              }
            },
            holidays: {
              bsonType: "array",
              description: "must be a array",
              items: {
                bsonType: "date",
                description: "must be a date"
              }
            },
            urgentBreaks: {
              bsonType: "array",
              description: "must be a array",
              items: {
                bsonType: "object",
                required: ["start", "end", "date"],
                properties: {
                  start: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  end: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  date: {
                    bsonType: "date",
                    description: "must be a date"
                  },
                  reason: {
                    bsonType: "string",
                    description: "must be a string"
                }
              }
            }
          },
          maxNumOfSlot: {
            bsonType: "int",
            description: "must be a int"
          },
          defaultSlotDuration: {
            bsonType: "int",
            description: "must be a int"
          },
          minimumSlotDuration: {
            bsonType: "int",
            description: "must be a int"
          } 
          }
        }
      }
    })

    
  },

  async down(db, client) {
    await db.collection('configs').drop()
  }
};
