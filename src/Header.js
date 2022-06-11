import React from 'react'; 
import { Link, Outlet} from 'react-router-dom';
const Header = () => {
        return (<nav>
                    <Link to="app">Records</Link> | 
                    <Link to="getid"> GetID</Link> 
                    <Outlet/>
                </nav>)
}
export default Header;