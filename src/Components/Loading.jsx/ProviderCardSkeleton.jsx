import { v4 as uuidv4 } from 'uuid';


const ProviderCardSkeleton = () => {

    return (
        <div key={uuidv4()} className=" max-w-2xl w-full sm:max-w-md bg-gray-100 sm:mx-auto cursor-pointer rounded-lg p-8">
            <div className="rounded-t-lg h-32 overflow-hidden  bg-gray-200  ">
                <div className="object-cover object-top w-full  "/>
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 rounded-full overflow-hidden">
                <div className="object-cover object-center h-32 bg-gray-200 animate-pulse"/>
            </div>
            <div className="flex-row items-center mt-2 space-y-2">
                <div className="w-56 mx-auto h-6 bg-gray-200 animate-pulse rounded"/>
                <div className=" w-72 mx-auto h-4 bg-gray-200 animate-pulse rounded sm:px-12 "/>
                <div className=" w-64 mx-auto h-4 bg-gray-200 animate-pulse rounded sm:px-12 "/>
                <div className=" w-44 mx-auto h-4 bg-gray-200 animate-pulse rounded sm:px-12 "/>
            </div>
            <div className="p-4 mt-2">
                <div className=" block mx-auto w-16 h-8 rounded bg-gray-200 animate-pulse px-6 py-2"></div>
            </div>
        </div>
    )
}


export default ProviderCardSkeleton

