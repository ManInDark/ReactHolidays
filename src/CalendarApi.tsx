import { useEffect, useState } from "react";

type Holiday = { "date": string, "localName": string, "countryCode": string, "fixed": string, "global": string, "types": string[] }

async function getText(): Promise<Holiday[]> {
    const resp = await fetch("https://date.nager.at/api/v3/publicholidays/2024/DE")
    const text_resp = await resp.text();
    return JSON.parse(text_resp);
}

function ListHolidays() {
    const [keys, setKeys] = useState<Holiday[]>([]);
    useEffect(() => {
        getText().then((value) => {
            setKeys(value);
        });
    }, [])
    return <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            { keys.map((holiday) => 
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
}

export default ListHolidays;