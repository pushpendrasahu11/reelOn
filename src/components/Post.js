import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import Like from './Like';
import Like2 from './Like2';
import Comments from './Comments';
import '../css/post.css'
import AddComment from './AddComment';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';

function Post({userData}) {


  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let parr = []

    const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {// ek snapshot la rahe database ka(database me posts ka)
      parr = []
      querySnapshot.forEach((doc) => {
        let data = { ...doc.data(), postId: doc.id }
        parr.push(data);
      })

      setPosts(parr)

    })
    return unsub
  }, [])

  const callback=(entries)=>{

    entries.forEach((entry)=>{
      let ele = entry.target.childNodes[0]
      ele.play().then(()=>{
        if(!ele.paused && !entry.isIntersecting){
          ele.pause();
        }
      })
    })

  }

  let observer = new IntersectionObserver(callback,{threshold:0.6});

  useEffect(()=>{
    const elements = document.querySelectorAll(".videos")
    elements.forEach((element)=>{
      observer.observe(element)
    })

    return ()=>{
      observer.disconnect(); // cleaning function, jaha jaha observer attach tha wo remove hoga
    }
  },[posts])

  console.log(userData)
  return (
    <div>
      {
        posts == null || userData == null ? <CircularProgress /> :
          <div className='post-container'>
            {
              
              posts.map((post, index) => (

                <React.Fragment key={index}>
                  <div className='videos'>
                    <Video src={post.pUrl}></Video>
                    <div className='detail'>
                      <Avatar  src={userData.userProfile} />
                      <h4 style={{color:"#ffffff",margin:'4px'}}>{userData.fullname}</h4>
                    </div>
                    <Like userData={userData} postData={post}></Like>
                    <CommentIcon className='chat-style' onClick={()=>handleClickOpen(post.pId)}></CommentIcon>
                    
                    <Dialog
                      open={open==post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth='md'
                    >

                      <div className="comment-section">
                        <div className='video-container'>
                         <video src={post.pUrl} autoPlay={true} muted="muted" controls></video>
                        </div>
                        <div className="comment-container">
                          <div className='all-comment-box'>
                            <Comments postData={post}></Comments>

                          </div>
                          <Card className='new-comment-box' variant='outlined'>
                            <div style={{display:'flex'}}>
                              <Like2 userData={userData} postData={post}></Like2>
                              <Typography fontFamily={'Josefin Sans'}>{`${post.likes.length} Likes`}</Typography>
                              <CommentIcon style={{color:'#000000',margin:'0px 10px'}}></CommentIcon>
                              <Typography fontFamily={'Josefin Sans'}>{`${post.comments.length} Comments`}</Typography>
                              {/* <Typography fontFamily={'Josefin Sans'}>{post.likes.length==0?'':`Liked by ${post.likes.length} users`}</Typography> */}
                            </div>
                              <AddComment userData={userData} postData={post}></AddComment>
                            
                            
                          </Card>
                        </div>
                      </div>
                      
                    </Dialog>
                  </div>
                </React.Fragment>

              ))
            }
          </div>

      }
    </div>
  )
}

export default Post