import Slider from "react-slick";
import './Banner.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };
    return (
        <>
            <section>
                <div className="container">
                    <div className="slider-container">
                        <Slider {...settings}>
                            <div className="slide">
                                <img src="./src/image/banner-1.png" alt="slide1" />
                            </div>
                            <div className="slide">
                                <img src="./src/image/banner-2.png" alt="slide2" />
                            </div>
                            <div className="slide">
                                <img src="./src/image/banner-3.png" alt="slide3" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

        </>
    )
}


export default Banner;