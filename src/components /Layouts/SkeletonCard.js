import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const StyledLi = styled.li`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 360px;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1pxsolidrgba(0,0,0,.125);
    border-radius: 0.75rem;
    width: auto;
    right: 27px;
`

function SkeletonCard() {
    return ( 
        <section>
        <ul className="list">
          {Array(1)
            .fill()
            .map((item, index) => (
              <StyledLi key={index}>
                <Skeleton 
                height={40} 
                borderRadius={12} 
                style={{marginLeft: 90, marginBottom: 20, marginTop: 20, width: '55%'}}
                />
                <Skeleton 
                height={70} 
                count={4} 
                borderRadius={12} 
                style={{marginLeft: 26, marginBottom: 20, width: '88%'}}/>
              </StyledLi>
            ))}
        </ul>
      </section>
     );
}

export default SkeletonCard;