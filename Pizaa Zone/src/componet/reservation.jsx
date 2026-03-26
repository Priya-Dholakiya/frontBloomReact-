import Container from 'react-bootstrap/Container';
import './reservation.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Reservation = () => {
    return (
        <section className='reservation-section py-5'>
            <Container>
                <Row>
                    {/* Image column */}
                    <Col lg={6} xs={12} className="mb-4 mb-lg-0">
                        <div className="book-reservation-img">
                            <img src="src/img/book-img.jpg" alt="reservation" className="img-fluid" />
                        </div>
                    </Col>

                    {/* Form column */}
                    <Col lg={6} xs={12} className="px-0">
                        <div className="book-reservation-content">
                            <h3>Reservation ________</h3>
                            <h1>Book A Table Now!</h1>
                        </div>

                        {/* Row 1 */}
                        <Row className="my-3">
                            <Col md={6} xs={12} className="mb-3 mb-md-0">
                                <input type="text" className='reservation-name' placeholder='Name*' />
                            </Col>
                            <Col md={6} xs={12}>
                                <input type="text" className='reservation-name' placeholder='Email*' />
                            </Col>
                        </Row>

                        {/* Row 2 */}
                        <Row className="my-3">
                            <Col md={6} xs={12} className="mb-3 mb-md-0">
                                <input type="text" className='reservation-name' placeholder='Phone*' />
                            </Col>
                            <Col md={6} xs={12}>
                                <input type="text" className='reservation-name' placeholder='Time*' />
                            </Col>
                        </Row>

                        {/* Row 3 */}
                        <Row className="my-3">
                            <Col md={6} xs={12} className="mb-3 mb-md-0">
                                <input type="text" className='reservation-name' placeholder='Date*' />
                            </Col>
                            <Col md={6} xs={12}>
                                <input type="text" className='reservation-name' placeholder='Guest*' />
                            </Col>
                        </Row>

                        {/* Button */}
                        <Row className="pt-4">
                            <Col>
                                <button className='rounded-5 py-2 px-4 bg-warning border-0 text-white fw-bold'>Book Now</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )   
};

export default Reservation;
