module.exports = {
  async up(db, client) {
    const configCollections = db.collection('configs')
    const configs = {
      maxNumOfSlot: 5,
      minimumSlotDuration: 5,
      defaultSlotDuration: 30,
      workingDays: [
        {
          day: "Monday",
          start: "09:00",
          end: "17:00",
          breaks: [
            {
              start: "12:00",
              end: "13:00"
            }
          ]
        },
        {
          day: "Tuesday",
          start: "09:00",
          end: "17:00",
          breaks: [
            {
              start: "12:00",
              end: "13:00"
            }
          ]
        },
        {
          day: "Wednesday",
          start: "09:00",
          end: "17:00",
          breaks: [
            {
              start: "12:00",
              end: "13:00"
            }
          ]
        },
        {
          day: "Thursday",
          start: "09:00",
          end: "17:00",
          breaks: [
            {
              start: "12:00",
              end: "13:00"
            }
          ]
        },
        {
          day: "Friday",
          start: "09:00",
          end: "17:00",
          breaks: [
            {
              start: "12:00",
              end: "13:00"
            }
          ]
        }
      ],
      holidays: [
        new Date("2025-01-01T16:01:04.000Z")
      ],
      urgentBreaks: [
        {
          start: "09:00",
          end: "10:00",
          date: new Date("2025-01-02T16:01:04.000Z"),
          reason: "Urgent Break"
        }
      ]
    }

    await configCollections.insertOne(configs)
  },

  async down(db, client) {
    await db.collection('configs').drop()
  }
};
