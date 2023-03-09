import React, { useEffect,useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like2({userData,postData}) {

  const [like,setLike] = useState(null);

  useEffect(()=>{

    let check = postData.likes.includes(userData.userId)?true:false;
    setLike(check);

  },[postData]) // jab postData change hota hai

  // like krne pr snapshot change hua , to post.js me post update hua 
  // then here postData update hua , to useeffect phir se chala


  const handleLike=()=>{
    if(like == true){
      let newarr = postData.likes.filter((ele)=>ele!=userData.userId) // postdata pe likes ke array me current user ko hata rahe
      database.posts.doc(postData.postId).update({
        likes:newarr
      })
    }else{
      let newarr = [...postData.likes,userData.userId] // postdata pe likes ke array me current user ko hata rahe
      database.posts.doc(postData.postId).update({
        likes:newarr
      }) 
    }
  }

  return (
    <div>{
      like!=null?
      <>
        {
          like == true ? <FavoriteIcon style={{margin:'0px 10px'}} className='like' onClick={handleLike} />:<FavoriteIcon style={{margin:'0px 10px'}} className='unlike2' onClick={handleLike}/>
        }
      </>:
      <></>
    }</div>
  )
}

export default Like2