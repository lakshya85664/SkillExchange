// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "../../../assets/mainsection.css"; // Import the CSS file
// import Image from "../images/5484597.jpg";
// import Image2 from "../images/3026173.jpg";
// import Image3 from "../images/7233228.jpg";
// import Image4 from "../images/10951137.jpg";

// const imageList = [Image, Image2, Image3, Image4];

// const MainSection= () => {
//   return (
//     <section className="main-section">
//       <div className="carousel-container">
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop={true}
//         >
//           {imageList.map((image, index) => (
//             <SwiperSlide key={index}>
//               <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <div className="text-content">
//         <h2>Skill Sharing, Collaboration, and Learning</h2>
//         <p>
//           The Skill Exchange platform aims to democratize learning by fostering a 
//           culture of knowledge-sharing, enabling users to grow together and achieve 
//           their personal and professional goals.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default MainSection;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "../images/5484597.jpg";
import Image2 from "../images/3026173.jpg";
import Image3 from "../images/7233228.jpg";
import Image4 from "../images/10951137.jpg";

const imageList = [Image, Image2, Image3, Image4];

const MainSection = () => {
  return (
    <div style={{
      width: "99vw",
      padding: "80px 20px",
      backgroundColor: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "80px"
    }}>
      <div style={{
        width: "400px",
        height: "400px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
      }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          {imageList.map((image, index) => (
            <SwiperSlide key={index}>
              <img 
                src={image} 
                alt={`Slide ${index + 1}`} 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div style={{
        maxWidth: "600px",
        padding: "0 20px"
      }}>
        <h2 style={{
          fontSize: "2.3rem",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#2A5CAA",
          lineHeight: "1.3"
        }}>
          Skill Sharing, Collaboration, and Learning
        </h2>
        <p style={{
          fontSize: "1.1rem",
          color: "#555",
          lineHeight: "1.7"
        }}>
          The Skill Exchange platform aims to democratize learning by fostering a 
          culture of knowledge-sharing, enabling users to grow together and achieve 
          their personal and professional goals.
        </p>
      </div>
    </div>
  );
};

export default MainSection;