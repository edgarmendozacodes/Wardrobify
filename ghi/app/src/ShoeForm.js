import React, { useEffect, useState } from 'react';


function ShoeForm() {
    const [bins, setBins] = useState([]);
    const [modelName, setModelName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [bin, setBin] = useState('');

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/bins/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setBins(data.bins);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};
      data.model_name = modelName;
      data.manufacturer = manufacturer;
      data.color = color;
      data.picture_url = pictureUrl;
      data.bin = bin;

      const shoeUrl = `http://localhost:8080/api/shoes/`;
      const fetchOptions = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(shoeUrl, fetchOptions);
        if (response.ok) {
          setModelName('');
          setManufacturer('');
          setColor('');
          setPictureUrl('');
          setBin('');
        }
    }

    const handleModelNameChange = (event) => {
      const value = event.target.value;
      setModelName(value);
    }

    const handleManufacturerChange = (event) => {
      const value = event.target.value;
      setManufacturer(value);
    }

    const handleColorChange = (event) => {
      const value = event.target.value;
      setColor(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
      }

    const handleBinChange = (event) => {
      const value = event.target.value;
      setBin(value);
    }

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add shoes</h1>
              <form onSubmit={handleSubmit} id="create-shoe-form">
                <div className="form-floating mb-3">
                  <input onChange={handleModelNameChange} value={modelName} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control" />
                  <label htmlFor="model_name">Model name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                  <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} value={color} placeholder="Color" type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture url" type="text" name="picture_url" id="cpicture_url" className="form-control" />
                  <label htmlFor="picture_url">Picture</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleBinChange} value={bin} required name="bin" id="bin" className="form-select">
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                      return (
                        <option key={bin.id} value={bin.href}>{bin.bin_number}</option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      );
  }


  export default ShoeForm;
