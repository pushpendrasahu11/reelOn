import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import  Button  from '@mui/material/Button';
import { database
 } from '../firebase';


function AddComment({userData,postData}) {

  const [text,setText] = useState('');

  const handleClick=()=>{
    let obj = {
      text:text,
      uProfileImage : userData.userProfile,
      uName:userData.fullname
    }

    // then me , abhi jo save karaya uska doc
    database.comments.add(obj).then((doc)=>{
      // postdata ke andar jo postId wo doc le rahe and usme update kr rahe
      database.posts.doc(postData.postId).update({
        comments:[...postData.comments,doc.id]
      })
    })

    setText('');
  }


  return (
    <div style={{display:'flex',alignItems:'center',position:'relative'}}>
       <Textarea
        placeholder="Comment..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
        minRows={2}
        maxRows={4}
        style={{positon:'absolute',width:'80%',margin:'0px 8px'}}
      />

      {/* <TextField
        placeholder="Typ"
        hiddenLabel
        id="filled-hidden-label-small"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        multiline
        style={{fontFamily:'Josefin Sans'}}
        minRows={1}
        maxRows={4}
        size="small"
        fullWidth={true}
      /> */}

        <Button variant="text" style={{width:'fit-content'}} size='small' onClick={handleClick}>Post</Button>
    </div>
  )
}

export default AddComment