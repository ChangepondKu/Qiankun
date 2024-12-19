import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import "./HomePage.css"; // Add a separate CSS file for custom styling
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        // Redirect to another page or show a modal
        console.log("Get Started clicked!");
        // navigate('/app1/user');
    };

    return (
        <section className="hero-section d-flex align-items-center vh-100 position-relative">
            {/* Carousel for Tech-Related Images */}
            {/* <div id="techCarousel" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                            className="d-block w-100"
                            alt="AI Concept"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
                            className="d-block w-100"
                            alt="Robotics"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&q=80"
                            className="d-block w-100"
                            alt="Software Development"
                        />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> */}
            {/* Overlay */}
            <div
                className="hero-overlay position-absolute w-100 h-100"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: -1 }}
            ></div>

            <div className="container text-center py-5">
                <h1 className="display-2 fw-bold mb-4 hero-title">
                    Welcome to the Future of Technology and Innovation!
                </h1>
                <p className="lead mb-5 mx-auto hero-text" style={{ maxWidth: "700px" }}>
                    Our platform serves as a one-stop hub for learning, exploring, and connecting with the latest in Artificial Intelligence, Robotics, and Software Development. Join us in creating tomorrow's tech innovations today.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                    <button className="btn btn-primary btn-lg d-flex align-items-center gap-2 hero-btn" onClick={handleGetStarted}>
                        Get Started <ArrowRight size={20} />
                    </button>
                    <button className="btn btn-outline-dark btn-lg hero-btn-outline">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Down Arrow */}
            {/* <div className="position-absolute bottom-0 start-50 translate-middle-x bounce-animation">
                <ChevronDown size={32} className="text-white" />
            </div> */}
        </section>
    );
}

export default HomePage;
