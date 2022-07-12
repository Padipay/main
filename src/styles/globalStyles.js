import styled from "styled-components";
import Spinner from 'react-spinkit';

export const StyledMainContentContainer = styled.div.attrs(() => ({
  className: 'col-lg-9 col-sm-10'
}))`
  max-width: 40%;
  margin-left: 58px;
  // display: flex;
  // justify-content: center
`
export const StyledMainFormContainer = styled.div`
  width: ${props => props.account ? '464px' : 'fit-content'};
  height: auto;
  background-color: #FFFF;
  box-sizing: border-box;
  box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  border-radius: 8px;
  padding-top: 20px;
`;

export const StyledFormContainer = styled.div `
  // width: auto;
  // height: auto;
  background-color: #FFFF;
  box-sizing: border-box;
  box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14);
  border-radius: 8px;
  padding-top: 40px;
`

export const StyledTabContainer = styled.div `
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`

export const StyledError = styled.p.attrs(() => ({
  className: 'mt-3'
}))`
    color: rgb(220, 53, 69);
    font-weight: 600;
    font-size: 15px;
    opacity: 1;
    text-align: center;
`

export const LargeSpinner = styled(Spinner)`
& > div {
  width: 10px;
  height: 10px;
}
`

// export const StyledFormFloatingContainer = styled.div.attrs(() => {
//   className: 'form-floating mb-3 me-4 ms-4'
// })`

// `