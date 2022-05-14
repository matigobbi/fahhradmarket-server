import '../style.css'
import React, { useState, useEffect } from "react";
import { AuthContext } from '../context/auth.context'
import axios from 'axios'
const API_URL = "http://localhost:5005";

export default function HomePage(props) {
	const [Posts, setPosts] = useState([])

	const getAllPosts = () => {
		axios.get(`${API_URL}/posts`)
			.then(response => {
				//  console.log(response)
				setPosts(response.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		getAllPosts()
	}, []);

    return <>
	    { console.log(Posts)}
        {!Posts ? (<>Loading...</>) : 
		(<div className="postCards"> {Posts.map((post)=>(
			<li className='postItem'>
				<div class="post">
					<img className="imgPost" src={post.imageUrl}/>
					<div className='postContent'>
						<p className='postTitle'>{post.title}</p>
						<p className='postPrice'>€ {post.price}</p>
					</div>
				</div>
			</li>
		))} 
		</div>
		)}
    </>
		
};
