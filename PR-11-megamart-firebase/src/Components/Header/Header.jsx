import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FiUser } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { LuBaggageClaim } from "react-icons/lu";
import './Header.css'
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOutuserAsync } from '../Services/Action/Authentication';
import { FaCirclePlus } from "react-icons/fa6";

const Header = () => {

    const { user } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signOutuserAsync());
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand as={Link} to="/"> 
                        <img src='/src/image/mega-logo.png' className='mega-logo' alt="logo" /> 
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    
                    <Navbar.Collapse className="justify-content-end">
                        <div className="d-flex align-items-center gap-2">

                            {/* USER DROPDOWN */}
                            <div className="user-dropdown">
                                <div className="user-icon text-center">
                                    <FiUser className="nav-icon ms-0" />
                                </div>

                                {user && (
                                    <div className="user-dropdown-content">
                                        <p className="user-email">{user.email}</p>
                                        <button className="btn logout-btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ICONS */}
                            <div className="text-center">
                                <CiHeart className="nav-icon ms-0" />
                            </div>
                            <div className="text-center">
                                <LuBaggageClaim className="nav-icon ms-0" />
                            </div>

                            {/* AUTH BUTTON */}
                            {user ? (
                                <Link to={"/add"} className="btn Add-collection mx-2">
                                    <FaCirclePlus />
                                </Link>
                            ) : (
                                <Link to={"/SignIn"} className="btn signin-btn">
                                    SIGNIN
                                </Link>
                            )}
                        </div>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

            {/* NAV MENU */}
            <section className='header-nav'>
                <div className='container-fluid'>
                    <div className='menu d-flex justify-content-center align-items-center'>
                        <ul className='d-flex gap-2 gap-lg-5 mb-0'>

                            {/* MEN */}
                            <li className='mega-menu'>
                                <Link className='sub-menu' to={'/Men'}>Men</Link>

                                <div className='drop-down'>
                                    <div className='container d-flex justify-content-between'>
                                        <div className='d-flex gap-5'>
                                            <div>
                                                <h6 className='fw-bold'>TOPWEAR</h6>
                                                <ul className='ps-0'>
                                                    <li><Link to="#">T-Shirts</Link></li> 
                                                    <li><Link to="#">Polo Shirts</Link></li>
                                                    <li><Link to="#">Casual Shirts</Link></li>
                                                    <li><Link to="#">Formal Shirts</Link></li>
                                                    <li><Link to="#">Hoodies</Link></li>
                                                    <li><Link to="#">Jackets</Link></li>
                                                    <li><Link to="#">Blazers</Link></li>
                                                </ul>
                                            </div>

                                             <div>
                                                <h6 className='fw-bold'>BOTTOMWEAR</h6>
                                                <ul className='ps-0'>
                                                    <li><Link>Jeans</Link></li>
                                                    <li><Link>Chinos</Link></li>
                                                    <li><Link>Casual Trousers</Link></li>
                                                    <li><Link>Formal Trousers</Link></li>
                                                    <li><Link>Shorts</Link></li>
                                                    <li><Link>Track Pants</Link></li>
                                                    <li><Link>Cargo Pants</Link></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='mega-drop-down-image'>
                                            <img src='/src/image/Men-drop-down-image.png' alt='men' />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* WOMEN */}
                            <li className='mega-menu'> 
                                <Link className='sub-menu' to={'/Women'}>Women</Link>

                                <div className='drop-down'>
                                    <div className='container d-flex justify-content-between'>
                                        <div className='d-flex gap-5'>
                                             <div>
                                                <h6 className='fw-bold'>TOPWEAR</h6>
                                                <ul className='ps-0'>
                                                    <li><Link>Tops</Link></li>
                                                    <li><Link>T-Shirts</Link></li>
                                                    <li><Link>Polo Shirts</Link></li>
                                                    <li><Link>Shirts</Link></li>
                                                    <li><Link>Dresses & jumpsuits</Link></li>
                                                     <li><Link>Jackets</Link></li>
                                                    <li><Link>Sweatshirts & Hoodies</Link></li>
                                                    <li><Link>Sweaters</Link></li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h6 className='fw-bold'>BOTTOMWEAR</h6>
                                                <ul className='ps-0'>
                                                    <li><Link>Jeans</Link></li>
                                                    <li><Link>Trousers</Link></li>
                                                    <li><Link>Leggings</Link></li>
                                                    <li><Link>Formal Trousers</Link></li>
                                                    <li><Link>Track Pants</Link></li>
                                                     <li><Link>Skirts</Link></li>
                                                    <li><Link>Shorts</Link></li>
                                                 </ul>
                                            </div>
                                        </div>

                                        <div className='mega-drop-down-image'>
                                            <img src='/src/image/women-Drop-Menu.jpeg' height={200} alt='women' />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* KIDS */}
                            <li className='mega-menu'> 
                                <Link className='sub-menu' to={'/Kids'}>Kids</Link>

                                <div className='drop-down'>
                                    <div className='container d-flex justify-content-between'>
                                        <div className='d-flex gap-5'>
                                            <div>
                                                <h6 className='fw-bold'>BOYS</h6>
                                                <ul className='ps-0'>
                                                    <li><Link to="#">Shirts</Link></li>
                                                    <li><Link to="#">Jeans</Link></li>
                                                    <li><Link to="#">T-Shirts</Link></li> 
                                                    <li><Link to="#">Polo Shirts</Link></li>
                                                    <li><Link to="#">Casual Shirts</Link></li>
                                                    <li><Link to="#">Formal Shirts</Link></li>
                                                    <li><Link to="#">Hoodies</Link></li>
                                                    <li><Link to="#">Jackets</Link></li>
                                                    <li><Link to="#">Blazers</Link></li>
                                                </ul>
                                            </div>
                                             <div>
                                                <h6 className='fw-bold'>GIRLS</h6>
                                                <ul className='ps-0'>
                                                    <li><Link>TOP & T-Shirts</Link></li>
                                                    <li><Link>Dresses</Link></li>
                                                    <li><Link>Jackets</Link></li>
                                                    <li><Link>Chinos</Link></li>
                                                    <li><Link>Sweaters</Link></li>
                                                    <li><Link>pholo Shirts</Link></li>
                                                    <li><Link>Sweatshirts & Hoodies</Link></li>
                                                    <li><Link>Shorts</Link></li>
                                                    <li><Link>Jeans</Link></li>
                                                    <li><Link>Pants</Link></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='mega-drop-down-image'>
                                            <img src='/src/image/Kids-drop-down-image.png' alt='kids' />
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;