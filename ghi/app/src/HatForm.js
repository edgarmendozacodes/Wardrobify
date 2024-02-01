import React, {useState, useEffect } from 'react';

function HatForm(){
    const [locations, setLocations] = useState([]); 
    const [fabric, setFabric] = useState(''); 
    const [styleName, setStyleName] = useState('');
    const [color, setColor ] = useState('');
    const [urlPic, setUrlPic ] = useState('');
    const [location, setLocation ] = useState('');
    // const [,  ] = ('');      
    
    // const handleChange = (event) => {
    //     const value = event.target.value;
    //     set (value);
    // }
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
        setUrlPic(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            fabric: fabric,
            style_name: styleName, 
            color: color, 
            url_pic: urlPic,
            location: location, 
        };

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
    const    

    }
}
