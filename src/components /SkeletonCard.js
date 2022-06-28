import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

// const FirstSkeleton = 

function SkeletonCard() {
    return ( 
        <section>
        <ul className="list">
          {Array(1)
            .fill()
            .map((item, index) => (
              <li className="card" key={index}>
                <Skeleton 
                height={40} 
                borderRadius={12} 
                style={{marginLeft: 90, marginBottom: 20, marginTop: 20, width: '55%'}}
                />
                <Skeleton 
                height={70} 
                count={4} 
                borderRadius={12} 
                style={{marginLeft: 24, marginBottom: 20, width: '88%'}}/>
              </li>
            ))}
        </ul>
      </section>
     );
}

export default SkeletonCard;