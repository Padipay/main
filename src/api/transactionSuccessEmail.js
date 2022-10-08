export const transactSuccessEmail = async (userEmail, send, receive, token, date, id) => {
  try {
    const options = {method: 'POST', body: JSON.stringify({userEmail, id, send, receive, token, date}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/send-success-email`, options)
      return await response.json()
  } catch (error) {
    console.log(error.message)
  }
}