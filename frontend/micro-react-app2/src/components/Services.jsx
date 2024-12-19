import React from "react";
import "./Service.css";
import { Code, Palette, Globe, Database, Shield, Smartphone } from 'lucide-react';
import { useSelector } from "react-redux";

export const Services = () => {
  const userState=useSelector((state)=>state.user);
  console.log(userState);
  const servicesArray = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies and best practices.',
      color: 'bg-primary-soft'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive interfaces that enhance user experience and engagement.',
      color: 'bg-success-soft'
    },
    {
      icon: Globe,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to boost your online presence and reach.',
      color: 'bg-info-soft'
    },
    {
      icon: Database,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services for your growing business needs.',
      color: 'bg-warning-soft'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      color: 'bg-danger-soft'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      color: 'bg-purple-soft'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title text-center">
          <h2>Our Services</h2>
          <p>We offer comprehensive digital solutions to help your business grow</p>
        </div>
        <div className="services-grid">
          {servicesArray.map((service, index) => (
            <div key={index} className="service-card">
              <div className={`service-icon ${service.color}`}>
                <service.icon />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
