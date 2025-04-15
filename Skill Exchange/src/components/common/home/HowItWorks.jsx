// import React from 'react'
// import '../../../assets/howitworks.css'
// import Image from "../images/6333213.jpg";
// import Image2 from "../images/3026173.jpg";
// import Image3 from "../images/6174467.jpg";

// const HowItWorks = () => {
//   return (
//     <div>
//       {/* How It Works */}
// <section className="how-it-works bg-secondary-subtle">
//   <h2 className="section-title">How It Works</h2>
//   <div className="steps-container">
//     <div className="step">
//       <img src={Image} alt="Sign Up" className="step-image" />
//       <h4>Sign Up</h4>
//       <p>Create a profile and list your skills.</p>
//     </div>
//     <div className="step">
//       <img src={Image2} alt="Find a Match" className="step-image" />
//       <h4>Find a Match</h4>
//       <p>Connect with learners or teachers.</p>
//     </div>
//     <div className="step">
//       <img src={Image3} alt="Exchange Skills" className="step-image" />
//       <h4>Exchange Skills</h4>
//       <p>Learn and teach through interactive sessions.</p>
//     </div>
//   </div>
// </section>

//     </div>
//   )
// }

// export default HowItWorks;


import React from 'react'
import Image from "../images/6333213.jpg";
import Image2 from "../images/3026173.jpg";
import Image3 from "../images/6174467.jpg";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const gotoSignup = () => {
    navigate('/signup')
  }

  const gotoMatch = () => {
    navigate('/user/messages')
  }

  const gotoSkills = () => {
    navigate('/requestskill')
  }

  return (
    <div style={{
      width: "99vw",
      padding: "80px 20px",
      backgroundColor: "#e3f2fd", // White background
      background: "linear-gradient(to right, #bbdefb 0%, ##bbdefb 50%, #FFFFFF 100%)",
      textAlign: "center"
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        marginBottom: "60px",
        color: "#2A5CAA"
      }}>
        How It Works
      </h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "130px",
        cursor:"pointer",
        flexWrap: "wrap",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {[
          {
            image: Image,
            title: "Sign Up",
            onclick: gotoSignup,
            text: "Create a profile and list your skills."
          },
          {
            image: Image2,
            title: "Find a Match",
            onclick: gotoMatch,
            text: "Connect with learners or teachers."
          },
          {
            image: Image3,
            title: "Exchange Skills",
            onclick: gotoSkills,
            text: "Learn and teach through interactive sessions."
          }
        ].map((step, index) => (
          <div 
            key={index}
            onClick={step.onclick}
            style={{
              width: "300px",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <img 
              src={step.image} 
              alt={step.title} 
              style={{
                width: "220px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "20px"
              }} 
            />
            <h4 style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              marginBottom: "15px",
              color: "#333"
            }}>
              {step.title}
            </h4>
            <p style={{
              color: "#555",
              fontSize: "1rem",
              lineHeight: "1.6"
            }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;