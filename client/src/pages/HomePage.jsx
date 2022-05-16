import "../style.css"
import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"


export default function HomePage(props) {
  const [query, setQuery] = useState("")
  const [priceQuery, setPriceQuery] =useState("")
	const [frameQuery, setFrameQuery] =useState("")

	const handleInputChange = event => {
    setQuery(event.target.value)
    console.log(query)
	}

	const handlePriceChange = event => {
		setPriceQuery(event.target.value)
		console.log(priceQuery)
	}
	const handleFrameChange = event => {
		setFrameQuery(event.target.value)
		console.log(frameQuery)
	}
	const filtered = props.posts
															.filter(posts => {
		if(priceQuery=="-99"){ return posts.price < "99"}
		else if (priceQuery=="100€ - 199"){ return posts.price > "100" && posts.price < "199"}
		else if (priceQuery=="200€ - 399"){ return posts.price > "200" && posts.price < "399"}
		else if (priceQuery=="+400"){ return posts.price > "400"}
		else {return posts}
})
															.filter(posts => {
		if(frameQuery=="Steel"){return posts.framematerial.includes("steel")}
		if(frameQuery=="Aluminum"){return posts.framematerial.includes("aluminum")}
		if(frameQuery=="Carbon"){return posts.framematerial.includes("carbon") || posts.framematerial.includes("tita")}
		else {return posts}
})
															.filter(posts => {
		return posts.title.toLowerCase().includes(query.toLowerCase())
});    

    return <>    
		<input className="search-field" type="search" placeholder="Search..." onChange={handleInputChange}/>
		<div>
			<button className="searchButtons" value="-99" onClick={handlePriceChange}>-99€</button>
			<button className="searchButtons" value="100 - 199" onClick={handlePriceChange}>100€ - 199€</button>
			<button className="searchButtons" value="200 - 399" onClick={handlePriceChange}>200€ - 399€</button>
			<button className="searchButtons" value="+400" onClick={handlePriceChange}>+400€</button>
		</div>
		<div>
			<button className="searchButtons" value="Steel" onClick={handleFrameChange}> Steel</button>
			<button className="searchButtons" value="Aluminum" onClick={handleFrameChange}> Aluminum</button>
			<button className="searchButtons" value="Carbon" onClick={handleFrameChange}> Carbon // Titanium</button>
		</div>
	    {/* { console.log(props.posts)} */}
      {!props.posts ? (<>Loading...</>) : 
		(<div className="postCards"> {filtered.map((post)=>(
			<li key= {post._id} className='postItem'>
				<div className="post">
				<Link to={post._id}> <img className="imgPost" src={post.imageUrl}/> </Link>
					<div className="postContent">
						<p className="postTitle">{post.title}</p>
						<p className="postPrice">€ {post.price}</p>
					</div>
				</div>
			</li>
		))} 
		</div>
		)}
    </>
		
};
