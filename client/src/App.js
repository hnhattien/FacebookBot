import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

 import HomePage from './pages/HomePage';
 import AccountManagementPage from './pages/AccountManagementPage';
 import PostManagementPage from './pages/PostManagementPage';
 import PostUploadManagementPage from './pages/PostUploadManagementPage';
import { useEffect } from 'react';
import { setupAxios } from './api/requester';
function App() {
  setupAxios();
 
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/accounts" element={<AccountManagementPage/>}></Route>
        <Route path="/post" element={<PostManagementPage />}></Route>
        <Route path="/post/upload" element={<PostUploadManagementPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
