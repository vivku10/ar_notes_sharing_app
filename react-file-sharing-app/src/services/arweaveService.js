import Arweave from "arweave";

const arweave = Arweave.init({
  host: process.env.REACT_APP_ARWEAVE_HOST.replace("https://", ""),
  port: 443,
  protocol: "https",
});

export const uploadFileToArweave = async (file, tags = []) => {
  const transaction = await arweave.createTransaction({ data: file });

  // Add tags
  tags.forEach(({ name, value }) => transaction.addTag(name, value));

  // Sign transaction
  const walletKey = JSON.parse(localStorage.getItem("walletKey"));
  await arweave.transactions.sign(transaction, walletKey);

  // Submit transaction
  const response = await arweave.transactions.post(transaction);
  if (response.status === 200) {
    return transaction.id; // File's unique transaction ID
  } else {
    throw new Error("Failed to upload file to Arweave.");
  }
};

export const fetchFilesByTag = async (tagName) => {
  const query = {
    op: "equals",
    expr1: "App-Name",
    expr2: "NotesSharingApp",
  };

  const response = await arweave.api.post("arql", query);
  return response.data || [];
};
