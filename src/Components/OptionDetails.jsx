import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from './CustomComponent/Button';

function OptionDetails({options,role}) {
    return (
        <ul className="flex flex-col divide-y divide-gray-700">
            {role == 'checkout'&&options&&options.length?
            options.map((val,index)=>(
                <li key={`checkout-${val._id}-${index}`} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                    <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={val.optionImages[0]} alt="Replica headphones" />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1" key='title'>
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{val.title}</h3>
                                    <p className="text-sm dark:text-gray-400">Price option : {val.priceOption}</p>
                                    {val.priceOption != 'Per day'?
                                    <p className="text-sm dark:text-gray-400">Sets : <span>{val.count} </span></p>
                                    :''}
                                </div>
                                <div className="text-right" key='rigthside'>
                                    <p className="text-lg font-semibold">Total amount : ₹{val.totalAmount}.00</p>
                                    <p className="text-sm  dark:text-gray-600">Price : ₹{val.price}.00</p>
                                </div>
                            </div>
                            {role == 'checkout'?
                                <div className="flex text-sm divide-x">
                                    <Button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" content={<> <RiDeleteBin6Line className='text-[1rem] text-red-500'/>
                                    <span>Remove</span></>}/>
                                </div>
                            :""}
                        </div>
                    </div>
                </li>
        ))
        :''}
        {role == 'order'&&options&&options.length?
            options.map((val,index)=>(
                <li key={`order-${val.optionId}-${index}`} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                    <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 " src={val.optionId.optionImages[0]} alt="Replica headphones" />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{val.optionId.title}</h3>
                                    <p className="text-sm dark:text-gray-400">Price option : {val.optionId.priceOption}</p>
                                    {val.priceOption != 'Per day'?
                                    <p className="text-sm dark:text-gray-400">Sets : <span>{val.count} </span></p>
                                    :''}
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Total amount : ₹{val.totalAmount}.00</p>
                                    <p className="text-sm  dark:text-gray-600">Price : ₹{val.optionId.price}.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
        ))
        :''}
        </ul>
    )
}

OptionDetails.propTypes = {
    options: PropTypes.any.isRequired, // Define the expected type and mark it as required
    setSelectedOption:PropTypes.func,
    role:PropTypes.string,

  };


export default OptionDetails