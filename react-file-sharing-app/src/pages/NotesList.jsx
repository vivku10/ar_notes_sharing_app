import React, { useState, useEffect } from "react";
import { fetchFilesByTag } from "../services/arweaveService";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Fetch transactions tagged with "NotesSharingApp"
        const transactionIds = await fetchFilesByTag("App-Name", "NotesSharingApp");
        const fetchedNotes = [];

        for (const id of transactionIds) {
          const response = await fetch(`https://arweave.net/${id}`);
          if (response.ok) {
            const note = await response.json();
            fetchedNotes.push({ ...note, transactionId: id });
          }
        }
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <div className="container mt-4">
      <h2>Notes</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No notes available.
        </div>
      ) : (
        <div>
          {/* Notes Grid */}
          <div className="row">
            {currentNotes.map((note) => (
              <div key={note.transactionId} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {note.category || "Uncategorized"}
                    </p>
                    <p className="card-text">
                      <strong>Tags:</strong> {note.tags?.join(", ") || "None"}
                    </p>
                    {note.timeLock && (
                      <p className="card-text">
                        <strong>Time Lock:</strong>{" "}
                        {new Date(note.timeLock).toLocaleString()}
                      </p>
                    )}
                    {note.attachment && (
                      <div className="text-center">
                        <p className="text-muted">Attached File:</p>
                        {note.attachment.fileType.startsWith("image/") ? (
                          <img
                            src={`https://arweave.net/${note.transactionId}`}
                            alt="Attachment"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                          />
                        ) : (
                          <a
                            href={`https://arweave.net/${note.transactionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Attachment
                          </a>
                        )}
                      </div>
                    )}
                    <div className="mt-3 text-end">
                      <a
                        href={`https://arweave.net/${note.transactionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        View Note
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NotesList;
