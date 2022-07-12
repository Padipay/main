import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';


function CountdownTimer() {
    const navigate = useNavigate()

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a completed state
        return navigate("/"), sessionStorage.clear()
        } else {
        // Render a countdown
        return <span className="timer">{minutes}:{seconds}</span>;
        }
    };

    return ( 
        <Countdown date={Date.now() + 600000}  renderer={renderer}/>
     );
}

export default memo(CountdownTimer);