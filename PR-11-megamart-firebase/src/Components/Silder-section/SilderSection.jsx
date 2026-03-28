import  { useEffect, useRef, useState } from "react";
import "./silderSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DEFAULT_ITEMS = [
  { id: 1, image: "./src/image/shopping-item-1.png", title: "T-SHIRT", subtitle: "MIN. 30% OFF", badge: "SHOP NOW" },
  { id: 2, image: "./src/image/shopping-item-2.png", title: "SHIRT", subtitle: "MIN. 30% OFF", badge: "SHOP NOW" },
  { id: 3, image: "./src/image/shooping-item-3.png", title: "DRESSES", subtitle: "FLAT 30-55% OFF", badge: "SHOP NOW" },
  { id: 4, image: "./src/image/shooping-item-4.png", title: "JACKET", subtitle: "FLAT 30-55% OFF", badge: "SHOP NOW" },
  { id: 5, image: "./src/image/shooping-item-6.png", title: "TOP", subtitle: "MIN. 30% OFF", badge: "SHOP NOW" },
  { id: 6, image: "./src/image/shooping-item-5.png", title: "SHORTS", subtitle: "UP TO 60% OFF", badge: "SHOP NOW" },
];

const SliderSection = ({ items = DEFAULT_ITEMS, title = "VALUE FINDS", autoPlay = true, autoPlayInterval = 3500 }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(5);
  const [slideWidth, setSlideWidth] = useState(0);
  const total = items.length;

  // determine visible slides based on width
  const computeVisible = (w) => {
    if (w < 600) return 1;
    if (w < 1000) return 3;
    return 5;
  };

  // recalc sizes
  const recalc = () => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.clientWidth || window.innerWidth;
    const vis = computeVisible(w);
    setVisible(vis);
    const sw = w / vis;
    setSlideWidth(sw);
    // ensure current is in bounds (for small screen)
    if (current > total - 1) setCurrent(0);
  };

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        if (next > total - 1) return 0;
        return next;
      });
    }, autoPlayInterval);
    // pause on hover handled by CSS pointer-events (we'll stop interval on unmount)
    return () => clearInterval(id);
  }, [autoPlayInterval, autoPlay, total]);

  // ensure translate matches current
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const translate = -current * slideWidth;
    track.style.transform = `translateX(${translate}px)`;
  }, [current, slideWidth]);

  const prev = () => {
    setCurrent((p) => (p - 1 < 0 ? total - 1 : p - 1));
  };
  const next = () => {
    setCurrent((p) => (p + 1 > total - 1 ? 0 : p + 1));
  };
  const goTo = (i) => setCurrent(i);

  return (
    <section className="value-slider-section">
      <div className="value-slider-inner container" ref={containerRef}>
        <h2 className="slider-title">{title}</h2>

        <div className="slider-viewport" /* hover pauses by CSS pointer-events: none on arrows? */>
          <button className="arrow left" aria-label="Previous" onClick={prev}><FaChevronLeft /></button>
          <div className="slider-track-wrap">
            <div className="slider-track" ref={trackRef} style={{ gap: "20px" }}>
              {items.map((it) => (
                <article className="slide-card" key={it.id} style={{ minWidth: `${slideWidth}px` }}>
                  <div className="card-image">
                    {/* Replace with real img paths */}
                    <img src={it.image} alt={it.title} onError={(e)=>{e.target.src='/src/images/placeholder.png'}} />
                  </div>
                  <div className="card-bottom">
                    <div className="card-left">
                      <div className="card-sub">{it.subtitle}</div>
                      <div className="card-title">{it.title}</div>
                    </div>
                    <div className="card-right">
                      <button className="shop-btn">{it.badge}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button className="arrow right" aria-label="Next" onClick={next}><FaChevronRight /></button>
        </div>

        <div className="dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
