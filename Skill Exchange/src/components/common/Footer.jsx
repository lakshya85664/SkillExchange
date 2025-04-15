// // // import React from "react";
// // // import "../../assets/footer.css";
// // // import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// // // const Footer = () => {
// // //   return (
// // //     <footer className="footer">
// // //       <div className="containerf">
// // //         <div className="footer-content">
// // //           {/* Left Section - About */}
// // //           <div className="footer-section about">
// // //             <h2>SkillExchange</h2>
// // //             <p>
// // //               Empowering individuals by exchanging knowledge and learning new
// // //               skills. Connect, learn, and grow with experts from various fields.
// // //             </p>
// // //           </div>

// // //           {/* Middle Section - Quick Links */}
// // //           <div className="footer-section links">
// // //             <h2>Quick Links</h2>
// // //             <ul>
// // //               <li><a href="/aboutus">About Us</a></li>
// // //               <li><a href="/requestskill">Skills</a></li>
// // //               {/* <li><a href="/request-skill">Request a Skill</a></li> */}
// // //               <li><a href="/contact">Contact</a></li>
// // //             </ul>
// // //           </div>

// // //           {/* Right Section - Contact & Socials */}
// // //           <div className="footer-section contact">
// // //             <h2>Contact</h2>
// // //             <p>Email: support@skillexchange.com</p>
// // //             <p>Phone: +(91) 36545 6789</p>
// // //             <div className="social-icons">
// // //               <a href="#"><FaFacebook /></a>
// // //               <a href="#"><FaTwitter /></a>
// // //               <a href="#"><FaInstagram /></a>
// // //               <a href="#"><FaLinkedin /></a>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Bottom Section */}
// // //         <div className="footer-bottom" >
// // //           <p style={{color:"#9e9e9e"}}>&copy; 2025 SkillExchange. All rights reserved.</p>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // };

// // // export default Footer;

// // import React from "react";
// // import "../../assets/footer.css";
// // import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// // const Footer = () => {
// //   return (
// //     <footer className="footer">
// //       <div className="containerf">
// //         <div className="footer-content">
// //           {/* Left Section - About */}
// //           <div className="footer-section about">
// //             <h2>SkillExchange</h2>
// //             <p>
// //               Empowering individuals by exchanging knowledge and learning new
// //               skills. Connect, learn, and grow with experts from various fields.
// //             </p>
// //           </div>

// //           {/* Middle Section - Quick Links */}
// //           <div className="footer-section links">
// //             <h2>Quick Links</h2>
// //             <ul>
// //               <li><a href="/aboutus">About Us</a></li>
// //               <li><a href="/requestskill">Skills</a></li>
// //               <li><a href="/contact">Contact</a></li>
// //             </ul>
// //           </div>

// //           {/* Right Section - Contact & Socials */}
// //           <div className="footer-section contact">
// //             <h2>Contact</h2>
// //             <p>Email: support@skillexchange.com</p>
// //             <p>Phone: +(91) 36545 6789</p>
// //             <div className="social-icons">
// //               <a href="#" aria-label="Facebook"><FaFacebook /></a>
// //               <a href="#" aria-label="Twitter"><FaTwitter /></a>
// //               <a href="#" aria-label="Instagram"><FaInstagram /></a>
// //               <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Section */}
// //         <div className="footer-bottom">
// //           <p>&copy; 2025 SkillExchange. All rights reserved.</p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import React from "react";
// import "../../assets/footer.css";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-content">
//           {/* Left Section - About */}
//           <div className="footer-section about">
//             <h2>SkillExchange</h2>
//             <p>
//               Empowering individuals by exchanging knowledge and learning new
//               skills. Connect, learn, and grow with experts from various fields.
//             </p>
//           </div>

//           {/* Middle Section - Quick Links */}
//           <div className="footer-section links">
//             <h2>Quick Links</h2>
//             <ul>
//               <li><a href="/aboutus">About Us</a></li>
//               <li><a href="/requestskill">Skills</a></li>
//               <li><a href="/contact">Contact</a></li>
//             </ul>
//           </div>

