import { useLocation } from 'react-router-dom';
import { fetchOneDog } from '../../API/api';
import { useEffect, useState } from 'react';
import CardDog from "../dogs/CardDog";

export default function Sledges() {
    const location = useLocation();
    const { data } = location.state || {};

    const [dogsData, setDogsData] = useState({});

    useEffect(() => {
        const fetchDogs = async (dogIds) => {
            const dogs = await Promise.all(dogIds.map(id => fetchOneDog(id)));
            const dogsMap = {};
            dogIds.forEach((id, index) => {
                dogsMap[id] = dogs[index];
            });
            setDogsData(dogsMap);
        };

        const dogIds = [
            ...data.map(sledge => sledge.back_1),
            ...data.map(sledge => sledge.back_2),
            ...data.map(sledge => sledge.middle_1),
            ...data.map(sledge => sledge.middle_2),
            ...data.map(sledge => sledge.front_1),
            ...data.map(sledge => sledge.front_2).filter(Boolean)
        ];

        fetchDogs(dogIds);
    }, [data]);

    if (!data) {
        return <div>Data not received</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-center mx-2">
                <h1>Sledges</h1>
            </div>
            {data.map((sledge, i) => (
                <div key={i} className="mb-4">
                    <h2 className='mx-2'>{sledge.name ? sledge.name.charAt(0).toUpperCase() + sledge.name.slice(1) + "'s sledge :" : "Sledge n°" + (i + 1) + " :"}</h2>
                    <div className="d-flex justify-content-evenly mt-3">
                        <h4 className='d-none d-xs-block d-lg-block text-danger'>Back dogs</h4>
                        <h4 className='d-none d-xs-block d-lg-block text-primary'>Middle dogs</h4>
                        <h4 className='d-none d-xs-block d-lg-block text-success'>{ sledge.front_2 ? "Front dogs" : "Front dog" }</h4>
                    </div>
                    <div className="w-100 d-block d-lg-none">
                        <h4 className='text-danger text-center mt-2'>Back dogs</h4>
                        <hr className="border border-danger flex-grow-1 mx-2 d-lg-none" />
                    </div>
                    <div className='d-flex justify-content-between mx-2 d-none d-xs-block d-lg-block'>
                        <div className="d-flex w-100">
                            <hr className="flex-fill border border-danger mx-1" />
                            <hr className="flex-fill border border-primary mx-1" />
                            {sledge.front_2 ? (
                                <>
                                    <hr className="flex-fill border border-success mx-1" />
                                </>
                            ) : (
                                <div className="d-flex flex-fill">
                                    <hr className="flex-fill border border-success bg-success mx-1" />
                                    <hr className="flex-fill border border-0 mx-1" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row no-gutters mx-2">
                        {['back_1', 'back_2'].map((position, index) => {
                            const dogId = sledge[position];
                            if (dogId && dogsData[dogId]) {
                                return (
                                    <div key={index} className="col-6 col-lg-2 p-1">
                                        <div className="card h-100">
                                            <CardDog dog={dogsData[dogId]} />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        <div className="w-100 d-block d-lg-none">
                            <h4 className='text-primary text-center mt-2'>Middle dogs</h4>
                            <hr className="border border-primary flex-grow-1 mx-2 d-lg-none" />
                        </div>
                        {['middle_1', 'middle_2'].map((position, index) => {
                            const dogId = sledge[position];
                            if (dogId && dogsData[dogId]) {
                                return (
                                    <div key={index} className="col-6 col-lg-2 p-1">
                                        <div className="card h-100">
                                            <CardDog dog={dogsData[dogId]} />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        <div className="w-100 d-block d-lg-none">
                            <h4 className='text-success text-center mt-2'>{ sledge.front_2 ? "Front dogs" : "Front dog" }</h4>
                            {sledge.front_2 ? (
                                <>
                                    <hr className="flex-fill border border-success mx-1" />
                                </>
                            ) : (
                                <div className="d-flex flex-fill">
                                    <hr className="flex-fill border border-success bg-success mx-1" />
                                    <hr className="flex-fill border border-0 mx-1" />
                                </div>
                            )}
                        </div>
                        {['front_1', 'front_2'].map((position, index) => {
                            const dogId = sledge[position];
                            if (dogId && dogsData[dogId]) {
                                return (
                                    <div key={index} className="col-6 col-lg-2 p-1">
                                        <div className="card h-100">
                                            <CardDog dog={dogsData[dogId]} />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}
            <button onClick={() => window.history.back()} className='btn btn-primary mx-2'>Go back</button>
        </div>
    );
}
