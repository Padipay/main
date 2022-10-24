import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';
import { endTimer } from "../../redux/transfer/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import TimeOutModal from "./timeoutModal";

function CountdownTimer() {
    const navigate = useNavigate();
    const [data, setData] = useState(
        { date: Date.now(), delay: 600000 } //60 seconds
      );
    const wantedDelay = 600000;

    const dispatch = useDispatch();
    const {end_time} = useSelector(state => state.transfer_details)


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a completed state
        return <TimeOutModal open={true}/>
        } else {
        // Render a countdown
        return <span className="timer">{minutes}:{seconds}</span>;
        }
    };

    useEffect(() => {
        const savedDate = end_time;
        if (savedDate != null && !NaN(savedDate)) {
            const currentTime = Date.now();
            const delta = parseInt(savedDate, 10) - currentTime;

            if (delta > wantedDelay) {
                //Yes we clear our saved end date
                if (end_time > 0)
                  dispatch(endTimer(null))
              } else {
                //No update the end date  
                setData({ date: currentTime, delay: delta });
              }
        }
    }, [])

    return ( 
        <Countdown date={data.date + data.delay}  
        renderer={renderer} 
        onStart={() => {
            if (end_time == null)
                // localStorage.setItem("end_date", 
                // JSON.stringify(data.date + data.delay));
                dispatch(endTimer(JSON.stringify(data.date + data.delay)))
            
        }}
        onComplete={() => {
            if (end_time != null)
            //   localStorage.removeItem("end_date");
              dispatch(endTimer(null))
          }}
        />
     );
}

export default CountdownTimer;