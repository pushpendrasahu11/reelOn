import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';

import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import '../css/profile.css';
import AddComment from './AddComment';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import Like from './Like';
import Like2 from './Like2';
import Comments from './Comments';
import '../css/post.css'

function Profile() {

    const { id } = useParams()
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };


    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id])

    useEffect(() => {
        let parr = []

        async function fetchData() {

            if (userData != null) {

                for (let i = 0; i < userData.postIds.length; i++) {
                    let postData = await database.posts.doc(userData.postIds[i]).get()
                    parr.push({...postData.data(),postId:postData.id});
                }

                setPosts(parr)

            }

        }

        fetchData();

    })

    // useEffect(async()=>{
    //     if(userData!=null){

    //     }
    // })

    return (
        <>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div ></div>
                        <div className='profile-section'>
                            <div className="profile-top">
                                <div className='profile-img'>
                                    <img src={userData.userProfile} alt="" />
                                </div>
                                <div className='profile-info'>
                                    <h2>Email : {userData.email}</h2>
                                    <h2>posts : {userData.postIds.length}</h2>
                                </div>
                            </div>
                            <hr />
                            <div className="profile-posts">
                                {

                                    posts.map((post, index) => (

                                        <React.Fragment key={index}>
                                            <div className='videos'>
                                                    <div className='video-container'>
                                                            <video src={post.pUrl} muted="muted" controls></video>
                                                        </div>
                                                <Like userData={userData} postData={post}></Like>
                                                <CommentIcon className='chat-style' onClick={() => handleClickOpen(post.pId)}></CommentIcon>

                                                <Dialog
                                                    open={open == post.pId}
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
                                                                <div style={{ display: 'flex' }}>
                                                                    <Like2 userData={userData} postData={post}></Like2>
                                                                    <Typography fontFamily={'Josefin Sans'}>{`${post.likes.length} Likes`}</Typography>
                                                                    <CommentIcon style={{ color: '#000000', margin: '0px 10px' }}></CommentIcon>
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
                        </div>
                    </>
            }
        </>
    )
}

export default Profile