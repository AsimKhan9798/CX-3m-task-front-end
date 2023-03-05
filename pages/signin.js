import Router from 'next/router'
import { useSession, getSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/dashboard'
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}

export default function Signin() {
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage(null)

    const result = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value
    })
    console.log(result)
    if (result.ok) {
      Router.replace('/dashboard')
    } else {
      setMessage({ status: 0, text: result.error })
    }
  }

  return (
    <div>
      <Head>
        <title>Projects Keeper - Sign In</title>
      </Head>
      <section className='bg-gray-50 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black'
          >
            <img
              className='w-12 h-12 mr-3'
              src='https://e7.pngegg.com/pngimages/139/726/png-clipart-graphics-computer-icons-user-illustration-man-at-computer-blue-electric-blue-thumbnail.png'
              alt='logo'
            />
            Projects Keeper
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign in to your account
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
                  <label
                    htmlFor='identifier'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Email Address or Username'
                    required='required'
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required='required'
                  />
                </div>
                <button
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  type='submit'
                >
                  Sign in
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet? &nbsp;
                  <Link
                    href='/register'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Register
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
