// import React from "react";
// import Image from "./images/Web.jpg";
// import Image2 from "./images/sales.jpg";
// import Image3 from "./images/photoed.jpg";
// import Image4 from "./images/digital.jpg";
// import { useNavigate } from "react-router-dom";
// import UserSidebar from "../layouts/UserSidebar";
// import HowItWorks from "./home/HowItWorks";
// import MainSection from "./home/MainSection";
// import Footer from "./Footer";

// const HomeRoute = () => {
//   const navigate = useNavigate();
//   const gotoWeb = () => {
//     navigate('/user/skillusers/Web%20Development')
//   }
//   const gotoSales = () => {
//     navigate('/user/skillusers/Sales%20%26%20Negotiation%20Skills')
//   }
//   const gotoPhoto = () => {
//     navigate('/user/skillusers/Photography%20%26%20Photo%20Editing')
//   }
//   const gotoDigital = () => {
//     navigate('/user/skillusers/Digital%20Marketing')
//   }
//   return (
//     <div>
//       {/* Navbar */}
//       <UserSidebar></UserSidebar>
//       {/* Hero Section */}
//       <header className="text-center py-5" style={{ width: "99vw", backgroundColor: "#bdbdbd" }}>
//         <div className="container " >
//           <h1 className="fw-bold">Learn & Teach Skills Easily</h1>
//           <p className="lead">Join SkillExchange and start sharing your knowledge today!</p>
//           <button className="btn btn-light btn-lg fw-bold shadow-sm" onClick={() => navigate("/signup")}>Get Started</button>
//         </div>
//       </header>

//       {/* Main Section */}
//       {/* <div className="container py-5"style={{width:"205vh"}}>
//         <div className="row align-items-center text-center text-md-start">
//           <div className="col-12 col-md-6 d-flex justify-content-center">
//             <img src={Image} alt="Skill Exchange" className='img-fluid rounded shadow-lg' style={{ maxWidth: '50%', height: 'auto' }} />
//           </div>
//           <div className="col-12 col-md-6">
//             <h1 className="fw-bold">Skill Sharing, Collaboration, and Learning</h1>
//             <p className="lead text-muted">The Skill Exchange platform aims to democratize learning by fostering a culture of
//                    knowledge-sharing, enabling users to grow together and achieve their personal and
//                    professional goals.</p>
//           </div>
//         </div>
//       </div> */}
//       <MainSection></MainSection>

//       {/* How It Works */}
//       <HowItWorks></HowItWorks>

//       {/* Invest in Your Career */}
//       <div className="container py-5">
//         <h2 className="text-center fw-bold">Invest in Your Career</h2>
//         <div className="row text-center mt-4">
//           <div className="col-12 col-md-4 p-3 border rounded shadow-sm bg-opacity-10" style={{ backgroundColor: "#eceff1" }}>
//             <i className="fa-solid fa-house-circle-check fa-2x" style={{color:"#26a69a"}}></i>
//             <h4 className="mt-2">Build Community</h4>
//             <p>Foster collaboration, networking, and mutual learning.</p>
//           </div>
//           <div className="col-12 col-md-4 p-3 border rounded shadow-sm bg-opacity-10" style={{ backgroundColor: "#eceff1" }}>
//             <i className="fa-solid fa-bullseye fa-2x" style={{color:"#f44336"}}></i>
//             <h4 className="mt-2">Explore New Skills</h4>
//             <p>Gain hands-on experience and enhance your expertise.</p>
//           </div>
//           <div className="col-12 col-md-4 p-3 border rounded shadow-sm bg-opacity-10" style={{ backgroundColor: "#eceff1" }}>
//             <i className="fa-solid fa-ribbon fa-2x" style={{color:"#ffb300"}}></i>
//             <h4 className="mt-2">Earn Credentials</h4>
//             <p>Showcase your skills with verified badges.</p>
//           </div>
//         </div>
//       </div>

//       {/* Featured Skills */}
//       <section className="featured-skills-section">
//         <div className="container">
//           <h2 className="text-center fw-bold">Featured Skills</h2>
//           <div className="skills-wrapper">
//             <div className="skill-card music" onClick={gotoWeb}>
//               <img src={Image} alt="Web Development" />
//               <span>Web Development</span>
//             </div>
//             <div className="skill-card education">
//               <img src={Image2} alt="Sales and Negotiation" onClick={gotoSales}/>
//               <span>Sales and Negotiation</span>
//             </div>
//             <div className="skill-card photography">
//               <img src={Image3} alt="Photography and Photo Editing" onClick={gotoPhoto}/>
//               <span>Photography and Photo Editing</span>
//             </div>
//             <div className="skill-card marketing">
//               <img src={Image4} alt="Digital Marketing" onClick={gotoDigital}/>
//               <span>Digital Marketing</span>
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* Testimonials */}
//       {/* <section className="container my-5">
//         <h2 className="text-center fw-bold">What Our Users Say</h2>
//         <div className="row mt-4">
//           <div className="col-12 col-md-6">
//             <div className="p-3 border rounded shadow-sm bg-light">"Great platform to exchange knowledge!" - Alex</div>
//           </div>
//           <div className="col-12 col-md-6">
//             <div className="p-3 border rounded shadow-sm bg-light">"I found an amazing mentor here." - Sarah</div>
//           </div>
//         </div>
//       </section> */}

