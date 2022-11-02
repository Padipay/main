const getBnbalance = async () => {
  try {
    // const options = { method: "GET" };
    const response = await fetch(
      `https://api-testnet.bscscan.com/api?module=account&action=balance&address=0x78565af8DEfD0217EAd6723999D31aeaA763b848&apikey=${process.env.REACT_APP_BSC_SCAN_API_KEY}`
    );
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

export default getBnbalance;
