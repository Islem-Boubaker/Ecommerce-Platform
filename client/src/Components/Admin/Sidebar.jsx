import { NavLink } from "react-router-dom";
import { Home, Shirt, ShoppingBag, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    {
      to: "/dashboard?tab=Products",
      icon: <Shirt size={20} />,
      label: "Products",
    },
    {
      to: "/dashboard?tab=Orders",
      icon: <ShoppingBag size={20}  />,
      label: "Orders",
    },
    {
      to: "/dashboard?tab=Customers",
      icon: <Users size={20} />,
      label: "Customers",
    },
    {
      to: "/dashboard?tab=Settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 bg-black text-white p-4 h-screen flex-shrink-0 z-10">
      <div className="text-xl font-bold mb-8 p-4">Admin Panel</div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors `
                  
                  
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
