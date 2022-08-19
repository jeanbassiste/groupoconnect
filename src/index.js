import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/header';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import ProfilePage from './components/pages/profile';
import Feed from './components/pages/feed';
import PostPage from './components/pages/onePost';
import NotFind from './components/pages/404';

ReactDOM.render(

  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post" element={<PostPage />} />
      <Route path='/home' element={<Feed />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='*' element={<NotFind />} />

    </Routes>
  </Router>,
  document.getElementById('root')

);