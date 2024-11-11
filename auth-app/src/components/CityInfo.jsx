import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../AuthProvider";

const CityInfo = ({ match }) => {
    const { token } = useAuth();
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await axios.get(`/cities/${match.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCity(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching city:', error);
                setLoading(false);
            }
        };

        fetchCityData();
    }, [token, match.params.id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>City Details</h2>
            {city ? (
                <div>
                    <h2>City Information</h2>
                    <p><strong>Name:</strong> {city.name}</p>
                    <p><strong>Population:</strong> {city.population}</p>
                    <p><strong>Area:</strong> {city.area}</p>
                    <p><strong>Capital:</strong> {city.capital ? "Yes" : "No"}</p>
                    <p><strong>Meters Above Sea Level:</strong> {city.metersAboveSeaLevel}</p>
                    <p><strong>Car Code:</strong> {city.carCode}</p>
                    <p><strong>Agglomeration:</strong> {city.agglomeration}</p>
                    <p><strong>Climate:</strong> {city.climate}</p>
                    <p><strong>Coordinates:</strong> X: {city.coordinates.x}, Y: {city.coordinates.y}</p>
                    <p><strong>Governor:</strong> {city.governor.height}</p>
                </div>
            ) : (
                <p>City not found.</p>
            )}
        </div>
    );
};

export default CityInfo;
