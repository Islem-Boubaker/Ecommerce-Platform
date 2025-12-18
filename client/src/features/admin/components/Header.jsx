import { Bell, Search, UserCircle, Menu } from 'lucide-react'; 

 
const SearchInput = ({ isMobile = false }) => ( 
  <div className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-md mx-4'}`}> 
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> 
    <input 
      type="text" 
      placeholder="Search..." 
      className={`w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${ 
        isMobile ? 'text-sm' : 'text-sm md:text-base' 
      }`} 
    /> 
  </div> 
); 
 
 
const UserProfile = () => ( 
  <div className="hidden sm:flex items-center gap-2 border-l border-gray-200 pl-4"> 
    <UserCircle className="h-8 w-8 text-gray-400" /> 
    <div className="hidden md:block"> 
      <p className="text-sm font-medium text-gray-900">Admin</p> 
      <p className="text-xs text-gray-500">Administrator</p> 
    </div> 
  </div> 
); 
 
 
const NotificationButton = () => ( 
  <button  
    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
    aria-label="Notifications" 
  > 
    <Bell className="h-5 w-5 text-gray-600" /> 
    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" /> 
  </button> 
); 
 
 
const Header = ({ onMenuClick }) => { 
  return ( 
    <header className="fixed top-0 right-0 left-64 bg-white shadow-sm z-10 transition-all duration-300"> 
      <div className="flex items-center justify-between px-4 py-3 md:py-4"> 
        <div className="hidden md:block flex-1"> 
          <SearchInput /> 
        </div> 
        <div className="flex items-center gap-3 md:gap-4"> 
          <NotificationButton /> 
          <UserProfile /> 
        </div> 
      </div> 
    </header> 
  ); 
}; 
 
export default Header;
