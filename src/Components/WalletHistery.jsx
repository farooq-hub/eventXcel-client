import  { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Button from './CustomComponent/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';


const WalletHistory = ({walletHistory}) => {

    const [transationHistory,setTransationHistory] = useState([])
    const [search,setSearch] =useState({
        from:'',
        to:''
    })
    const [activeTab,setActiveTab] =useState('all')
    const [showMor,setShowMor] =useState(false)


    const [loading,setLoading] = useState('')

    const filteringTrnHis = (active,date) =>{
        if(!date){
            setLoading('getingWallethistoy')
            let filteredHistory = [...walletHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

    
            if (search.from && search.to) {
                const fromDate = new Date(search.from);
                const toDate = new Date(search.to);
                filteredHistory = filteredHistory.filter((item) => {
                    const itemDate = new Date(item.date);
                    return itemDate >= fromDate && itemDate <= toDate;
                });
                console.log(filteredHistory,'sugfs');
            }
            active?setActiveTab(active):''
            if(active =='all'&&activeTab!='all'){
                setTransationHistory(filteredHistory);
            }else{
                if (active !== 'all'||activeTab !='all') {
                    active == null&& activeTab == 'all'?'':(active == null ?filteredHistory = filteredHistory.filter((item) => item.transactionType === activeTab):
                    filteredHistory = filteredHistory.filter((item) => item.transactionType === active))
                    console.log(filteredHistory,active,'AAA',activeTab);
                }
                setTransationHistory(filteredHistory);
            }
            setLoading('')
        }else {
            if(search.to == '' || search.from == '') return toast.warn('Give the both date')
            else if (new Date(search.from) > new Date(search.to)) return toast.warn('Invalid date')
            else filteringTrnHis(null,false)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch((prevSearch) => ({
        ...prevSearch,
        [name]: value
        }));
    };

    const getOrderDatas =async () => {
    }
    useEffect(()=>{
        if(walletHistory) {
        console.log(walletHistory,'sdhgasjhdgjashdg');

            filteringTrnHis()
            setLoading('')
        }else setLoading('getingWallethistoy')
    },[walletHistory])

  return (
    <section  className="container px-4 mx-auto ">
      <div className=" bg-gray-200 shadow-sm p-4">
        <h1 className="text-xl font-serif text-center text-gray-800 capitalize lg:text-2xl">Transation History(Wallet)</h1>
      </div>
      <div className="flex flex-col mt-4">
        <div className="inline-block min-w-full  align-middle ">
            <div className="overflow-scroll  rounded-lg">
                <div className="border-t grid grid-cols-1 gap-3 xl:grid-cols-4 shadow-sm p-4">
                    <div className="col-span-2  flex xl:justify-start justify-center"> 
                        <ul className="flex lg:justify-between space-x-2 list-none sm:px-4 py-2 p-1 text-sm  md:text-base font-semibold">
                            <li className="">
                                <Button className={`cursor-pointer ${activeTab=='all'&&'bg-slate-200'} text-blue-600 hover:bg-slate-300 duration-300  rounded-md py-2 xl:w-36 w-20 sm:w-24`} handelEvent={()=>filteringTrnHis('all')} content={'All'}/>
                            </li>
                            <li className="">
                                <Button className={`cursor-pointer ${activeTab=='Credit'&&'bg-slate-200'} text-green-600 hover:bg-slate-300 duration-300  rounded-md py-2 xl:w-36 w-20 sm:w-24`} handelEvent={()=>filteringTrnHis('Credit')} content={'+ Credit'}/>
                            </li>
                            <li className="">
                                <Button className={`cursor-pointer ${activeTab=='Debit'&&'bg-slate-200'} text-red-600 hover:bg-slate-300 duration-300  rounded-md py-2 xl:w-36 w-20 sm:w-24`} handelEvent={()=>filteringTrnHis('Debit')} content={'- Debit'}/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 mx-auto ">
                    <div  className="flex items-center space-x-2 md:space-x-4 flex-col  sm:flex-row">
                        <div className="relative ">
                            <div className="absolute inset-y-0 left-0 flex items-center  pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input name="from"  type="date" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5" placeholder="Select date start"/>
                        </div>
                        <span className=" text-gray-500">to</span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input name="to" type="date" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date end"/>
                        </div>
                        <Button className='cursor-pointer hover:bg-slate-300 duration-300 h-8 w-8 border  rounded-md' handelEvent={()=>filteringTrnHis(null,true)} content={<AiOutlineSearch className='mx-auto'/>}/>
                        </div>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 -divide-gray-700 border-b" id='transationHistory'>
                    <thead className="bg-gray-50 -bg-gray-800 ">
                        <tr className='text-gray-700 capitalize font-medium text-[.999rem] '>
                            <th onClick={getOrderDatas} className='font-medium text-left pl-4 border-l '>Date</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>Form</th>
                            <th className='font-medium text-center py-4 px-4 border-l'>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y border-b" >
                        {loading !== 'gettingWalletHistory' ? (
                            transationHistory?.length ? 
                            (showMor
                                    ? transationHistory
                                    : transationHistory.slice(0,5))
                                .map((tarns) => (
                                <tr className='hover:bg-gray-200 font-medium text-gray-600 capitalize border-b' key={tarns._id}>
                                    <td className='py-1 text-sm md:break-all whitespace-normal text-left pl-4'>
                                    {(() => new Date(tarns.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}))()}
                                    </td>
                                    <td className='px-2 py-2.5 text-sm md:break-all whitespace-normal text-center'>{tarns?.from?.name}</td>
                                    <td className={`${tarns.transactionType == 'Credit' ? 'text-green-600' : 'text-red-600'} px-4 py-3.5 text-sm md:break-all whitespace-normal font-mono text-center`}>
                                    {tarns.transactionType == 'Credit' ? '+ ' : '- '}{tarns.amount}.00
                                    </td>
                                </tr>
                                ))
                             : (
                            <tr>
                                <td colSpan={3} className='text-red-600 px-4 py-3.5 text-[.98rem]  capitalize break-all whitespace-normal text-center'><p className='my-2'>No transation history available!</p></td>
                            </tr>
                            )
                        ) : (
                            [1, 2, 3, 4, 5].map((val) => (
                            <tr className='animate-pulse border-0 border-gray-300' key={val + 19999}>
                                <td className='py-2 px-2'><p className='bg-gray-200 h-8'></p></td>
                                <td className='py-2 px-2'><p className='bg-gray-200 h-8 mx-auto'></p></td>
                                <td className='py-2 px-2'><p className='bg-gray-200 h-8 mx-auto'></p></td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {loading != 'getingWallethistoy'&&transationHistory?.length  &&transationHistory?.length > 5?
                    <div  className="flex items-center justify-center w-full">
                        <Button  className={'text-center my-8 animate-bounce text-blue-800 text-[1rem] hover:underline'} handelEvent={()=>showMor?setShowMor(false):setShowMor(true)}
                        content={<p className='flex items-center '>{showMor ?'Show less':'Show more'}<span>{showMor ?<IoIosArrowUp className='text-blue-600 mx-2'/>:<IoIosArrowDown className='text-blue-600 mx-2'/>}</span></p>}/>
                    </div>:''
                }
            </div>
        </div>
      </div>
    </section>
  )
}

WalletHistory.propTypes = {
  role: PropTypes.string.isRequired, // Define the expected type and mark it as required
  path:PropTypes.string,
  walletHistory:PropTypes.array
};

export default WalletHistory