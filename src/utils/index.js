const fincraBalance = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "api-key": process.env.REACT_APP_FINCRA_SECRET_KEY,
      },
    };
    const response = await fetch(
      `https://sandboxapi.fincra.com/wallets/${process.env.REACT_APP_FINCRA_WALLET_ID}`,
      options
    );
    return response.json();
  } catch (err) {
    throw Error(err.message);
  }
};

export default fincraBalance;
