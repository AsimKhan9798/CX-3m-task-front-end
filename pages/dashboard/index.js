import '/styles/Home.module.css';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { performAction } from '/models/baseModel';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '/components/Navbar';
import Router from 'next/router';
import axios from 'axios';

export async function getServerSideProps(ctx) {
  const userSession = await getSession(ctx);

  if (userSession) {
    const projects = await performAction(
      'projects',
      'find',
      userSession.jwt,
      null,
      {
        populate: '*'
      }
    );

    return {
      props: {
        userSession,
        projects
      }
    };
  } else {
    return {
      redirect: {
        destination: '/signin'
      }
    };
  }
}

export default function Dashboard({ userSession, projects }) {
  console.log(userSession)
  const [message, setMessage] = useState(null);
  const [editRecordData, setEditRecordData] = useState(null);

  const handleEditRecordData = (e, id = null) => {
    if (id) {
      var data =
        editRecordData && editRecordData.id == id ? editRecordData : {};
      data.id = id;
    }
    if (e) {
      var data = editRecordData ? editRecordData : {};
      data[e.target.getAttribute('name')] = e.target.value;
    }
    setEditRecordData(data);
    console.log(data);
  };

  const submitProjectEdit = async (id) => {
    const result = await axios.post(
      `/api/processAction?model=projects&action=update&id=${id}`,
      {
        data: editRecordData
      }
    );
    setEditRecordData(null);
    console.log('Processed Project Data ', result.data);
    Router.replace('/dashboard');
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (

    <div>
      <Head>
        <title>Projects Keeper - Dashboard</title>
      </Head>
      <Navbar userSession={userSession} />
      <div className='py-10 bg-black-100'>
        <div
          className={`flex p-4 max-w-6xl mx-auto text-sm text-green-800 border ${message ? '' : 'invisible'
            } border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800`}
          role='alert'
        >
          <span className='font-medium mr-1'>Successfully Added your changes</span>
        </div>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
          {projects.data.map((project) => (
            <article
              className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300'
              key={project.id}
            >
              <div className='relative space-x-1.5 rounded-lg bg-gray-500 text-white duration-100 hover:bg-gray-800'>
                <span className='text-lg absolute top-1 left-4'>
                  {editRecordData && editRecordData.id == project.id ? (
                    <input
                      type='text'
                      name='abbreviation'
                      size='1'
                      className='bg-blue-500 text-lg'
                      onChange={(e) => {
                        handleEditRecordData(e);
                      }}
                      defaultValue={project.attributes.abbreviation}
                    />
                  ) : (
                    project.attributes.abbreviation
                  )}
                </span>
                <div className='flex items-center h-40'>
                  <h2 className='mx-auto text-2xl text-center'>
                    {editRecordData && editRecordData.id == project.id ? (
                      <textarea
                        type='text'
                        name='title'
                        className='bg-blue-500 w-full text-center'
                        onChange={(e) => {
                          handleEditRecordData(e);
                        }}
                        defaultValue={project.attributes.title}
                      ></textarea>
                    ) : (
                      project.attributes.title
                    )}
                  </h2>
                </div>
              </div>
              <div className='mt-1 p-2 flex flex-col'>
                <p className='mt-1 text-sm text-slate-400'>
                  {editRecordData && editRecordData.id == project.id ? (
                    <textarea
                      type='text'
                      rows='5'
                      name='description'
                      className='w-full'
                      onChange={(e) => {
                        handleEditRecordData(e);
                      }}
                      defaultValue={project.attributes.description}
                    ></textarea>
                  ) : (
                    project.attributes.description
                  )}
                </p>
                <div className=''>
                  <div className='mt-3 flex items-end justify-between'>
                    <p className='text-lg font-bold text-blue-500'>
                      {project.attributes.tasks.data.length} Tasks
                    </p>
                    <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-900'>
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className='text-sm'
                      >
                        View Tasks
                      </Link>
                    </div>
                  </div>
                  <div className='flex mt-4 space-x-2 text-sm'>
                    <button
                      type='button'
                      onClick={() => {
                        editRecordData && editRecordData.id == project.id
                          ? submitProjectEdit(project.id)
                          : handleEditRecordData(null, project.id);
                      }}
                      className='w-full h-8 flex items-center justify-center px-3 py-2 font-medium text-center text-white bg-pink-400 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
                    >

                      <span className='justify-center'>
                        {editRecordData && editRecordData.id == project.id
                          ? 'Update Task'
                          : 'Edit'}
                      </span>
                    </button>
                    <button
                      type='button'
                      className='w-full h-8 flex items-center justify-center px-3 py-2 font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    >

                      <span className='justify-center'>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>

  )
};
