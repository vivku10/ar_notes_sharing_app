import React, { useState, useEffect } from "react";
import Arweave from "arweave";
import axios from "axios";

// Initialize Arweave instance
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const NotesUpload = ({ addNote }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [timeLock, setTimeLock] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [walletKey, setWalletKey] = useState(null);

  useEffect(() => {
    // Load wallet key from localStorage on component mount
    const savedWalletKey = localStorage.getItem("walletKey");
    if (savedWalletKey) {
      setWalletKey(JSON.parse(savedWalletKey));
    } else if (window.arweaveWallet) {
      window.arweaveWallet
        .connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"])
        .then(() => window.arweaveWallet.getActiveAddress())
        .then((address) => setWalletKey(address))
        .catch(() =>
          setStatus({ message: "Failed to connect to ArConnect.", type: "danger" })
        );
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!noteTitle || !noteContent) {
      setStatus({ message: "Note title and content are required.", type: "danger" });
      return;
    }

    if (!walletKey) {
      setStatus({ message: "Wallet key not found. Please log in.", type: "danger" });
      return;
    }

    try {
      let transaction;
      if (file) {
        // If a file is attached, upload it directly
        const fileData = await readFileAsArrayBuffer(file);

        transaction = await arweave.createTransaction({ data: fileData }, walletKey);

        // Add metadata tags for the file
        transaction.addTag("App-Name", "NotesSharingApp");
        transaction.addTag("Content-Type", file.type || "application/octet-stream");
        transaction.addTag("File-Name", file.name);
      } else {
        // If no file is attached, upload only the note details
        const noteData = JSON.stringify({
          title: noteTitle,
          content: noteContent,
          tags: tags.split(",").map((tag) => tag.trim()),
          category,
          timeLock: timeLock || "none",
          createdAt: new Date().toISOString(),
        });

        transaction = await arweave.createTransaction({ data: noteData }, walletKey);

        // Add metadata tags for the note
        transaction.addTag("App-Name", "NotesSharingApp");
        transaction.addTag("Content-Type", file.type || "application/octet-stream");
      }

      // Add common tags
      transaction.addTag("Title", noteTitle);
      transaction.addTag("Category", category);
      transaction.addTag("Tags", tags);
      transaction.addTag("Time-Lock", timeLock || "none");

      // Sign and submit transaction
      await arweave.transactions.sign(transaction, walletKey);
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus({
          message: `Note uploaded successfully! Transaction ID: ${transaction.id}`,
          type: "success",
        });

        if (addNote) {
          // Notify parent component if addNote is provided
          addNote({
            transactionId: transaction.id,
            noteTitle,
            noteContent,
            category,
            tags: tags.split(","),
            fileAttachment: file ? { fileName: file.name, fileType: file.type } : null,
          });
        }

        // Reset form fields
        setNoteTitle("");
        setNoteContent("");
        setTags("");
        setCategory("");
        setFile(null);
        setTimeLock("");
      } else {
        setStatus({
          message: `Failed to upload note. Status code: ${response.status}`,
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error uploading note:", error);
      setStatus({ message: `Error uploading note: ${error.message}`, type: "danger" });
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBottom: "100px", // Add space at the bottom to avoid footer blocking
      }}
    >
      <div
        className="shadow-lg rounded p-4"
        style={{
          maxWidth: "800px", // Match the preview component width
          width: "100%",
          backgroundColor: "#ffffff", // Solid white background for the container
          color: "#000", // Dark text for contrast
          border: "1px solid #ddd", // Optional border for a defined look
        }}
      >
        <h2 className="text-center">Create and Upload Note</h2>
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label htmlFor="noteTitle" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              id="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="noteContent" className="form-label">
              Note Content
            </label>
            <textarea
              id="noteContent"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows="5"
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Attach File (Optional)
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="timeLock" className="form-label">
              Time Lock (Optional, format: YYYY-MM-DDTHH:mm:ssZ)
            </label>
            <input
              type="datetime-local"
              id="timeLock"
              value={timeLock}
              onChange={(e) => setTimeLock(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Upload Note
          </button>
        </form>
        {status.message && (
          <div className={`alert alert-${status.type} mt-3`} role="alert">
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesUpload;
