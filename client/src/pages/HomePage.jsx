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
				// console.log(response)
				setPosts(response.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		getAllPosts()
        console.log(Posts)
	}, []);

    return <>
        {Posts ? <>Loading</> : <> true</>} 
    </>
};
