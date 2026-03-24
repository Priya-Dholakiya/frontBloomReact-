import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">

      {/* HERO */}
      <section className="hero">
        <span className="tag">Our Story</span>
        <h1>
          We believe in the power of <br />
          <span>the perfect step</span>
        </h1>
        <p>
          Founded in 2010, Stride was born from a simple idea: footwear should
          never slow you down. Innovation, style and comfort.
        </p>
      </section>

      {/* STATS */}
      <section className="stats">
        <div><h2>500K+</h2><p>Happy Customers</p></div>
        <div><h2>200+</h2><p>Shoe Styles</p></div>
        <div><h2>15</h2><p>Countries Served</p></div>
        <div><h2>4.9</h2><p>Average Rating</p></div>
      </section>

      {/* MISSION */}
      <section className="mission">
        <div className="left">
          <span className="mini">OUR MISSION</span>
          <h2>Making every step count</h2>
          <p>
            At Stride, we are on a mission to revolutionize the footwear industry
            by creating shoes that not only look good—they feel incredible.
          </p>

          <div className="features">
            <div>
              <h4>✔ Quality First</h4>
              <p>Premium materials & long-lasting build</p>
            </div>
            <div>
              <h4>✔ Fast Comfort</h4>
              <p>Instant comfort, no break-in needed</p>
            </div>
            <div>
              <h4>✔ Style Meets Function</h4>
              <p>Fashion forward with performance tech</p>
            </div>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Team" />
      </section>

      {/* TESTIMONIALS - NEW */}
      <section className="testimonials">
        <h2>What our customers say</h2>
        <div className="testi-grid">
          <div className="testi">
            <p>"Best shoes I've ever owned. Comfortable from day 1!"</p>
            <span>- Sarah K.</span>
          </div>
          <div className="testi">
            <p>"Insane grip and style. Worth every penny."</p>
            <span>- Mike R.</span>
          </div>
          <div className="testi">
            <p>"Perfect for daily runs. Lightweight & durable."</p>
            <span>- Priya S.</span>
          </div>
        </div>
      </section>
      {/* CTA - NEW */}
      <section className="cta-about">
        <h2>Ready to find your stride?</h2>
        <p>Join thousands who trust Stride for their footwear.</p>
        <button className="btn-primary">Shop Now</button>
      </section>

    </div>
  );
};

export default About;
