import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5'>
        {/* leftside */}
        <div className="flex-1">
        <Link to="/" className='font-bold text-black dark:text-black text-3xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white hover:text-black transition-all duration-500'>Coders</span>
          Library
        </Link>
        <p className='text-sm mt-5'>
          This is a Demo Project. You Can sign up with your email and password
          or with Google
        </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Your Username' className='!text-black dark:text-white'></Label>
              <TextInput type='text' placeholder='Username' id='username'></TextInput>
            </div>
            <div className="">
              <Label value='Your email'className='!text-black dark:text-white'></Label>
              <TextInput
              type='text'
              placeholder='name@company.com'
              id='email'
              ></TextInput>
            </div>
            <div className="">
              <Label value='Your password'className='!text-black dark:text-white'></Label>
              <TextInput
              type='text'
              placeholder='password'
              id='password'></TextInput>
            </div>
            <Button className='bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 font-bold hover:text-black transition-all duration-100'>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup