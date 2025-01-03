import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../ContextApi/UserAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faHome, faPerson, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
//import { useAuthState } from 'react-firebase-hooks/auth';
 


type TNavbarProps ={
    label: any;
    to?: any;
    onClick?:any;
}

const NavItem: FC<TNavbarProps>=({label,to}) => {
    const location = useLocation(); // Get the current route
  const isActive = location.pathname === to; // Check if active

  return (
    <NavLink
      to={to}
      className={isActive ? "active": "nav-item"}
    >
      {label}
    </NavLink>
  );
}
function MobileNavbar() {
    const { userData} = useAuth()
   
  return (
    <div className="mobile-navbar">
        <nav>
            <NavItem to="/home" label={<FontAwesomeIcon icon={faHome}/>} />
            <NavItem to="/search" label={<FontAwesomeIcon icon={faSearch}/>} />
            <NavItem to="/create" label={<FontAwesomeIcon icon={faPlus}/>} />
            <NavItem to={`/${userData?.username}`} label={<FontAwesomeIcon icon={faPerson}/>} />  
        </nav>
    </div>
  )
}

export default MobileNavbar