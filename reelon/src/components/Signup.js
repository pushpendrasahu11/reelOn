import * as React from 'react';
import { useState, useContext } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';


import img1 from '../assets/img1.svg'
import defaultProfile from '../assets/defaultProfile.png'
import welcome from '../assets/welcome.jpg'
import googleIcon from '../assets/google.svg'
import "../css/signup.css"
import { AuthContext } from '../context/AuthContext';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase';
import handleGoogle from './Login'

export default function Signup() {


  const useStyles = makeStyles()((theme) => {
    return {
      root: {
        fontFamily: 'Josefin Sans'
      },
      card1: {
        display: 'flex',

        borderRadius: '20px',
        background: '#ffffff30'
      },
      input1: {

        margin: '5px 0px',

        [`& fieldset`]: {


        },
        [`& hover`]: {
          border: '1px solid green',

        },
        [`& .MuiInputLabel-root `]: {
          color: 'black',

        },
        [`& .MuiFilledInput-root `]: {
          color: 'black',
        },
        [`& .MuiInputBase-root `]: {
          backgroundColor: 'white',
          borderRadius: '25px',

        }


      },


    };
  });


  const { classes } = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password2, confirmPassword] = useState('');
  const navigate = useNavigate();
  const { signup, googlesignin } = useContext(AuthContext);


  const handleSubmit = async () => {

    if (password != password2) {
      setError('Confirm Password is not matching with Password');
      setTimeout(() => {
        setLoading(false);
        setError('')
      }, 3000)
      return;
    }

    try {
      setError('');

      setLoading(true);
      let userObj = await signup(email, password)
      let uid = userObj.user.uid;
      console.log(userObj);

      database.users.doc(uid).set({

        email: email,
        userId: uid,
        userProfile: defaultProfile,
        fullname: name,
        postIds: [],
        createdAt: database.getTimeStamp(),

      })

      console.log(uid);
      navigate("/");

    } catch (err) {
      console.log('hi' + err);
      setError(err.message);
      setTimeout(() => {
        setLoading(false);
        setError('')
      }, 3000)
      return;
    }

  }

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {

      let userObj = await googlesignin();

      let uid = userObj.user.uid;
      console.log('g sigin in')
      console.log(uid);
      console.log(userObj);

      if (userObj._tokenResponse.isNewUser) {
        database.users.doc(uid).set({

          email: userObj.user.email,
          userId: uid,
          userProfile: userObj.user.photoURL,
          fullname: userObj.user.displayName,
          postIds: [],
          createdAt: database.getTimeStamp()

        })
      }

      navigate("/");

    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setLoading(false);
        setError('')
      }, 3000)
      return;
    }
  }


  return (

    <div className="signup-container">


      <div className='signup-card'>

        <Card variant='outlined' className={classes.card1}>

          <CardContent>
            <div className='logo'>
              <img src={img1} alt="" />
            </div>

            <Typography style={{ textAlign: 'center', color: '#ffffff' }} className={classes.root} gutterBottom variant="h4" component="div">
              Signup
            </Typography>
            {error != '' && <Alert style={{ width: '350px', margin: 'auto' }} severity='error'>{error}</Alert>}
            <TextField

              id="outlined"
              label="Name"
              fullWidth={true}
              margin='dense'
              size='small'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={classes.input1}

            />
            <TextField
              required
              id="outlined2"
              label="Email"
              fullWidth={true}
              margin='dense'
              size='small'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input1}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth={true}
              margin='dense'
              size='small'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input1}
            />
            <TextField
              required
              id="outlined-password2-input"
              label="Confirm-Password"
              type="password"
              autoComplete="current-password"
              size='small'

              fullWidth={true}
              margin='dense'
              value={password2}
              onChange={(e) => confirmPassword(e.target.value)}
              className={classes.input1}
            />
            <Button id="submitbtn" size='large' variant='contained' fullWidth={true} disabled={loading} onClick={handleSubmit}>submit</Button>


            {/* <Button id="google" size='large' variant='contained' fullWidth={true} >Sign Up with Google</Button> */}
            <IconButton id="googlebtn" onClick={handleGoogle} aria-label="delete" size="small" fullWidth={true}>
              <img id="googleIcon" src={googleIcon} alt="" /> Sign up with google
            </IconButton>


            <Typography style={{ marginTop: '10px', textAlign: 'center', color: '#ffffff', fontSize: '14px' }} className={classes.root} gutterBottom variant="h6" component="div">
              Already have an account? <Link href="/login" color={'#ffffff'}>{' Log in now'}</Link>
            </Typography>
          </CardContent>

        </Card>

      </div>
    </div>

  );
}
