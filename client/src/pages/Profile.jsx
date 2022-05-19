import { AuthContext } from '../context/auth.context' 
import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Profile(props) {

const { user } = useContext(AuthContext)
const yourPosts = (user && props.posts.filter(function (post){return post.owner===user._id }))
const yourLikes = (user && props.posts.filter(function (post){return post.likes.find(function (like){return like===user._id}) }))
console.log(yourLikes)

const navigate = useNavigate()


const deleteProject = (key) => {
  axios.delete(`/posts/${key}`)
    .then(() => {
      // redirect 
      navigate('/')
    })
    .catch(err => console.log(err))
}

  return <>
  {user? (<>
  <h1 >Profile page</h1>
  <div className="containerProfile">
    <div className="itemProfile">
      <p>Your Information:</p>
      <p>User Id: {user._id }</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>Birth: {user.birth}</p>
    </div>
    <div className="itemProfile">
      <p>Your posts</p>
      <div>{yourPosts.map((post)=>(
        <>
          <p key={post._id}>{post.title}
          <button onClick={() => deleteProject(post._id)}>Delete</button></p>
        </>
      ))}</div>
      </div>
      <div className="itemProfile">
        <p>Your Likes</p>
        <div>{yourLikes.map((post)=>(
          <>
          <Link className='linksProfile' to={post._id}><p  key={post._id}>{post.title}
          <span> Price € {post.price}</span> </p></Link>
          </>
      ))}</div>
    </div>
  </div>
  </>):(<> This page is only for Logged in users ¯\_(ツ)_/¯</>)
}
  </>
};
