import React from 'react'
import { useUsers } from '../store/Users'


export const UsersAdmin = () => {

  const {getAllUsers}=useUsers()

  return (
    <>
    <div>UsersAdmin</div>
    <button onClick={()=>getAllUsers()}>Get users</button>
    <div>
      
    </div>

    </>
  )
}
