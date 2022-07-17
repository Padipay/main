export const transactSuccessEmail = async (userEmail, send, receive, token, date, id) => {
    await fetch('http://localhost:5000/send-success-email', {
        method: 'POST',
        body: JSON.stringify({
          userEmail,
          id,
          send,
          receive,
          token,
          date
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