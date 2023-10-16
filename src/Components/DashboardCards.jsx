import PropTypes from 'prop-types';

const DashboardCards = ({content,value,icon,from}) => {
    
  return (
    // <div className="w-96 bg-white rounded-md">
    //     <div className="flex m-3">
    //         <div className="flex flex-col justify-center p-2">
    //             <p className='text-[.95rem] font-sans'>content</p>
    //             <p className='text-xl font-semibold '>₹ 30000.00 <span className='text-xs ml-2 bg-green-400 rounded-md px-1'>12 orders</span></p>
    //         </div>
    //         <div className="flex items-center ms-auto text-4xl">
    //             {icon}
    //         </div>
    //     </div>
    // </div>
    <div className="w-full flex items-center justify-between p-4 bg-white rounded-md ">
    <div>
      <h6
        className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
      >
        {content}
      </h6>
      <span className="text-xl font-semibold">₹ {value}</span>
      <span className="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
        +{from}
      </span>
    </div>
    <div>
      <span className='text-4xl'>
        {icon}
      </span>
    </div>
  </div>
  )
}

DashboardCards.propTypes = {
    content: PropTypes.any, // Define the expected type and mark it as required
    value:PropTypes.any,
    icon:PropTypes.any,
    from:PropTypes.any
  };


export default DashboardCards