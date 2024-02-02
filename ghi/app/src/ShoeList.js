import React, { useState, useEffect } from 'react';

function ShoeList() {
    const [shoes, setShoes] = useState([])

    const getShoes = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setShoes(data.shoes);
        }

      }

    async function deleteShoe(id) {
      const result = await fetch("http://localhost:8080/api/shoes/"+id, {
        method: "DELETE"
      });
      if (result.ok) {
        getShoes();
      }
    }

    useEffect(() => {
      getShoes();
    }, []);

    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Color</th>
              <th>Bin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map(shoe => {
             return (
              <tr key={shoe.id}>
                <td>
                  <img src={ shoe.picture_url } width="100" height="100" />
                </td>
                <td>{ shoe.model_name }</td>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.bin.bin_number }</td>
                <td><button onClick={() => deleteShoe(shoe.id)} type="button" className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
             )
            })}
          </tbody>
        </table>
    )
}

export default ShoeList;
