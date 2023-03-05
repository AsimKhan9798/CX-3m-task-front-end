import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar({ userSession }) {
  const router = useRouter()
  return (
    <div className='relative bg-white'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <img
              className='h-10 w-auto sm:h-10'
              src='https://e7.pngegg.com/pngimages/139/726/png-clipart-graphics-computer-icons-user-illustration-man-at-computer-blue-electric-blue-thumbnail.png'
              alt=''
            />
          </div>
          <Link href="/about" legacyBehavior>
            <a className="hover:text-indigo-700" href="#">
              About
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="hover:text-indigo-700">Contact Us</a>
          </Link>
          <div className='-my-2 -mr-2 md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-expanded='false'
            >
              <span className='sr-only'>Open menu</span>
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
        
          <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
            {router.pathname != '/dashboard' ? (
              <Link
                href='/dashboard'
                className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                &lt; Dashboard
              </Link>
            ) : (
              ''
            )}
            {userSession ? (
              <Link
                href='/api/auth/signout'
                className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                Sign out
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
