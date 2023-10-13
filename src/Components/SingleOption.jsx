import PropTypes from 'prop-types';
import ImageSlider from './ImageSlider';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

const SingleOption = ({className,optionData,isSelected,onClick,selectedOption}) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <> 
        <div className={`p-4 rounded-lg  transition duration-300 ${className?className:''} 
        ${isSelected && isSelected == true?'border-2 bg-slate-100':isSelected == false?'border-2 hover:border-gray-500':'bg-slate-100 hover:bg-slate-200'}`} onClick={onClick?onClick:null}>
            <div className="mb-4 rounded-md overflow-hidden">
            <p className={`rounded-full ml-auto mb-2 ${isSelected == false || isSelected == true ?'border border-gray-300 h-6 w-6':'hidden'}`}>
              {isSelected == true?<BsCheck className='text-center text-black text-[1.29rem]'/>:''}</p>
            <ImageSlider images={optionData.optionImages} height={'max-h-60'} manageIndex={setCurrentImageIndex} currentIndex={currentImageIndex} />
            </div>
            <h3 className="text-lg font-bold mb-2  text-center">{optionData.title}</h3>
            <p className="text-sm border text-center p-1 leading-6 text-gray-600 max-h-28 overflow-y-scroll">{optionData.description}</p>
            <p className="text-sm font-medium leading-6 text-gray-800 text-center mb-1">Price :<span className='font-normal text-gray-600'> ₹ {optionData.price}.00</span></p>
            <p className="text-sm font-medium text-center leading-6 text-gray-800 mb-1">Price option :<span className='font-normal text-gray-600'>&nbsp;
                {optionData.priceOption =='Per person'?'Calculate for a person':'Calculate for a day'}</span></p>
            {isSelected && isSelected == true &&optionData.priceOption =='Per day'?
            <p className="text-sm font-medium leading-6 text-gray-800 text-center underline mb-1">Total amound :<span className='font-normal text-gray-600'> ₹ {optionData.price}.00</span></p>:
            optionData.priceOption =='Per person'&&isSelected == true?
            <p className="text-sm font-medium leading-6 text-gray-800 text-center underline mb-1">Total amound :<span className='font-normal text-gray-600'>
              {selectedOption.count} X {optionData.price} =  ₹ {selectedOption.totalAmount}.00</span></p>
            :''
            }

        </div>
    </>
  )
}

SingleOption.propTypes = {
    optionData: PropTypes.object,
    className : PropTypes.string,
    isSelected: PropTypes.bool,
    onClick   : PropTypes.func,
    selectedOption: PropTypes.any
};


export default SingleOption