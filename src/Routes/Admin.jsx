import { Routes, Route,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import SingleOrderPage from "../Pages/Admin/SingleOrderPage";
import HomePage from "../Pages/Admin/HomePage";
import Service from "../Pages/Admin/Service";
import ProviderPage from "../Pages/Admin/ProviderPage";
import OrderPage from "../Pages/Admin/OrderPage";
import UsersPage from "../Pages/Admin/UsersPage";
import Login from "../Components/Login";


const Admin = () => {
  const adminAuth = Boolean(useSelector((state) => state.admin.token));

  return (
    <Routes>
        <Route path="/order"  element={adminAuth ? <SingleOrderPage/> : <Navigate to='/admin/login'/>}/>
        <Route path="/orders"  element={adminAuth ? <OrderPage/> : <Navigate to='/admin/login'/>}/>
        <Route path="/login" element={adminAuth ? <Navigate to='/admin' /> : <Login role='admin'  /> }/>
        <Route path="/home" element={adminAuth ? <HomePage/> : <Navigate to='/admin/login' />  }/>
        <Route path="/services" element={adminAuth ? <Service/> : <Navigate to='/admin/login' />  }/>
        <Route path="/users" element={adminAuth ? <UsersPage/> : <Navigate to='/admin/login' />  }/>
        <Route path="/providers" element={adminAuth ? <ProviderPage/> : <Navigate to='/admin/login' />  }/>
        <Route path="/" element={adminAuth ? <HomePage/> : <Navigate to='/admin/login' />  }/> 
    </Routes>
  )
}

export default Admin