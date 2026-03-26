
import { useEffect, useRef } from "react";
import "./booknowreserve.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Bookreserve = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {

    const mainObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide");
            mainObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) mainObserver.observe(contentRef.current);
    if (imageRef.current) mainObserver.observe(imageRef.current);

    const addressElements = document.querySelectorAll(".reserve-address");
    const addressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-up");
            addressObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    addressElements.forEach((el) => addressObserver.observe(el));

    return () => {
      if (contentRef.current) mainObserver.unobserve(contentRef.current);
      if (imageRef.current) mainObserver.unobserve(imageRef.current);
      addressElements.forEach((el) => addressObserver.unobserve(el));
    };
  }, []);

  return (
    <section className="bookreserve-section">
      <Container>
        <Row>
         
          <div
            className="col-lg-6 col-12 p-0 bookreserve-left"
            ref={contentRef}
          >
            <div className="bookreserve-content">
              <h3>Reserve Your Seat ________</h3>
              <h2>Call Us Or Visit Place</h2>
              <p>
                Lorem ipsum dolor sit amet, colur consectetur omni adipisicing
                elit, sed do eiusmod tempor incididunt labore et magna aliqua.
              </p>
            </div>

            <Row>
              <div className="col-md-6 col-12 reserve-address">
                <h4>Torre Annunziata</h4>
                <p className="mt-3 mx-3">
                  1614 E. Bell Rd #104.<br />
                  Salerno, AZ 85022<br />
                  (989) 867-1010<br />
                  Open today 11AM-10PM
                </p>
              </div>

              <div className="col-md-6 col-12 reserve-address">
                <h4>Posillipo</h4>
                <p className="mt-3 mx-3">
                  204 E. Pizzetta Tommaso<br />
                  Sorrento, AZ 85022<br />
                  (989) 867-1010<br />
                  Open today 11AM-10PM
                </p>
              </div>

              <div className="col-md-6 col-12 reserve-address">
                <h4>Torre del Greco</h4>
                <p className="mt-3 mx-3">
                  Vale Puglia 54<br />
                  Torre Del Greco AZ 85022<br />
                  (989) 867-1010<br />
                  Open today 11AM-10PM
                </p>
              </div>

              <div className="col-md-6 col-12 reserve-address">
                <h4>Naples Mercato</h4>
                <p className="mt-3 mx-3">
                  Corso Itali AA<br />
                  Naples, AZ 85022<br />
                  (989) 867-1010<br />
                  Open today 11AM-10PM
                </p>
              </div>
            </Row>
          </div>

          <div className="col-lg-6 col-12 bookreserve-right" ref={imageRef}>
            <div className="bookreserve-img">
              <img
                src="./src/img/reserve-img.jpg"
                className="img-fluid"
                alt="reserve"
              />
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Bookreserve;


