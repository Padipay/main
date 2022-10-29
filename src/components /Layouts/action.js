import React from 'react';
import RecoverEmail from '../authentication/RecoverEmail';
import NewPassword from '../authentication/newPassword';
import VerifyEmail from '../authentication/verifyEmail';

import NotFound from './NotFound';


const Action = (props) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // searchParams.getAll("mode")


  // console.log(searchParams)
  // // Get the action to complete.
  const getParams = new URLSearchParams(window.location.search);
  const mode = getParams.get('mode')

  // // Get the one-time code from the query parameter.
  const actionCode = getParams.get('oobCode')

  // // (Optional) Get the API key from the query parameter.
  // // const apiKey = props.location.query.apiKey;

  // Handle the user management action.
  switch (mode) {
    case 'recoverEmail':
      // Display reset password handler and UI.
      return <RecoverEmail actionCode={actionCode} />;
    case 'resetPassword':
      // Display email recovery handler and UI.
      return <NewPassword actionCode={actionCode} />;
    case 'verifyEmail':
      // Display email verification handler and UI.
      return <VerifyEmail actionCode={actionCode} />;
    default:
      // Error: invalid mode.
      return (
        <NotFound />
      );
  }
}

export default Action;