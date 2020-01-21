import React from 'react'
import {Link} from 'react-router-dom'

 const LinkList = ({links, removeLink}) => {

  if (!links.length) {
    return <p className="center">No links yet</p>
  }

  const clickHandler = (id) => {
    if( window.confirm("Are you sure you want to delete?")){
     removeLink(id)
    }
  
  }
    
  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Original</th>
        <th>Shorten</th>
        <th>Open</th>
        <th>Delete</th>

      </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/details/${link._id}`}>Open</Link>
            </td>
            <td>
              <Link to='/create' onClick={()=>clickHandler(link._id)}>X</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}

export default LinkList;