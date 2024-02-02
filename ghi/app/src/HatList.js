import React, {useState, useEffect } from 'react';
// useEffect = hook / allows dev to perform side effects

function HatList() {
    const [hats, setHats] = useState([])
    // useState hook of an array with hats as a state variable
    const getData = async () => {
        const url = 'http://localhost:8090/api/hats';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setHats(data.hat);
        } 
    };
    const deleteHat = async (id) => {
        const response = await fetch('http://localhost:8090/api/hats/'+id, {
            method: 'delete', 
        });
        if (response.ok) {
            getData();
        }
    };

    useEffect(() => { //hook
        getData(); // call
      }, []); // dependency array; if empty, only run once NOT forever
    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1> Look at all these Chickens </h1>
                    
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th> Fabric </th>
                                <th> Style </th>
                                <th> Color </th>
                                <th> Picture </th>
                                <th> Location </th>
                                <th> Delete </th>
                            </tr>
                        </thead>
                        <tbody>
                          {hats.map((hat) => {
                            return (
                            <tr key={hat.id} >
                                <td>{ hat.fabric }</td>
                                <td>{ hat.style_name }</td>
                                <td>{ hat.color }</td>
                                    <td>
                                        <img src={ hat.picture_url }
                                        alt = ""
                                        width="100px"
                                        height="100px"
                                        />
                                        </td> 
                                <td>{ hat.location }</td>
                                {<td>
                                    <button onClick={() => deleteHat(hat.id)} type="button" className="btn btn-danger">Delete</button>
                                </td>}
                            </tr>
                            );
                          })}
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    );
}
export default HatList;
