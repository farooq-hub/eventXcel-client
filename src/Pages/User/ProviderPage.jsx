import Sidebar from '../../Components/User/Sidebar'
import Providers from '../../Components/User/Providers'

function ProvidersPage() {
  return (
    <div className='h-screen'>
    <Sidebar />
   
    <div className="flex md:ml-64 lg:ml-64">
      <Providers/>
    </div>
</div>
  )
}

export default ProvidersPage