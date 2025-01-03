import { FC } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../ContextApi/UserAuthContext";


type TNavbarProps ={
    label: string;
    to:string;
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
function Navbar() {
    const navigate = useNavigate()
    const {SignOut, userData} = useAuth()
    //const { pathname } = useLocation()
    //const [user, loading, error] = useAuthState(auth, options);
    

    function Signout(){
      SignOut()
      navigate("/signin")
    }
  return (
    <div className="navbar">
        <h1 className='logo'>Utopia</h1>
        <nav>
            <NavItem to="/home" label="Home" />
            {/* <NavItem to="#" label="Notification" /> */}
            <NavItem to="/create" label="Create" />
            <NavItem to={`/${userData?.username}`} label="Profile" />  
        </nav>
        <p className="logout" onClick={Signout}>Log Out</p>
    </div>
  )
}

export default Navbar