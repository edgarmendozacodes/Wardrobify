import React, {useState, useEffect } from 'react';

function HatsList() {
    const [hatList, setHatlist] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/hats';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setHatlist(data);
        }
    }
    useEffect(() =>
        getData()
    }, [])

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th> Hat </th>
                    <th> Location </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>

                </tr>
            </tbody>
        </table>
    )
}
