export const login = async (walletFile) => {
    const walletKey = JSON.parse(walletFile);
    localStorage.setItem("walletKey", JSON.stringify(walletKey));
    return true;
  };
  
  export const logout = () => {
    localStorage.removeItem("walletKey");
  };
  
  export const getWalletAddress = async () => {
    const walletKey = JSON.parse(localStorage.getItem("walletKey"));
    const arweave = arweave.init();
    return await arweave.wallets.jwkToAddress(walletKey);
  };
  