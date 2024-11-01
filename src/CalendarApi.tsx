import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";

type Holiday = { "date": string, "localName": string, "countryCode": string, "fixed": string, "global": string, "types": string[] }

async function getText(satYear: string): Promise<Holiday[]> {
    return JSON.parse(await (await fetch("https://date.nager.at/api/v3/publicholidays/" + satYear + "/DE")).text());
}

function ListHolidays() {
    const currentYear = new Date().getFullYear().toString();
    const [loading, setLoading] = useState<boolean>(true);
    const [keys, setKeys] = useState<Holiday[]>([]);
    const [year, setYear] = useState<string>(currentYear);
    const [satYear, setSatYear] = useState<string>(currentYear);

    function addYear(i: number): void {
        const newyear: string = (parseInt(satYear) + i).toString();
        setYear(newyear);
        setSatYear(newyear);
    }

    useEffect(() => {
        getText(satYear).then((value) => {
            setKeys(value);
            setLoading(false);
        });
    }, [satYear])
    return <div className="flex flex-col gap-3 m-5">
        <div className="flex justify-center">
            {loading ?
                <>Loading ...</>
                :
                <table className="border-collapse border-black border-2">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-800">
                            <th>Date</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {keys.map((holiday) =>
                            <tr key={holiday.date + "-" + holiday.localName} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-700 dark:even:bg-gray-800">
                                <td className="p-1 px-3 text-right">
                                    {new Date(holiday.date).toLocaleDateString()}
                                </td>
                                <td className="p-1 px-3">
                                    {holiday.localName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
        <div className="flex justify-center">
            <ArrowLeftIcon className='icon' onClick={() => addYear(-1)} />
            <input className="text-black text-right border-black border-2" type="number" value={year} onChange={(e) => { setYear(e.target.value) }} />
            <ArrowPathIcon className='icon' onClick={() => setSatYear(year)} />
            <ArrowRightIcon className='icon' onClick={() => addYear(1)} />
        </div>
    </div>
}

export default ListHolidays;