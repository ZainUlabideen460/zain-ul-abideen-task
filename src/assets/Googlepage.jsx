import React from 'react'
import mic from '../assets/mic.png'
import youtubeimg from '../assets/youtube.png'

const Googlepage = () => {
  return (
    <div>
      <div className='text-center'>
        <h1 className='font-[800] text-[120px] sm:text-[150px] md:text-[180px] lg:text-[200px] mt-6 sm:mt-8 md:mt-10'>Google</h1>
      </div>
      <div className='px-4 sm:px-6 md:px-8'>
        <form className='max-w-4xl mx-auto'>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="search" 
              className="block w-full p-3 sm:p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search Google or type url" 
              required 
            />
            <div className="text-white flex gap-2 sm:gap-3 absolute end-2 sm:end-2.5 bottom-2 sm:bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 sm:px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 5h-1.382l-.171-.342A2.985 2.985 0 0 0 14.764 3H9.236a2.984 2.984 0 0 0-2.683 1.658L6.382 5H5a3 3 0 0 0-3 3v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a3 3 0 0 0-3-3Zm-3.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"/> 
              </svg> 
              <div>
                <img className='w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1' src={mic} alt="" />
              </div>   
            </div>          
          </div> 
        </form>
      </div>
       <div className=' '>
      <div className='bg-gray-300 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex mx-auto mt-3'>                 
        <div className='mx-auto my-auto'>
          <img className='w-6 h-6 sm:w-8 sm:h-8' src={youtubeimg} alt="" />                 
        </div> 
                                         
      </div>
      
     
                             
      </div>
    </div>
  )
}

export default Googlepage