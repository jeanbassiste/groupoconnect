import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/header';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import FirstProfile from './components/layouts/firstProfile';
import Profile from './components/layouts/anyProfile';
import Post from './components/layouts/post';
import Comment from './components/layouts/comment';
import Dashboard from './components/layouts/posts';

ReactDOM.render(

  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/changeProfile" element={<FirstProfile />} />
      <Route path="/test" element={<Profile />} />
      <Route path="/post" element={<Post />} />
      <Route path="/posts" element={<Dashboard />} />
      <Route path="/comment" element={<Comment />} />
    </Routes>
  </Router>,
  document.getElementById('root')

);