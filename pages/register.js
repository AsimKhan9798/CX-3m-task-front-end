import axios from 'axios'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
  // Set message state for storing errors and success messages
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Set message to null upon fresh form submission
    setMessage(null)

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    try {
      const result = await axios.post('/api/register', data)
      console.log(result.data);
      // Update the message state upon successfull account registration

      // Auto login the user after successful registration
      const res = await signIn('credentials', {
        redirect: false,
        ...data
      }
      )

      if (res.ok) {
        Router.replace('/dashboard')
        return
      }

      // setMessage({
      //   status: 1,
      //   text: "You have successfully created an account!",
      // });
    } catch (error) {
      console.log(error.response.data.message)
      // Update the message state upon failed account registration
      setMessage({ status: 0, text: error.response.data.message })
    }
  }

  return (
    <div>
      <Head>
        <title>Project Keeper - Register</title>
      </Head>
      <section className='bg-gray-50'>
        <div className='flex flex-col justify-center items-center px-6 mx-auto md:h-screen lg:py-0'>
          <a
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black'
            href='#'
          >
            <img
              alt='logo'
              className='w-10 h-10 mr-2'
              src='https://e7.pngegg.com/pngimages/139/726/png-clipart-graphics-computer-icons-user-illustration-man-at-computer-blue-electric-blue-thumbnail.png'
            />
            Projects Keeper
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Register your account
              </h1>
              {message ? (
                <div
                  className={`flex items-center ${
                    message.status ? 'bg-blue-500' : 'bg-red-500'
                  } text-white text-sm font-bold px-4 py-3`}
                  role='alert'
                >
                  <p>{message.text}</p>
                </div>
              ) : (
                ''
              )}
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id='username'
                    name='username'
                    placeholder='Username'
                    required=''
                    type='text'
                  />
                </div>
                <div>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id='email-address'
                    name='email'
                    placeholder='Email address'
                    required=''
                    type='email'
                  />
                </div>
                <div>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id='password'
                    name='password'
                    placeholder='password'
                    required=''
                    type='password'
                  />
                </div>
                <button
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  type='submit'
                >
                  Register
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account? &nbsp;
                  <Link
                    href='/signin'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
