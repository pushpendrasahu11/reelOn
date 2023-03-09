import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar } from '@mui/material';
import { database } from '../firebase';

function Comments({postData}) {

  const [comments,setComments] = useState(null);

  useEffect(()=>{
    let carr = []

    async function fetchData(){
      for(let i =0;i<postData.comments.length;i++){
        let data = await database.comments.doc(postData.comments[i]).get()
        carr.push(data.data())
      }
      setComments(carr);
    }

    fetchData();

    // postData.comments.forEach((ele,index)=>{
    //   let data = database.commments.doc(ele).get();
    //   carr.push(data.data())
    // })
    
  },[postData])

  return (
    <div>
      {
        comments==null?<CircularProgress />:
        <>
        {
          comments.map((comment,index)=>(
            <div style={{display:'flex',border:'1px solid #000032',margin:'2px',padding:'2px'}}>
              <Avatar style={{margin:'5px'}} src={comment.uProfileImage}></Avatar>
              <p><span style={{fontWeight:'700',fontSize:'1.5rem',margin:'5px'}}>{comment.uName}</span> &nbsp;&nbsp; <span>{comment.text}</span></p>
            </div>
          ))
        }
        </>
      }
    </div>
  )
}

export default Comments