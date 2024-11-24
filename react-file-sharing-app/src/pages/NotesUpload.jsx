import React, { useState } from "react";
import Arweave from "arweave";

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!noteTitle || !noteContent) {
      setStatus({ message: "Note title and content are required.", type: "danger" });
      return;
    }

    try {
      const walletKey = JSON.parse(localStorage.getItem("walletKey"));
      if (!walletKey) {
        setStatus({ message: "Wallet key not found. Please log in.", type: "danger" });
        return;
      }

      // Prepare note data
      const noteData = {
        title: noteTitle,
        content: noteContent,
        tags: tags.split(",").map((tag) => tag.trim()),
        category,
        timeLock: timeLock || "none",
        createdAt: new Date().toISOString(),
      };

      // If a file is attached, read its data
      let fileAttachment = null;
      if (file) {
        const fileData = await readFileAsArrayBuffer(file);
        fileAttachment = {
          fileName: file.name,
          fileType: file.type,
          fileData: new Uint8Array(fileData),
        };
      }

      // Create and upload Arweave transaction
      const transaction = await arweave.createTransaction(
        { data: JSON.stringify({ ...noteData, attachment: fileAttachment }) },
        walletKey
      );

      // Add metadata tags
      transaction.addTag("App-Name", "NotesSharingApp");
      transaction.addTag("Content-Type", "application/json");
      transaction.addTag("Title", noteTitle);
      transaction.addTag("Category", category);
      transaction.addTag("Tags", tags);
      transaction.addTag("Time-Lock", timeLock || "none");

      await arweave.transactions.sign(transaction, walletKey);
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus({
          message: `Note uploaded successfully! Transaction ID: ${transaction.id}`,
          type: "success",
        });

        // Notify parent component
        addNote({
          transactionId: transaction.id,
          noteTitle,
          noteContent,
          category,
          tags: tags.split(","),
          fileAttachment,
        });

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
    <div className="container mt-4">
      <h2>Create and Upload Note</h2>
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
        <button type="submit" className="btn btn-primary">
          Upload Note
        </button>
      </form>
      {status.message && (
        <div className={`alert alert-${status.type} mt-3`} role="alert">
          {status.message}
        </div>
      )}
    </div>
  );
};

export default NotesUpload;
