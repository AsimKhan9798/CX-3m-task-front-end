import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { performAction } from '/models/baseModel'
import axios from 'axios'
import Head from 'next/head'
import Navbar from '/components/Navbar'
import moment from 'moment/moment'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
  const userSession = await getSession(ctx)
  const { taskId } = ctx.query

  if (userSession) {
    const task = await performAction('tasks', 'findOne', userSession.jwt, {
      id: taskId
    })
    const comments = await performAction(
      'comments',
      'find',
      userSession.jwt,
      null,
      {
        populate: '*',
        'filters[task][id][$eq]': taskId,
        sort: 'createdAt:desc'
      }
    )

    return {
      props: {
        userSession,
        task,
        comments
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

export default function TaskView({ userSession, task, comments }) {
  const [message, setMessage] = useState(null)

  const handleAddComment = async (e) => {
    e.preventDefault()

    setMessage(null)

    const res = await axios.post(
      '/api/processAction?model=comments&action=create',
      {
        data: {
          text: e.target.comment.value,
          task: task.data.id,
          user: userSession.user.id
        }
      }
    )

    e.target.comment.value = ''

    Router.replace(`/dashboard/projects/tasks/${task.data.id}`)
    setMessage(res.data.message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleDeleteComment = async (commentId) => {
    const res = await axios.post(
      '/api/processAction?model=comments&action=delete',
      {
        id: commentId
      }
    )
    Router.replace(`/dashboard/projects/tasks/${task.data.id}`)
    setMessage(res.data.message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <div>
      <Head>
        <title>Projects App - Project - Tasks</title>
      </Head>
      <Navbar userSession={userSession} />
      <div className='py-5 bg-gray-100'>
        <div
          className={`flex p-4 max-w-2xl mx-auto mb-2 text-sm text-green-800 border ${
            message ? '' : 'invisible'
          } border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800`}
          role='alert'
        >
          <span className='font-medium mr-1'>Successfully Added your changes</span> {message}.
        </div>
        <div className='max-w-2xl mx-auto px-4'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
              {task.data.attributes.title}
            </h2>
          </div>
          <form className='mb-6' onSubmit={handleAddComment}>
            <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
              <textarea
                id='comment'
                name='comment'
                rows='3'
                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                placeholder='Write a comment...'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-600 rounded-lg focus:ring-4 hover:bg-indigo-700'
            >
              Post comment
            </button>
          </form>
          {comments.data.map((comment) => (
            <article
              className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'
              key={comment.id}
            >
              <footer className='flex justify-between items-center mb-2'>
                <div className='flex items-center'>
                  <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                    <img
                      className='mr-2 w-6 h-6 rounded-full'
                      src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                    />
                    {comment.attributes.user.data.attributes.username}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {moment(comment.attributes.createdAt)
                      .utc()
                      .format('MMM. D, YYYY hh:mm A')}
                  </p>
                </div>
                <div className='flex space-x-2 text-xs'>
                  <button
                    type='button'
                    className='w-full flex items-center justify-center px-1 py-1 font-medium text-center text-white bg-green-500 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
                  >
                    <svg
                      class='w-6 h-4'
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
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    type='button'
                    className='w-full flex items-center justify-center px-1 py-1 font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                  >
                    <svg
                      class='w-6 h-5'
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
                  </button>
                </div>
              </footer>
              <p className='text-gray-500 dark:text-gray-400'>
                {comment.attributes.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
