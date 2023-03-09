import * as React from 'react';
import { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import img1 from '../assets/img1.svg'
import welcome from '../assets/welcome.jpg'
import googleIcon from '../assets/google.svg'
import "../css/signup.css"

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { database } from '../firebase';


export default function Login() {

  const store = useContext(AuthContext);

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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const { login, googlesignin } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      let res = await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError('')
      }, 3000);
      setLoading(false);

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
        setError('')
      }, 3000);
      setLoading(false);
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
              Login
            </Typography>
            {error != '' && <Alert severity='error'>{error}</Alert>}
            <TextField
              required
              id="outlined"
              label="Email"
              defaultValue=""
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
            <Box m={'10px 110px'} >
              <Link href='' color={'#ffffff'}>Forget password ?</Link>
            </Box>

            <Button id="submitbtn" size='large' variant='contained' fullWidth={true} onClick={handleSubmit} disabled={loading}>submit</Button>



            {/* <Button id="google" size='large' variant='contained' fullWidth={true} >Sign Up with Google</Button> */}
            <IconButton id="googlebtn" onClick={handleGoogle} size="small" fullWidth={true}>
              <img id="googleIcon" src={googleIcon} alt="" /> Log in with google
            </IconButton>

            <Typography style={{ marginTop: '10px', textAlign: 'center', color: '#ffffff', fontSize: '14px' }} className={classes.root} gutterBottom variant="h6" component="div">
              Dont' have an account? <Link href="/signup" color={'#ffffff'}>{' Sign up now'}</Link>
            </Typography>
          </CardContent>

        </Card>

      </div>
    </div>

  );
}
