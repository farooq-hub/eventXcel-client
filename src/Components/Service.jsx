import PropTypes from 'prop-types';


const Service = ({service,onClick}) => {
  return (
    <>
            <div onClick={onClick?onClick:''}
            className='relative overflow-hidden h-[20rem] lg:h-[26rem]  pt-[100%]'
        >
                <div
                    className="bg-gray-800 bg-opacity-40 hover:bg-opacity-60 h-[20rem] lg:h-[26rem] w-full cursor-pointer  absolute inset-0 z-10 flex items-center justify-center text-white"
                >
                    <h3 className="z-10 text-3xl font-bold text-slate-100 font-serif">{service.serviceName}</h3>
                    <h3 className="z-10 overflow-hidden text-sm leading-6 text-slate-300">{service.description ?service.description:''}</h3>
                </div>
            <img
                src={service.serviceImage}
                className="absolute inset-0 object-cover w-full h-[20rem] lg:h-[26rem]"
            />
        </div>
    </>
  )
}

Service.propTypes = {
    service: PropTypes.any,
    onClick: PropTypes.any 
};

export default Service