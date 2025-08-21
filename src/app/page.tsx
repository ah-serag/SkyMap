import React from 'react'
import { Button } from './components/ui/button'
import Link from './components/Link/Link'

const page = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
         
       <div className=' flex gap-2'>
      <Button variant='default' size={'lg'} >
        <Link href='/login'>
          signIn
        </Link>
      </Button>
      <Button variant='default' size={'lg'}>
        <Link href='/signUp'>
          signUp
        </Link>
      </Button>
       </div>

    

    </div>
  )
}

export default page
