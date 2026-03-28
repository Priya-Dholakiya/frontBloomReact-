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
                    <Navbar.Brand href="/">
                        <img src='./src/image/mega-logo.png' className='mega-logo'></img>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    
                    <Navbar.Collapse className="justify-content-end">
                        <div className="d-flex align-items-center gap-2">

                            {/* USER ICON WITH DROPDOWN */}
                            <div className="user-dropdown">
                                <div className="user-icon text-center ">
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

                            {/* Other icons */}
                            <div className="text-center">
                                <CiHeart className="nav-icon ms-0" />
                            </div>
                            <div className="text-center">
                                <LuBaggageClaim className="nav-icon ms-0" />
                            </div>

                            {/* Add button */}
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

            <section className='header-nav'>
                <div className='container-fluid'>
                    <div className='menu d-flex justify-content-center align-items-center'>
                        <ul className='d-flex gap-2 gap-lg-5 mb-0'>
                            <li className='mega-menu'>
                                <Link className='sub-menu' to={'/Men'}>Men</Link>
                                <div className='drop-down'>
                                    <div className='container d-flex justify-content-between'>
                                        {/* left */}
                                        <div className='d-flex gap-5'>
                                            <div>
                                                <h6 className='fw-bold'>TOPWEAR</h6>
                                                <ul className='ps-0'>
                                                    <li><Link>T-Shirts</Link></li>
                                                    <li><Link>Polo Shirts</Link></li>
                                                    <li><Link>Casual Shirts</Link></li>
                                                    <li><Link>Formal Shirts</Link></li>
                                                    <li><Link>Sweatshirts & Hoodies</Link></li>
                                                    <li><Link>Jackets</Link></li>
                                                    <li><Link>Blazers</Link></li>
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
                                        {/* right image */}
                                        <div className='mega-drop-down-image'>
                                            <img src='/src/image/Men-drop-down-image.png' alt='drop' />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <li className='mega-menu'>
                                    <Link className='sub-menu' to={'/Women'}>Women</Link>
                                    <div className='drop-down'>
                                        <div className='container d-flex justify-content-between'>
                                            {/* left */}
                                            <div className='d-flex gap-5'>
                                                <div>
                                                    <h6 className='fw-bold'>TOPWEAR</h6>
                                                    <ul className='ps-0'>
                                                        <li><Link>T-Shirts</Link></li>
                                                        <li><Link>Tops</Link></li>
                                                        <li><Link>Polo Shirts</Link></li>
                                                        <li><Link>Shirts</Link></li>
                                                        <li><Link>Dresses & Jumpsuits</Link></li>
                                                        <li><Link>Jackets</Link></li>
                                                        <li><Link>Sweatshirts & Hoodies</Link></li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h6 className='fw-bold'>BOTTOMWEAR</h6>
                                                    <ul className='ps-0'>
                                                        <li><Link>Jeans</Link></li>
                                                        <li><Link>Trousers</Link></li>
                                                        <li><Link>Leggings</Link></li>
                                                        <li><Link>Joggers</Link></li>
                                                        <li><Link>Shorts</Link></li>
                                                        <li><Link>Track Pants</Link></li>
                                                        <li><Link>Cargo Pants</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* right image */}
                                            <div className='mega-drop-down-image'>
                                                <img src='/src/image/Women-drop-down-image.png' alt='drop' />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </li>
                            <li>
                                <li className='mega-menu'>
                                    <Link className='sub-menu' to={'/Kids'}>Kids</Link>
                                    <div className='drop-down'>
                                        <div className='container d-flex justify-content-between'>
                                            {/* left */}
                                            <div className='d-flex gap-5'>
                                                <div>
                                                    <h6 className='fw-bold'>BOYS</h6>
                                                    <ul className='ps-0'>
                                                        <li><Link>Tops & Shirts</Link></li>
                                                        <li><Link>Polo Shirts</Link></li>
                                                        <li><Link>Shirts</Link></li>
                                                        <li><Link>Sweatshirts & Hoodies</Link></li>
                                                        <li><Link>Jeans</Link></li>

                                                        <li><Link>Pants</Link></li>
                                                        <li><Link>Shorts</Link></li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h6 className='fw-bold'>GIRLS</h6>
                                                    <ul className='ps-0'>
                                                        <li><Link>Tops & Shirts</Link></li>
                                                        <li><Link>Dresses</Link></li>
                                                        <li><Link>Jackets</Link></li>
                                                        <li><Link>Sweaters</Link></li>
                                                        <li><Link>Polo Shirts </Link></li>
                                                        <li><Link>Sweatshirts & Hoodies</Link></li>

                                                        <li><Link>Shorts</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* right image */}
                                            <div className='mega-drop-down-image'>
                                                <img src='/src/image/Kids-drop-down-image.png' alt='drop' />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </li>

                        </ul>

                    </div>
                </div>
            </section>
        </>
    )
}
export default Header;