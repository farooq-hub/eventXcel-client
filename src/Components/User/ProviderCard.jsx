import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import profilAvadar from "../../assets/istockphoto-1316420668-612x612.jpg"
import coverPic from "../../assets/pexels-sandra-filipe-7087668.jpg"

const ProviderCard = ({provider}) => {

    const navigate = useNavigate();
    return (
        <div key={provider._id} className="hover:shadow max-w-2xl sm:max-w-md sm:mx-auto cursor-pointer transition-all duration-300 hover:bg-slate-100  bg-white border rounded-lg text-gray-900 p-8"
            onClick={()=>navigate(`/providers/${provider._id}`, { state: { provider }})}>
            <div className="rounded-t-lg h-32 overflow-hidden border border-white">
                <img className="object-cover object-top w-full" src={provider.coverPic ? provider.coverPic : coverPic } alt='Mountain' loading='lazy'/>
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32" src={provider.profilePic ? provider.profilePic : profilAvadar } alt='loading..' loading='lazy'/>
            </div>
            <div className="flex-row items-center text-center mt-2">
                <h2 className="font-semibold mb-2 uppercase">{provider.name}</h2>
                <p className="text-center text-gray-500 sm:px-12 ">{provider.description?provider.description:'Servies provider'}</p>
            </div>
            <div className="p-4 border-t mx-8 mt-2">
                <button className=" block mx-auto rounded-full bg-gray-500 hover:shadow-lg font-semibold text-white px-6 py-2" >Details</button>
            </div>
        </div>
    )
}

ProviderCard.propTypes = {
  className: PropTypes.string,
  provider:PropTypes.any 

};

export default ProviderCard

