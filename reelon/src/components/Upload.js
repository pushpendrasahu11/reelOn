import React, {useState,useEffect} from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database,storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { serverTimestamp } from 'firebase/firestore';

function Upload(props) {


  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange= async(file)=>{
    if(file==null){
      setError('Please select file first');
      setTimeout(()=>{
        setError('');
      },3000);
      return ;
    }

    if(file.size/(1024*1024) > 100){
      setError('video size greater than 100mb is not allowed ');
      setTimeout(()=>{
        setError('');
      },3000);
      return ;
    }

    let uid = uuidv4();//gives unique id
    setLoading(true);

    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed',fn1,fn2,fn3);

    function fn1(snapshot){
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log(snapshot.totalBytes);
      console.log(snapshot.bytesTransferred)
      console.log(` Upload is ${progress} done`);
    }

    function fn2(error){

      setError(error);
      setTimeout(()=>{
        setError('');
      },5000);
      setLoading(false);
      console.log('error ' + error);
      return ;
    }

    function fn3(){
      console.log(props);
      
      uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
        let obj ={
          likes:[],
          comments:[],
          pId:uid,
          pUrl:url,
          uName: props.user.fullname,
          // uProfile:props.user.profileUrl,
          userId:props.user.userId,
          createdAt: database.getTimeStamp()
        }

        database.posts.add(obj).then(async(ref)=>{
          let res = await database.users.doc(props.user.userId).update({
           // postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id]:[] // jo reference mila uska id
           postIds : [...props.user.postIds,ref.id]
          })
        }).then(()=>{
          setLoading(false);
        }).catch((err)=>{
          setError(err.message);
          setTimeout(()=>{
            setError('');
          },5000);
          setLoading(false);
        })
        
      })
      // setLoading(false);
    }
    

  }

  return (
    <div>
      {
        error!=''?<Alert severity="error">{error}</Alert>:
        <>
          <input type="file" onChange={(e)=>handleChange(e.target.files[0])} accept='video/*' id="upload-input" style={{display:'none'}} />
          <label htmlFor="upload-input">
            <Button variant="outlined" component="span" color='secondary' disabled={loading}>
                <MovieIcon style={{margin:'0px 4px'}}/>Upload Video
            </Button>
          </label>
              { loading && <LinearProgress color='secondary' style={{margin:'4px 0px'}}/>}
        </>
      }
      

    </div>
  )
}

export default Upload