//       {/* Footer */}
//       <Footer></Footer>
//     </div>
//   );
// };

// export default HomeRoute;


import React from "react";
import Image from "./images/Web.jpg";
import Image2 from "./images/sales.jpg";
import Image3 from "./images/photoed.jpg";
import Image4 from "./images/digital.jpg";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../layouts/UserSidebar";
import HowItWorks from "./home/HowItWorks";
import MainSection from "./home/MainSection";
import Footer from "./Footer";

const HomeRoute = () => {
  const navigate = useNavigate();
  const gotoWeb = () => {
    navigate('/user/skillusers/Web%20Development')
  }
  const gotoSales = () => {
    navigate('/user/skillusers/Sales%20%26%20Negotiation%20Skills')
  }
  const gotoPhoto = () => {
    navigate('/user/skillusers/Photography%20%26%20Photo%20Editing')
  }
  const gotoDigital = () => {
    navigate('/user/skillusers/Digital%20Marketing')
  }

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: "#F8F9FA",width:"99vw" }}>
      <UserSidebar />

      {/* Hero Section */}
      <header style={{
        width: "99vw",
        background: " #2A5CAA",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "20px",
            fontFamily: "'Poppins', sans-serif"
          }}>
            Learn & Teach Skills Easily
          </h1>
          <p style={{
            fontSize: "1.5rem",
            marginBottom: "30px",
            opacity: "0.9"
          }}>
            Join SkillExchange and start sharing your knowledge today!
          </p>
          <button
            onClick={() => navigate("/signup")}
            style={{
              backgroundColor: "#FFD166",
              color: "#2A5CAA",
              border: "none",
              padding: "12px 30px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      <MainSection />
      <HowItWorks />

      {/* Invest in Your Career */}
      <div style={{
        width:"98vw",
        // margin: "0",
        // padding: "60px 20px"
      }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: "2.5rem",
          marginBottom: "10px",
          paddingTop:"30px",
          color: "#2A5CAA"
        }}>
          Invest in Your Career
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "80px",
          flexWrap: "wrap",
          width: "99vw",
          padding: "60px 20px",
          backgroundColor: "#F0F4F8", // Slightly darker than main background
          background: "linear-gradient(to bottom, #F8F9FA 0%, #E6ECF2 100%)"
        }}>
          {[
            {
              icon: "fa-bullseye",
              color: "#f44336",
              title: "Explore New Skills",
              text: "Gain hands-on experience and enhance your expertise."
            },
            {
              icon: "fa-star",
              color: "#ffb300",
              title: "Work on your Rating",
              text: "Better the rating better the probability of finding a match."
            },
            {
              icon: "fa-house-circle-check",
              color: "#26a69a",
              title: "Build Community",
              text: "Foster collaboration, networking, and mutual learning."
            }
          ].map((item, index) => (
            <div
              key={index}
              style={{
                flex: "1",
                minWidth: "280px",
                maxWidth: "350px",
                padding: "30px",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                textAlign: "center",
                border: "1px solid rgba(0,0,0,0.05)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
                style={{
                  fontSize: "2.5rem",
                  color: item.color,
                  marginBottom: "20px"
                }}
              ></i>
              <h4 style={{
                fontSize: "1.4rem",
                fontWeight: "600",
                marginBottom: "15px",
                color: "#333"
              }}>
                {item.title}
              </h4>
              <p style={{
                color: "#555",
                fontSize: "1rem",
                lineHeight: "1.6"
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Skills */}
      <div style={{
        width: "99vw",
        padding: "60px 20px",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "50px",
            color: "#2A5CAA"
          }}>
            Featured Skills
          </h2>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "70px",
            flexWrap: "wrap"
          }}>
            {[
              {
                image: Image,
                title: "Web Development",
                onClick: gotoWeb,
                bgColor: "linear-gradient(135deg, #ff8a65, #ff7043)"
              },
              {
                image: Image2,
                title: "Sales and Negotiation",
                onClick: gotoSales,
                bgColor: "linear-gradient(135deg, #4db6ac, #00897b)"
              },
              {
                image: Image3,
                title: "Photography and Photo Editing",
                onClick: gotoPhoto,
                bgColor: "linear-gradient(135deg, #64b5f6, #1e88e5)"
              },
              {
                image: Image4,
                title: "Digital Marketing",
                onClick: gotoDigital,
                bgColor: "linear-gradient(135deg, #ffd54f, #ffb300)"
              }
            ].map((skill, index) => (
              <div
                key={index}
                onClick={skill.onClick}
                style={{
                  flex: "1",
                  minWidth: "220px",
                  maxWidth: "250px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: skill.bgColor,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  cursor: "pointer",
                  color: "white"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={skill.image}
                  alt={skill.title}
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "15px",
                    border: "3px solid rgba(255,255,255,0.3)"
                  }}
                />
                <span style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}>
                  {skill.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer style={{}}></Footer> */}
      <Footer fullWidth={false} />
    </div>
  );
};

export default HomeRoute;