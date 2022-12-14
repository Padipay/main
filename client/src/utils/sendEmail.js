export const sendVerificationEmail = async (userEmail, username=null) => {
    await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/send-custom-verification-email`, {
        method: 'POST',
        body: JSON.stringify({
          userEmail,
          username,
          redirectUrl: 'http://localhost:3000'
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }).then((res) => {
        if (!res.ok) {
            throw Error('Could not load the data for the resource ')
        }
        return res.json()
      })
}

export const sendPasswordResetEmail = async (userEmail) => {
  await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/send-reset-password-email`, {
      method: 'POST',
      body: JSON.stringify({
        userEmail,
        redirectUrl: 'http://localhost:3000'
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (!res.ok) {
          throw Error('Could not load the data for the resource ')
      }
      return res.json()
    })
}