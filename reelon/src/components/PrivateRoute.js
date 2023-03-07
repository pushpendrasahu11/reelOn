import { getAuth } from 'firebase/auth';
import React ,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({children})  {
    let {user} = useContext(AuthContext);

    const auth = getAuth();
    // const user = auth.currentUser;

    console.log(user);

    if(user === undefined){
      console.log('return ing');
      return null;
    }

    if(!user){
      return <Navigate to="/login"/>
    }

    return children;
}

export default PrivateRoute;