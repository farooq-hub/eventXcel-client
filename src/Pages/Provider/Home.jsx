import Dashboard from "../../Components/Provider/Dashboard";
import Sidebar from "../../Components/Provider/Sidebar";


const Home = () => {
    
    return (
        <div className='bg-gray-100 h-screen'>
            <Sidebar />
            <header className="relative md:ml-64 lg:ml-64 bg-white dark:bg-darker">
            <div className="md:flex hidden items-center justify-between p-2 border-b dark:border-primary-darker">

              <a
                href="index.html"
                className="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark dark:text-light"
              >
                K-WD
              </a>


            <nav aria-label="Secondary" className="hidden space-x-2 md:flex md:items-center">
                <div className="space-x-2">
                    <button
                    className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                    >
                    <span className="sr-only">Open Notification panel</span>
                    <svg
                        className="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    </button>
                </div>

                <div className="relative">
                    <button
                    aria-haspopup="true"
                    className="transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
                  >
                    <span className="sr-only">User menu</span>
                    <img className="w-10 h-10 rounded-full" src="build/images/avatar.jpg" alt="Ahmed Kamel" />
                  </button>

                  <div
                    className="absolute opacity-0 hover:opacity-100  right-0 w-48 py-1 bg-white rounded-md shadow-lg top-8 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none"

                  >
                    <a
                      href="#"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </nav>

            </div>
          </header>

            <div className=" md:ml-64 lg:ml-64">
                <Dashboard/>
            </div>
        </div>
    );
};
export default Home