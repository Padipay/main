const getPayouts = async (perPage) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": "C2WwqRrycjgSgT9BIDS1Uhz5kMVlaY0R",
      },
    };
    const response = await fetch(
      `https://sandboxapi.fincra.com/disbursements/payouts?business=${process.env.REACT_APP_FINCRA_BUSINESS_ID}&page=1&perPage=${perPage}&includeSubAccounts=false`,
      options
    );
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export default getPayouts;
