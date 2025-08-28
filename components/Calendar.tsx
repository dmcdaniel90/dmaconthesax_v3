
import React from 'react';
import { useCalendar } from 'use-fullcalendar';

type CalendarProps = {
    setDate: (date: Date) => void
}

const mockEvents = {
    events: [
        {
            start: '2025-08-15T16:00:00',
            end: '2025-08-15T23:00:00',
            title: 'Event 1',
            allDay: false,
        }
    ]
}

export default function CustomCalendar(props: CalendarProps) {
    const { setDate } = props
    const themeConfig = {
        light: {
            backgroundColor: 'bg-white',
            textColor: 'text-black'
        },
        dark: {
            backgroundColor: 'bg-gray-950/80',
            textColor: 'text-white'
        }
    }

    const { CalendarComponent } = useCalendar({

        theme: 'light',
        themeConfig: themeConfig,
        calendarConfiguration: {
            aspectRatio: 2,
            businessHours: [
                {
                    daysOfWeek: [1, 2, 3, 4],
                    start: '16:00',
                    end: '23:00',
                },
                {
                    daysOfWeek: [5],
                    start: '16:00',
                    end: '23:59',
                },
                {
                    daysOfWeek: [0, 6],
                    start: '10:00',
                    end: '23:59',
                },
            ],
            eventSources: [{ ...mockEvents }],
            initialDate: new Date(),
            initialView: 'dayGridMonth',
            dayCellClassNames: `cursor-pointer hover:bg-gray-900/40`,

        },
        functions: {
            handleDateClick: (info) => {
                const date = new Date(info.dateStr)
                setDate(date)
            }
        }

    })

    const styleOverrides = {
        ".fc-toolbar-title": {
            color: 'white',
            fontWeight: 'bold'
        },
    }


    return (
        <div className='bg-gray-950/20 px-8 py-8 rounded-2xl' style={styleOverrides[".fc-toolbar-title"]}>
            <CalendarComponent />
        </div >
    );
}