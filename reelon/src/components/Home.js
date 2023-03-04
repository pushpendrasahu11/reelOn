import React, { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Upload from './Upload'
import '../css/home.css'
import { database } from '../firebase'

function Home() {

  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState('')

  useEffect(()=>{
    //  user ke uid se doc nikal rahe hai

    // onSnapshot brings a snapshot of database
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
    })

    return ()=>{unsub()}

    // return me cleanup kr rahe hai , means unsub() se onSnapshot event listener ab hat jayega

  },[user])// jab user change hoga to ye fir se chalega

  const handleLogout = async()=>{

    try{
      await logout(); 
    }catch(err){
      console.log( 'logout error : '+err.message)
    }

  }

  console.log('user is' +user);
  console.log('userdata is ' + userData);
  
  return (
    <>
    <Navbar userData={userData}></Navbar>
    <div className='home-container'>
      {/* <div>
       <h1 style={{background:'red'}}>hello welcome {user && user.email } </h1>
      <button onClick={handleLogout}> log out </button>

      </div> */}
  
    </div>
    </>
  )
}

export default Home