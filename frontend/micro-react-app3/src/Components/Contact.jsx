import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export function Contact() {
  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Contact Info */}
          <div className="col-lg-6">
            <h2 className="display-4 fw-bold mb-4">Get in Touch</h2>
            <p className="lead text-muted mb-5">
              Have questions? We'd love to hear from you. Send us a message, and we'll respond as soon as possible.
            </p>

            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-center">
                <Mail className="contact-icon text-primary me-3" size={28} />
                <div>
                  <h3 className="h5 mb-1">Email</h3>
                  <p className="text-muted mb-0">contact@cptech.com</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <Phone className="contact-icon text-primary me-3" size={28} />
                <div>
                  <h3 className="h5 mb-1">Phone</h3>
                  <p className="text-muted mb-0">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <MapPin className="contact-icon text-primary me-3" size={28} />
                <div>
                  <h3 className="h5 mb-1">Location</h3>
                  <p className="text-muted mb-0"> Siruseri Sipcot, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="card-title text-center mb-4">Send Us a Message</h3>
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Your Message"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
