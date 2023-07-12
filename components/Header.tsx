import React from 'react'
import Logout from '@/features/authentication/Logout'

const Header = () => {
  return (
    <header className='py-4 px-12 bg-white border-b border-gray-100 flex gap-6 items-center flex-end'>
      <Logout />
    </header>
  )
}

export default Header