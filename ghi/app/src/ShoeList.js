import React, { useState, useEffect } from 'react';

function ShoeList() {
    const [shoes, setShoes] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setShoes(data.shoes);
          console.log(data)
        }

      }

    useEffect(() => {
        fetchData();
    }, []);

    // async function deleteShoe(id) {
    //   let result = await fetch("http://localhost:8080/api/shoes/${id}/", {
    //     method: "DELETE"
    //   });
    //   result = await result.json();
    //   fetchData();
    // }

    // async function getData() {
    //   let result = await fetch("http://localhost:8080/api/shoes");
    //   result = await result.json()
    //   setData(result)
    // }

    return (
        <table className="table table-striped">
          <thead>
            <tr>
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
                <td>{ shoe.model_name }</td>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.bin.bin_number }</td>
                <td><button onClick={() => this.delete(shoe.id)} type="button" className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
             )
            })}
          </tbody>
        </table>
    )
}

export default ShoeList;
