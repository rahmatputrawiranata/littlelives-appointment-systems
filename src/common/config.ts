export const config ={
    maxNumOfSlot: 5,
    defaultSlotDuration: 30,
    minimumSlotDuration: 5,
    workingDays: [
        {
            "day": "Monday",
            "start": "09:00",
            "end": "17:00",
            "breaks": [
                {
                    "start": "12:00",
                    "end": "13:00"
                }
            ]
        },
        {
            "day": "Tuesday",
            "start": "09:00",
            "end": "17:00",
            "breaks": [
                {
                    "start": "12:00",
                    "end": "13:00"
                }
            ]
        },
        {
            "day": "Wednesday",
            "start": "09:00",
            "end": "17:00",
            "breaks": [
                {
                    "start": "12:00",
                    "end": "13:00"
                }
            ]
        },
        {
            "day": "Thursday",
            "start": "09:00",
            "end": "17:00",
            "breaks": [
                {
                    "start": "12:00",
                    "end": "13:00"
                }
            ]
        },
        {
            "day": "Friday",
            "start": "09:00",
            "end": "17:00",
            "breaks": [
                {
                    "start": "12:00",
                    "end": "13:00"
                }
            ]
        }
    ],
    holidays: [
        '2021-01-01',
        '2021-01-26',
        '2021-04-02',
        '2021-04-25',
        '2021-06-14',
        '2021-12-25',
        '2021-12-26'
    ],
    urgentBreaks: [
        {
            "date" : "2021-01-01",
            "start": "09:00",
            "end": "12:00",
            "reason": "Office on fire"
        }
    ]
}