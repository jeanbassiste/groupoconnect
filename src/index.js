import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/header';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import FirstProfile from './components/layouts/firstProfile';
import Profile from './components/layouts/anyProfile';
import Post from './components/pages/post';
import Comment from './components/layouts/comment';
import Dashboard from './components/pages/dashboard';
import CreatePost from './components/layouts/createPost';
import NewDashboard from './components/pages/newDashboard';
import DashTest from './components/pages/dashtest';
import DisplayOnePost from './components/functions/oneMorePost';
import DisplayAllPosts from './components/layouts/displayAllPosts';
import ProfilePage from './components/pages/profile';
import Feed from './components/pages/feed';
import PostPage from './components/pages/onePost';

ReactDOM.render(

  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/changeProfile" element={<FirstProfile />} />
      <Route path="/profil" element={<Profile />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/posts" element={<Dashboard />} />
      <Route path="/comment" element={<Comment />} />
      <Route path='/home' element={<Feed />} />
      <Route path='/newDashboard' element={<NewDashboard />} />
      <Route path='/test' element={<Post />} />
      <Route path='/newTest' element={<DisplayAllPosts />} />
      <Route path='/profile' element={<ProfilePage />} />

    </Routes>
  </Router>,
  document.getElementById('root')

);