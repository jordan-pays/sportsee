import React from 'react'
import '../css/Error.css'
import { useParams } from 'react-router-dom'

function Error() {
  const { code_error } = useParams();
  return (
    <div className='container_error'>
      <p className='code_error'>{code_error ? code_error : "404"}</p>
      <p className='lebel_error'>Oups! La page que vous demandez n'existe pas.</p>
    </div>
  )
}

export default Error