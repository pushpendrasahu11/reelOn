import React from 'react'
import '../css/video.css'
import ReactDOM from 'react-dom'

function Video(props) {

    // const handleClick=(e)=>{
    //     e.preventDefault(); // default functio jo hota hai usko hata rahe hai

    //     e.target.muted = !e.target.muted
    // }

    const handleScroll =(e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling // Dom me target search kr uska parent search kiye aur wanha se target ka next sibling laye 
        if(next){
            next.scrollIntoView({behavior: 'smooth'})// dom ka property 
            e.target.muted = true
        }
    }
  return (
    <video src={props.src} className='each-video' muted='muted' onEnded={handleScroll}  controls></video>
  )
}

export default Video