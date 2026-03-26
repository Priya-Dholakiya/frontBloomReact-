import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './booknowbanner.css'
import { Link } from 'react-router';
const Bookbanner = () => {
    return (
        <>
        {/* Book Banner start  */}
            <section className="book-banner-section">

                <Container fluid>

                    <Row className='d-flex align-items-center'>

                        <img src='./src/img/banner-onion.png' className='banner-onion-image'></img>
                        <img src='./src/img/banner-leaf.png' className='banner-banner-leaf-image'></img>
                        <img src='./src/img/banner-tamato.png' className='banner-tamato-image'></img>

                        <div className='col-12 col-lg-6'>

                            <div className='book-banner-content'>
                                <h1>Book A Table</h1>
                                <p className='col-9'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                            </div>

                        </div>

                        <div className='col-12 col-lg-5'>
                            <ul className="book-banner-menu">

                                <li className='me-3'><Link to={'/'} style={{ textDecoration: "None",color:"#777777"}} >Home</Link></li> 
                                <li className='me-2' style={{color:"#777777"}} >/</li>
                                <li className='ms-3'><Link to={'/bookatable '} style={{ textDecoration: "None",color:"#f22e3e"}}>Book A Table</Link></li>

                            </ul>

                        </div>

                    </Row>
                </Container>

            </section>
            {/* Book Banner end  */}
        </>
    )
}
export default Bookbanner;