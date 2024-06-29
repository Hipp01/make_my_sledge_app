import { useEffect, useRef } from 'react';
import '../../assets/css/CircularProgressBar.css';

const CircularProgressBar = ({ value, color, label }) => {
    const circleRef = useRef(null);

    useEffect(() => {
        const radius = circleRef.current.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (value / 100) * circumference;
        
        circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
        circleRef.current.style.strokeDashoffset = offset;
    }, [value]);

    return (
        <div className="progress-circle">
            <svg className="progress-ring" width="120" height="120">
                <circle
                    className="progress-ring__circle"
                    stroke={color}
                    strokeWidth="8"
                    fill="transparent"
                    r="55"
                    cx="60"
                    cy="60"
                    ref={circleRef}
                />
            </svg>
            <div className="progress-circle__label">{label}</div>
            <div className="progress-circle__percentage">{value}%</div>
        </div>
    );
};

export default CircularProgressBar;
