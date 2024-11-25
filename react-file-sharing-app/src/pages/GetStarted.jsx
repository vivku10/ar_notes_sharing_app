import React from "react";

const GetStarted = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/path-to-your-background.jpg')", // Add your background image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures full height coverage
        paddingBottom: "100px", // Ensures enough space for footer
      }}
    >
      <div className="container mt-5" style={{ marginTop: "100px" }}>
        {/* Adjusted margin to add space from navigation */}
        <div
          className="shadow-lg rounded p-4 mx-auto"
          style={{
            backgroundColor: "#ffffff", // Solid white background for the container
            color: "#000", // Dark text for contrast
            border: "1px solid #ddd", // Optional border for a defined look
            maxWidth: "800px", // Max width for the content
            width: "100%", // Ensure the container takes full width up to maxWidth
          }}
        >
          <h2 className="text-center mb-4">Getting Started with the Notes Sharing App</h2>

          <p>
            Welcome to the Notes Sharing App! This app allows you to securely
            share, encrypt, and manage your notes with others. Below is a guide
            on how to get started and make the most out of the app's features.
          </p>

          <h3>1. Encrypt and Upload Files</h3>
          <p>
            The app allows you to encrypt your notes before uploading them to
            the decentralized Arweave network. This ensures that your notes are
            stored securely and are only accessible by authorized users.
          </p>
          <ol>
            <li>Select a file (note) to upload.</li>
            <li>Enter an encryption key to secure the file.</li>
            <li>Click the "Upload" button to upload your encrypted file to Arweave.</li>
          </ol>
          <p>
            Once uploaded, your encrypted note will be stored on Arweave, and you
            will receive a unique Transaction ID that can be used to retrieve the file.
          </p>

          <h3>2. Share Your Files</h3>
          <p>
            After uploading your note, you can easily generate a shareable link.
            This link can be sent to others to grant them access to the note.
          </p>
          <ol>
            <li>Enter the Transaction ID of the note you uploaded.</li>
            <li>Click the "Generate Link" button.</li>
            <li>Copy the link and share it with others.</li>
          </ol>
          <p>
            The link will allow users to view or download the note directly from
            Arweave.
          </p>

          <h3>3. Soft Delete Files</h3>
          <p>
            The app allows you to delete notes from the system by entering the
            corresponding Transaction ID. Soft delete ensures that the note is
            removed from the UI but still exists on the Arweave network for record
            keeping.
          </p>
          <ol>
            <li>Enter the Transaction ID of the note you want to delete.</li>
            <li>Click the "Delete" button to remove the note from your list.</li>
          </ol>
          <p>
            Soft deleting the file will make it no longer visible in the app's UI,
            but it will remain stored on Arweave. This ensures that data is not
            lost permanently.
          </p>

          <h3>4. View Your Uploaded Files</h3>
          <p>
            You can view a list of all your uploaded files and their Transaction IDs.
            The app supports pagination for easier navigation if you have many files.
          </p>
          <ol>
            <li>All your files are listed in a grid format with a file preview icon.</li>
            <li>Click on the file name or icon to view it directly on Arweave.</li>
          </ol>

          <h3>5. Pagination for File Management</h3>
          <p>
            If you have multiple notes uploaded, the app provides a pagination
            feature that allows you to view your files in manageable chunks. You
            can easily navigate through your files with the "Next" and "Previous"
            buttons.
          </p>

          <h3>Additional Features</h3>
          <p>
            - Responsive design for mobile and desktop devices.<br />
            - Secure file encryption before upload.<br />
            - Simple user interface for easy navigation.<br />
            - Decentralized file storage on the Arweave network.
          </p>

          <h3>Conclusion</h3>
          <p>
            The Notes Sharing App provides a simple and secure way to share your
            notes with others. Whether you're encrypting notes for privacy or
            sharing them via links, this app ensures that your files are safe and
            easily accessible. Start using the app today by uploading and sharing
            your first note!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
