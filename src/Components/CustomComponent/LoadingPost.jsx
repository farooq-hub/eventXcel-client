import React from 'react'

const LoadingPost = () => {
  return (
    <div role="status" className="md:w-[30rem] sm:w-[28rem] w-[21rem] p-4 rounded animate-pulse md:p-6 ">
        <div className="flex items-center my-4 space-x-3">
        <svg className="w-10 h-10 text-slate-100 dark:text-slate-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div>
                <div className="h-2 bg-slate-100 rounded-full w-36 mb-1"></div>
                <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
            </div>
        </div>
        <div className="h-[26rem] mb-4 bg-slate-100 rounded"></div>
        {/* <div className="h-2.5 bg-slate-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full"></div> */}

        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingPost