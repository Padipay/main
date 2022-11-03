const login = async (email, password) => {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": "C2WwqRrycjgSgT9BIDS1Uhz5kMVlaY0R",
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch("https://padipay-server.herokuapp.com/admin-login", options);
    if (response.status === 200) {
      return await response.json();
    }
    throw new Error("Email or password is wrong. Try again");
  } catch (error) {
    throw new Error("Email or password is wrong. Try again");
  }
};

export default login;
