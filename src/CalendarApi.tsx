import { useEffect, useState } from "react";

type Holiday = { "date": string, "localName": string, "countryCode": string, "fixed": string, "global": string, "types": string[] }

async function getText(satYear: string): Promise<Holiday[]> {
    return JSON.parse(await (await fetch("https://date.nager.at/api/v3/publicholidays/" + satYear + "/DE")).text());
}

function ListHolidays() {
    const [keys, setKeys] = useState<Holiday[]>([]);
    const [year, setYear] = useState<string>("2024");
    const [satYear, setSatYear] = useState<string>("2024");

    useEffect(() => {
        getText(satYear).then((value) => {
            setKeys(value);
        });
    }, [satYear])
    return <>
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {keys.map((holiday) =>
                            <tr key={holiday.date + "-" + holiday.localName}>
                                <td>
                                    {holiday.date}
                                </td>
                                <td>
                                    {holiday.localName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <input type="number" value={year} onChange={(e) => { setYear(e.target.value) }} />
                <input type="submit" onClick={() => { setSatYear(year) }} />
            </div>
        </div>
    </>
}

export default ListHolidays;