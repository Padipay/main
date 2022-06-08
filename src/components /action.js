import React from 'react';
import RecoverEmail from './RecoverEmail';
import ResetPassword from './resetPassword';
import VerifyEmail from './verifyEmail';
import { useSearchParams } from 'react-router-dom';
import NotFound from './NotFound';


const Action = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.getAll()

  console.log(searchParams)
  
  // // Get the action to complete.
  // const mode = props.location.query.mode;

  // // Get the one-time code from the query parameter.
  // const actionCode = props.location.query.oobCode;

  // // (Optional) Get the API key from the query parameter.
  // // const apiKey = props.location.query.apiKey;

  // Handle the user management action.
  switch (searchParams.mode) {
    case 'recoverEmail':
      // Display reset password handler and UI.
      return <RecoverEmail actionCode={searchParams.actionCode} />;
    case 'resetPassword':
      // Display email recovery handler and UI.
      return <ResetPassword actionCode={searchParams.actionCode} />;
    case 'verifyEmail':
      // Display email verification handler and UI.
      return <VerifyEmail actionCode={searchParams.actionCode} />;
    default:
      // Error: invalid mode.
      return (
        <NotFound />
      );
  }
}

export default Action;