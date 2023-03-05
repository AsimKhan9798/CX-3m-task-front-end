import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { performAction } from '/models/baseModel'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from '/components/Navbar'

export async function getServerSideProps(ctx) {
  const userSession = await getSession(ctx)

  const { projectId } = ctx.query
  if (userSession) {
    const project = await performAction(
      'projects',
      'findOne',
      userSession.jwt,
      {
        id: projectId
      }
    )
    const categories = await performAction(
      'categories',
      'find',
      userSession.jwt
    )
    const tasks = await performAction('tasks', 'find', userSession.jwt, null, {
      populate: '*',
      'filters[project][id][$eq]': projectId
    })

    return {
      props: {
        userSession,
        project,
        categories,
        tasks
      }
    }
  } else {
    return {
      redirect: {
        destination: '/signin'
      }
    }
  }
}

export default function ProjectView({
  userSession,
  project,
  categories,
  tasks
}) {
  const [message, setMessage] = useState(null)

  return (
    <div>
      <Head>
        <title>Projects App - Project - Tasks</title>
      </Head>
      <Navbar userSession={userSession} />
      <div className='py-10 bg-gray-100 h-screen'>
        <div
          className={`flex p-4 max-w-6xl mx-auto text-sm text-green-800 border ${
            message ? '' : 'invisible'
          } border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800`}
          role='alert'
        >
          <span className='font-medium mr-1'>Successfully Added your changes</span> {message}.
        </div>
        <div className='mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {categories.data.map((category) => (
            <article
              className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300'
              key={project.id}
            >
              <div className='relative flex items-center h-14 space-x-1.5 rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600 mb-5'>
                <h2 className='mx-auto text-1xl'>{category.attributes.name}</h2>
              </div>
              {tasks.data.map((task) => (
                <>
                  {task.attributes.category == category.id ? (
                    <div className='mt-1 rounded-xl bg-pink-500 text-white text-sm p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300'>
                      <Link
                        href={`/dashboard/projects/tasks/${task.id}`}
                        key={task.id}
                      >
                        {task.attributes.title}
                      </Link>
                      <div className='flex mt-4 space-x-2'>
                        <button
                          type='button'
                          className='w-full h-8 flex items-center justify-center px-3 py-2 font-medium text-center text-white bg-pink-400 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
                        >
                          <svg
                            class='w-4 h-4 mr-2'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                            />
                          </svg>
                          <span className='justify-center'>Edit</span>
                        </button>
                        <button
                          type='button'
                          className='w-full h-8 flex items-center justify-center px-3 py-2 font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                        >
                          <svg
                            class='w-5 h-5 mr-2'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span className='justify-center'>Delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ))}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
