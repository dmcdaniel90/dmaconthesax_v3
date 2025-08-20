

export default function CalendarIcon({ day, numberMonth = 1 }: { day: number, numberMonth: number }) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][numberMonth - 1];

    if (month === undefined) {
        throw new Error(`Invalid month number: ${numberMonth} resulted in month: ${month}`);
    }

    return (

        <div className="flex flex-col w-[100px] h-[100px]">
            <div className="w-full h-12 flex justify-center items-center text-xl text-white bg-gray-400">{month}</div>
            <div className="w-full h-full flex justify-center items-center text-2xl font-bold text-gray-400 bg-white">{day}</div>
        </div>
    )
}