//           {/* Right Section - Contact & Socials */}
//           <div className="footer-section contact">
//             <h2>Contact</h2>
//             <p>Email: support@skillexchange.com</p>
//             <p>Phone: +(91) 36545 6789</p>
//             <div className="social-icons">
//               <a href="#" aria-label="Facebook"><FaFacebook /></a>
//               <a href="#" aria-label="Twitter"><FaTwitter /></a>
//               <a href="#" aria-label="Instagram"><FaInstagram /></a>
//               <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="footer-bottom">
//           <p>&copy; 2025 SkillExchange. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = ({ fullWidth = true }) => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #01579b, #0d47a1)',
      color: '#fff',
      padding: '40px 0 0',
      fontFamily: '"Arial", sans-serif',
      // width: '100vw',
      // marginLeft: 'calc(-50vw + 50%)',
      width: fullWidth ? '100vw' : '100%',
      marginLeft: fullWidth ? 'calc(-50vw + 50%)' : 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '30px'
        }}>
          {/* Left Section - About */}
          <div style={{
            flex: 1,
            minWidth: '250px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '20px',
              marginBottom: '15px',
              color: '#f1c40f',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              SkillExchange
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#f1c40f'
              }}></span>
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#bbb',
              lineHeight: '1.6'
            }}>
              Empowering individuals by exchanging knowledge and learning new
              skills. Connect, learn, and grow with experts from various fields.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div style={{
            flex: 1,
            minWidth: '250px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '20px',
              marginBottom: '15px',
              color: '#f1c40f',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              Quick Links
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#f1c40f'
              }}></span>
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              fontSize: '14px',
              color: '#bbb',
              lineHeight: '1.6'
            }}>
              <li style={{ margin: '10px 0' }}>
                <a href="/aboutus" style={{
                  textDecoration: 'none',
                  color: '#bbb',
                  transition: '0.3s',
                  display: 'inline-block'
                }}>About Us</a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="/requestskill" style={{
                  textDecoration: 'none',
                  color: '#bbb',
                  transition: '0.3s',
                  display: 'inline-block'
                }}>Skills</a>
              </li>
              <li style={{ margin: '10px 0' }}>
                <a href="/contact" style={{
                  textDecoration: 'none',
                  color: '#bbb',
                  transition: '0.3s',
                  display: 'inline-block'
                }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact & Socials */}
          <div style={{
            flex: 1,
            minWidth: '250px',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '20px',
              marginBottom: '15px',
              color: '#f1c40f',
              position: 'relative',
              paddingBottom: '8px'
            }}>
              Contact
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#f1c40f'
              }}></span>
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#bbb',
              lineHeight: '1.6'
            }}>Email: support@skillexchange.com</p>
            <p style={{
              fontSize: '14px',
              color: '#bbb',
              lineHeight: '1.6'
            }}>Phone: +(91) 36545 6789</p>
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '15px'
            }}>
              <a href="#" aria-label="Facebook" style={{
                color: '#bbb',
                fontSize: '20px',
                transition: '0.3s'
              }}><FaFacebook /></a>
              <a href="#" aria-label="Twitter" style={{
                color: '#bbb',
                fontSize: '20px',
                transition: '0.3s'
              }}><FaTwitter /></a>
              <a href="#" aria-label="Instagram" style={{
                color: '#bbb',
                fontSize: '20px',
                transition: '0.3s'
              }}><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" style={{
                color: '#bbb',
                fontSize: '20px',
                transition: '0.3s'
              }}><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          color: '#bdbdbd',
          textAlign: 'center',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #757575',
          fontSize: '14px',
          width: '100vw',
          marginLeft: 'calc(-51vw + 50%)',
          padding: '20px 0'
        }}>
          <p>&copy; 2025 SkillExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;