import { useLocation } from 'react-router-dom';
import Sidebar from '../../Components/User/Sidebar';
import Profile from '../../Components/User/Profile';
import { useEffect } from 'react';

function ProfilePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/profile' && location.hash === '#transationHistory') {
      setTimeout(() => {
        const targetDiv = document.getElementById('transationHistory');
        if (targetDiv) {
          window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);


  return (
    <div className='h-screen'>
      <Sidebar />
      <div className="flex md:ml-64 lg:ml-64">
        <Profile/>
      </div>
    </div>
  )
}

export default ProfilePage