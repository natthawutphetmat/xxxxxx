"use client"

import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [namebil, setNamebil] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ads, setAds] = useState("");
    const [ads_price, setAds_price] = useState("");
    const [bil, setBil] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/bil');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBil(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addBil = () => {
        fetch('http://localhost:8000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                namebil: namebil,
                name: name,
                price: price,
                ads: ads,
                ads_price: ads_price
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add data');
            }
            return response.json();
        })
        .then((data) => {
            setBil([...bil, data]);
            clearForm();
        })
        .catch((error) => {
            console.error("Error adding data:", error);
        });
    };

    const deleteBil = (id) => {
        fetch(`http://localhost:8000/deleteapi/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
            const updatedBil = bil.filter(item => item.id !== id);
            setBil(updatedBil);
        })
        .catch((error) => {
            console.error("Error deleting data:", error);
        });
    };

    const clearForm = () => {
        setNamebil("");
        setName("");
        setPrice("");
        setAds("");
        setAds_price("");
    };

    return (
        <>
            <form  action='' >
                <input type="text" value={namebil} onChange={(e) => setNamebil(e.target.value)} placeholder="Namebil" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                <input type="text" value={ads} onChange={(e) => setAds(e.target.value)} placeholder="Ads" />
                <input type="text" value={ads_price} onChange={(e) => setAds_price(e.target.value)} placeholder="Ads Price" />
                <button type="button" onClick={addBil}>Add Data</button>
            </form>

            <ul>
                {bil.map((item) => (
                    <li key={item.id}>
                        <p>Namebil: {item.namebil}</p>
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Ads: {item.ads}</p>
                        <p>Ads Price: {item.ads_price}</p>
                        <button onClick={() => deleteBil(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Admin;

