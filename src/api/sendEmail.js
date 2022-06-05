export const sendVerificationEmail = async (userEmail, username) => {
    await fetch('http://localhost:5000/send-custom-verification-email', {
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