import { useParams } from 'react-router-dom'

export default function Postdetails (props) {

  const params = useParams()
  const id = params._id

  const post= props.posts.find(post => post._id === id)
  return <> 
  {!post ? (<>Loading...</>) :  
  <li key= {post._id} className='postItemDetail'>
				<div className="post">
          <img className="imgPost" src={post.imageUrl}/> 
					<div className='postContent'>
						<p className='postTitle'>{post.title}</p>
            <p >{post.type}</p>
            <p >{post.description}</p>
            <p >{post.framezise}</p>
            <p >{post.framematerial}</p>
            <p >{post.brakes}</p>
            <p >{post.tubes}</p>
            <p >{post.years}</p>
            <p >{post.zipcode}</p>
            <p >{post.city}</p>
						<p className='postPrice'>€ {post.price}</p>
					</div>
				</div>
			</li>}
  </>
};
