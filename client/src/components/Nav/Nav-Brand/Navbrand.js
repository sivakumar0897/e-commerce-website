import './NavBrand.css';
import { Link } from 'react-router-dom';
import ecommerceLogo from '../../../asset/icons/E-commerce.png'; // Adjust the path if needed

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
         <Link to="/"> 
             <img src={ecommerceLogo} alt="E-commerce Logo" className='navbrand__logo' width={120} />
         </Link>
           
        </div>
     );
}
 
export default NavBrand;
