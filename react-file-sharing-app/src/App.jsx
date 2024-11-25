import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import NotesUpload from "./pages/NotesUpload";
import NotesList from "./pages/NotesList";
import FilePreview from "./pages/FilePreview";
import FileEncryptUpload from "./pages/FileEncryptUpload";
import FileShare from "./pages/FileShare";
import FileSearch from "./pages/FileSearch";
import FileDelete from "./pages/FileDelete";
import GetStarted from "./pages/GetStarted";
import SignUp from "./pages/Login";
import "./styles/App.css";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MainLayout>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/notes-upload" element={<NotesUpload />} />
            <Route path="/notes-list" element={<NotesList />} />
            <Route path="/file-preview" element={<FilePreview />} />
            <Route path="/file-encrypt-upload" element={<FileEncryptUpload />} />
            <Route path="/file-share" element={<FileShare />} />
            <Route path="/file-search" element={<FileSearch />} />
            <Route path="/file-delete" element={<FileDelete />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
          <Footer />
        </MainLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
