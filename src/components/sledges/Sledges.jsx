import { useLocation } from 'react-router-dom';

export default function Sledges() {
    const location = useLocation();
    const { data } = location.state || {};

    if (!data) {
        return <div>Data not received</div>;
    }

    return (
        <div>
            <h1>Sledges Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {
                data.map((sledge, i) => (
                    <div key={i}>
                        <h2>{sledge.name.charAt(0).toUpperCase() + sledge.name.slice(1) }&apos;s sledge</h2>
                    </div>
                ))
            }
            <button onClick={() => window.history.back()} className='btn btn-primary'>Go back</button>
        </div>
    );
};

