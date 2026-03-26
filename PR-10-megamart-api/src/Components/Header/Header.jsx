import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FiUser } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { LuBaggageClaim } from "react-icons/lu";
import './Header.css'
import { Link } from 'react-router';
const Header = () => {

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">
                        <img src='./src/image/mega-logo.png' className='mega-logo'></img>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <input placeholder='Search' className='px-3 py-1'></input>

                        </Navbar.Text>
                        <div className='d-flex gap-2'>
                            <FiUser className='nav-icon' />
                            <CiHeart className='nav-icon' />
                            <LuBaggageClaim className='nav-icon' />
                        </div>
                        <Link to={'/add'} className='btn'>ADD</Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className='header-nav'>
                <div className='container-fluid'>
                    <div className='menu d-flex justify-content-center align-items-center'>
                        <ul className='d-flex gap-5 mb-0'>
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
                                <Link>Women</Link>
                            </li>
                            <li>
                                <Link>Kids</Link>
                            </li>
                            <li>
                                <Link>Footwear</Link>
                            </li>
                            <li>
                                <Link>Innerwear</Link>
                            </li>
                            <li>
                                <Link>Accessoies</Link>
                            </li>
                            <li>
                                <Link>Brands</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </section>
        </>
    )
}
export default Header;