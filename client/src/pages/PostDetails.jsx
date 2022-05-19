import { useParams } from "react-router-dom"

export default function Postdetails (props) {

  const params = useParams()
  const id = params._id

  const post= props.posts.find(post => post._id === id)
  return <> 
  {!post ? (<>Loading...</>) :  
  <li key= {post._id} className="containerItemDetail">
				<div className="post">
          <img className="imgPost" src={post.imageUrl}/> 
					<div className="postContent">
            <div className="containerInfo title">
              <h1 className="postTitle">{post.title}</h1>
              <p className="price">{!post.price ? <></> :<span className="postPrice">€ {post.price}</span>}</p>
            </div>
            <div className="containerInfo">
              {!post.type ? <></> :<p>Type<p>{post.type}</p></p>}
              {!post.framezise ? <></> :<p>Frame Size<p>{post.framezise}</p></p>}
              {!post.framematerial ? <></> :<p>Frame Material<p>{post.framematerial}</p></p>}
              {!post.brakes ? <></> :<p>Brakes<p>{post.brakes}</p></p>}
              {!post.tubes ? <></> :<p>Tubes<p>{post.tubes}</p></p>}
            </div>
            <div>
              {!post.description ? <></> :<p>Description<p>{post.description}</p></p>}
            </div>
            <div className="containerInfo">
              {!post.years ? <></> :<p>How old is the bike?<span> {post.years} years</span></p>}
              <p>{!post.zipcode ? <></> : <span> Located in: {post.zipcode}</span>},{post.city} 🌍</p>
            </div>
					</div>
				</div>
			</li>}
  </>
};
