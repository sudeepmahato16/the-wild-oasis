import React from 'react'
import RegisterForm from '@/features/authentication/RegisterForm'

const Users = () => {
  return (
    <>
     <h1 className="text-[24px] dark:text-gray-100 font-semibold">
      Create a new user
     </h1>
     <RegisterForm />

    </>
  )
}

export default Users