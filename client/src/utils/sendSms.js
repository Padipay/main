export const sendSms = async (numberTo, body) => {
    await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/messages`, {
      method: 'POST',
      body: JSON.stringify({
        numberTo,
        body,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (!res.ok) {
          throw Error('Could not send message')
      }
      return res.json()
    })
}