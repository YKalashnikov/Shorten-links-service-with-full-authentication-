import React from 'react'
import {Link} from 'react-router-dom';


 const LinkCard = ( props) => {
 const link = props.link

 const clickHandler = () => {
   if( window.confirm("Are you sure you want to delete?")){
    props.removeLink(link._id)
   }
 

} 
  return (
    <>
      <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>The number of clicks: <strong>{link.clicks}</strong></p>
      <p>Date Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      <Link to='/links' onClick={clickHandler}>Delete</Link>
    </>
  )
}

export default LinkCard;