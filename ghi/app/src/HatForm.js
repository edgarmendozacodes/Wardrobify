import React, {useState, useEffect } from 'react';

function HatForm(){
    const [locations, setLocations] = useState([]); 
    const [fabric, setFabric] = useState(''); 
    const [styleName, setStyleName] = useState('');
    const [color, setColor ] = useState('');
    const [pictureUrl, setPictureUrl ] = useState('');
    const [location, setLocation ] = useState('');

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }
    const handleSyleNameChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleUrlPicChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
            data.fabric= fabric;
            data.style_name= styleName; 
            data.color= color;
            data.picture_url= pictureUrl;
            data.location= location; 
            console.log(data);
        

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        const response = await fetch(hatUrl, fetchConfig);
            if (response.ok) {
                setStyleName('');
                setFabric('');
                setColor('');
                setPictureUrl('');
                setLocation('');
            }  
}
const fetchData = async () => {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
    }
}
useEffect(() => {
    fetchData();
  }, []);

  return(
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1> Add a Hat! </h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input value={fabric} onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                        <label htmlFor="fabric">Fabric</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={styleName} onChange={handleSyleNameChange} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control" />
                        <label htmlFor="style_name">Style Name</label>
                    </div>                    <div className="form-floating mb-3">
                        <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>                    <div className="form-floating mb-3">
                        <input value={pictureUrl} onChange={handleUrlPicChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture URL</label>
                    </div>                    
                        <div className="mb-3">
                        <select value={location} onChange={handleLocationChange} placeholder="Location" name="location" id="location" className="form-select">
                        <option value=""> Choose a Hat Location </option>
                        {locations.map(location => {
                            return (
                                <option key={location.id} value={location.href}>
                                    {location.closet_name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                <button className="btn btn-primary"> Create </button>
                </form>

            </div>    
        </div>
    </div>
);
}
export default HatForm;
