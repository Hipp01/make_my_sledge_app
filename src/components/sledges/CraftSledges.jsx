import { useState } from 'react';
import { fetchSled } from '../../API/api';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/app.css";

export default function CraftSledges() {
    const [numberOfSledges, setNumberOfSledges] = useState(0);
    const [sledgeData, setSledgeData] = useState([]);
    const navigate = useNavigate();

    const handleNumberOfSledgesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumberOfSledges(value);

        const newSledgeData = Array.from({ length: value }, (_, i) => sledgeData[i] || { name: '', weight: '', comfort_level: '', speed_desire: '' });
        setSledgeData(newSledgeData);
    };

    const handleSledgeDataChange = (index, field, value) => {
        const newSledgeData = [...sledgeData];
        newSledgeData[index][field] = value;
        setSledgeData(newSledgeData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Number of Sledges:', numberOfSledges);
        console.log('Sledge Data:', sledgeData);

        fetchSled(numberOfSledges, sledgeData)
            .then(data => {
                // Naviguer vers la page Sledges avec les données reçues
                navigate('/sledges', { state: { data } });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <h1 className='text-center mt-5 mb-4'>Craft your sledge</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="numberOfSledges">Number of Sledges</label>
                        <input
                            type="number"
                            className="form-control w-25"
                            id="numberOfSledges"
                            value={numberOfSledges}
                            onChange={handleNumberOfSledgesChange}
                            placeholder="Enter the number of sledges"
                            min="1"
                            max="3"
                        />
                    </div>
                    <div className="row justify-content-center mt-3">
                        {Array.from({ length: numberOfSledges }, (_, i) => (
                            <div key={i} className="col-md-4 col-sm-6 mb-3">
                                <div className="card bg-light h-100">
                                    <div className="card-body">
                                        <h2 className='text-center mb-3'>{sledgeData[i]?.name ? `${sledgeData[i].name}'s Sledge` : `Sledge n°${i + 1}`}</h2>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                id={`personName${i}`}
                                                value={sledgeData[i]?.name || ''}
                                                onChange={(e) => handleSledgeDataChange(i, 'name', e.target.value)}
                                                placeholder={`Enter the name`}
                                                maxLength="20"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`personWeight${i}`}>Person Weight (kg)</label>
                                            <input
                                                type="number"
                                                className="form-control mb-3"
                                                id={`personWeight${i}`}
                                                value={sledgeData[i]?.weight || ''}
                                                onChange={(e) => handleSledgeDataChange(i, 'weight', e.target.value)}
                                                placeholder={`Enter the weight`}
                                                min="30"
                                                max="150"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`comfortLevel${i}`}>Comfort Level with Dogs</label>
                                            <input
                                                type="range"
                                                className="form-control mb-3"
                                                id={`comfortLevel${i}`}
                                                value={sledgeData[i]?.comfort_level || ''}
                                                onChange={(e) => handleSledgeDataChange(i, 'comfort_level', e.target.value)}
                                                min="1"
                                                max="10"
                                            />
                                            <div className="range-labels d-flex justify-content-between">
                                                {[...Array(10).keys()].map(n => (
                                                    <span key={n}>{n + 1}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`speedDesire${i}`}>Speed Desire</label>
                                            <input
                                                type="range"
                                                className="form-control mb-3"
                                                id={`speedDesire${i}`}
                                                value={sledgeData[i]?.speed_desire || ''}
                                                onChange={(e) => handleSledgeDataChange(i, 'speed_desire', e.target.value)}
                                                min="1"
                                                max="10"
                                            />
                                            <div className="range-labels d-flex justify-content-between">
                                                {[...Array(10).keys()].map(n => (
                                                    <span key={n}>{n + 1}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <a href="/" className="btn btn-primary">Back to home</a>
        </div>
    );
}
