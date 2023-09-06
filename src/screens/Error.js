import React from 'react'
import '../css/Error.css'
function Error() {
  return (
    <div className='container_error'>
        <p className='code_error'>404</p>
        <p className='lebel_error'>Oups! La page que vous demandez n'existe pas.</p>
    </div>
  )
}

export default Error