import axios from "axios";

const AO_API_URL = process.env.REACT_APP_AO_API_URL;

export const analyzeFile = async (fileContent) => {
  const actorId = "file-analyzer"; // Replace with your AO actor ID
  const response = await axios.post(`${AO_API_URL}/actors/${actorId}/invoke`, { content: fileContent });
  return response.data; // Example: analysis results or tags
};
