// import React from "react";
// import { Container, Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";
// import { Fade, Zoom } from "react-awesome-reveal";
// import UserSidebar from "../layouts/UserSidebar";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";

// // Import images for features (you'll need to add these images to your project)
// import skillExchangeImg from "../../assets/images/skillexchange.jpg";
// import smartMatchingImg from "../../assets/images/smartmatching.jpg";
// import liveInteractionImg from "../../assets/images/liveinteraction.jpg";
// import feedbackImg from "../../assets/images/feedback.jpg";
// import communityImg from "../../assets/images/community.jpg";
// import futureImg from "../../assets/images/future.jpg";

// const AboutUs = () => {
//     const navigate = useNavigate();
//     return (
//         <Box sx={{ 
//             backgroundColor: "#f8fafc", 
//             minHeight: "100vh",
//             display: "flex",
//             flexDirection: "column"
//         }}>
//             <UserSidebar />
//             <Container maxWidth="lg" sx={{ 
//                 mt: 6, 
//                 mb: 4, 
//                 textAlign: "center",
//                 flex: 1
//             }}>
//                 {/* Header Section */}
//                 <Fade top>
//                     <Typography variant="h3" fontWeight="bold" sx={{ 
//                         mb: 2, 
//                         color: "#2563eb",
//                         fontSize: { xs: '2rem', md: '3rem' }
//                     }}>
//                         Welcome to SkillExchange!
//                     </Typography>
//                 </Fade>

//                 <Zoom>
//                     <Typography variant="h6" sx={{ 
//                         color: "#64748b", 
//                         mb: 6,
//                         fontSize: { xs: '1rem', md: '1.25rem' },
//                         maxWidth: "800px",
//                         mx: "auto",
//                         lineHeight: 1.6
//                     }}>
//                         A collaborative learning platform where users connect, share expertise, and grow together.
//                     </Typography>
//                 </Zoom>

//                 {/* Core Features Section */}
//                 <Grid container spacing={4} justifyContent="center">
//                     {features.map((feature, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                             <Fade bottom delay={index * 80}>
//                                 <Card sx={{ 
//                                     width:"300px",
//                                     height: "100%",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     borderRadius: "12px",
//                                     boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                                     transition: "all 0.3s ease",
//                                     "&:hover": {
//                                         transform: "translateY(-8px)",
//                                         boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
//                                     }
//                                 }}>
//                                     <Box sx={{
//                                         height: "232px",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         backgroundColor: "#f1f5f9",
//                                         overflow: "hidden"
//                                     }}>
//                                         <img 
//                                             src={feature.image} 
//                                             alt={feature.title} 
//                                             style={{ 
//                                                 width: "100%", 
//                                                 height: "100%",
//                                                 objectFit: "cover",
//                                                 objectPosition: "center"
//                                             }} 
//                                         />
//                                     </Box>
//                                     <CardContent sx={{ flexGrow: 1 }}>
//                                         <Typography variant="h5" fontWeight="bold" sx={{ 
//                                             mb: 2,
//                                             color: "#1e293b"
//                                         }}>
//                                             {feature.title}
//                                         </Typography>
//                                         <Typography sx={{ 
//                                             color: "#64748b",
//                                             lineHeight: 1.6
//                                         }}>
//                                             {feature.description}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Fade>
//                         </Grid>
//                     ))}
//                 </Grid>

//                 {/* Mission Statement */}
//                 <Fade bottom>
//                     <Box sx={{ 
//                         backgroundColor: "#ffffff",
//                         borderRadius: "12px",
//                         boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                         p: 4,
//                         mt: 8,
//                         mb: 6,
//                         maxWidth: "900px",
//                         mx: "auto"
//                     }}>
//                         <Typography variant="h4" fontWeight="bold" sx={{ 
//                             mb: 3,
//                             color: "#2563eb",
//                             fontSize: { xs: '1.8rem', md: '2.2rem' }
//                         }}>
//                             Our Mission
//                         </Typography>
//                         <Typography variant="h6" sx={{ 
//                             color: "#64748b",
//                             lineHeight: 1.8,
//                             fontSize: { xs: '1rem', md: '1.1rem' }
//                         }}>
//                             Our goal is to democratize learning by fostering a culture of knowledge-sharing, 
//                             allowing individuals to enhance their skills in an affordable and accessible manner.
//                         </Typography>
//                     </Box>
//                 </Fade>

//                 {/* Call to Action */}
//                 <Fade bottom>
//                     <Button 
//                         variant="contained" 
//                         sx={{ 
//                             mt: 3, 
//                             mb: 6,
//                             backgroundColor: "#2563eb",
//                             fontSize: "1rem",
//                             px: 4,
//                             py: 1.5,
//                             borderRadius: "8px",
//                             textTransform: "none",
//                             fontWeight: "600",
//                             "&:hover": {
//                                 backgroundColor: "#1d4ed8",
//                                 transform: "translateY(-2px)"
//                             },
//                             transition: "all 0.2s ease"
//                         }} 
//                         onClick={() => navigate("/signup")}
//                     >
//                         Join Now & Start Learning!
//                     </Button>
//                 </Fade>
//             </Container>
//             <Footer />
//         </Box>
//     );
// };

// // Features Array with images
// const features = [
//     { 
//         title: "Skill Exchange", 
//         description: "Offer and learn skills from others through a mutual exchange system.",
//         image: skillExchangeImg
//     },
//     { 
//         title: "Smart Matching", 
//         description: "Find the best skill partners based on preferences and availability.",
//         image: smartMatchingImg
//     },
//     { 
//         title: "Live Interaction", 
//         description: "Use integrated chat and video conferencing for seamless learning.",
//         image: liveInteractionImg
//     },
//     { 
//         title: "Feedback & Ratings", 
//         description: "Rate and review sessions to enhance the learning experience.",
//         image: feedbackImg
//     },
//     { 
//         title: "Community Growth", 
//         description: "Join a thriving community of learners and experts worldwide.",
//         image: communityImg
//     },
//     { 
//         title: "Future Expansion", 
//         description: "Gamification, AI recommendations, and certification support.",
//         image: futureImg
//     },
// ];

// export default AboutUs;

import React, { useState } from "react";
import { 
    Container, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    Button, 
    Box,
    CardActionArea,
    Chip,
    IconButton
} from "@mui/material";
import UserSidebar from "../layouts/UserSidebar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import {
    PeopleAlt,
    SwapHoriz,
    ConnectWithoutContact,
    Videocam,
    RateReview,
    Public
} from "@mui/icons-material";

// Import images for features
import skillExchangeImg from "../../assets/images/skillexchange.jpg";
import smartMatchingImg from "../../assets/images/smartmatching.jpg";
import liveInteractionImg from "../../assets/images/liveinteraction.jpg";
import feedbackImg from "../../assets/images/feedback.jpg";
import communityImg from "../../assets/images/community.jpg";
import futureImg from "../../assets/images/future.jpg";

const AboutUs = () => {
    const navigate = useNavigate();
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCardExpand = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <Box sx={{ 
            backgroundColor: "#f8fafc", 
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <UserSidebar />
            <Container maxWidth="lg" sx={{ 
                mt: 6, 
                mb: 4, 
                textAlign: "center",
                flex: 1
            }}>
                {/* Header Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" fontWeight="bold" sx={{ 
                        mb: 2, 
                        color: "#2563eb",
                        fontSize: { xs: '2rem', md: '3rem' },
                        position: 'relative',
                        display: 'inline-block',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '50%',
                            height: '4px',
                            bottom: '-10px',
                            left: '25%',
                            backgroundColor: '#2563eb',
                            borderRadius: '2px'
                        }
                    }}>
                        Welcome to SkillExchange!
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: "#64748b", 
                        mt: 4,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        maxWidth: "800px",
                        mx: "auto",
                        lineHeight: 1.6
                    }}>
                        A collaborative learning platform where users connect, share expertise, and grow together.
                    </Typography>
                </Box>

                {/* Core Features Section */}
                <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    width: "100%",
                                    height: expandedCard === index ? "auto" : "400px",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    // transition: "all 0.3s ease",
                                    position: 'relative',
                                    overflow: 'hidden',
                                    "&:hover": {
                                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                        transform: "translateY(-5px)"
                                    }
                                }}
                            >
                                <CardActionArea 
                                    onClick={() => toggleCardExpand(index)}
                                    sx={{ height: "100%" }}
                                >
                                    <Box sx={{
                                        height: expandedCard === index ? "150px" : "200px",
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <img 
                                            src={feature.image} 
                                            alt={feature.title} 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: 'all 0.3s ease',
                                                transform: expandedCard === index ? 'scale(1.1)' : 'scale(1)'
                                            }} 
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {feature.icon}
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ 
                                        position: 'relative',
                                        zIndex: 1,
                                        backgroundColor: 'white'
                                    }}>
                                        <Typography variant="h5" fontWeight="bold" sx={{ 
                                            mb: 2,
                                            color: "#1e293b",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: "#64748b",
                                            lineHeight: 1.6,
                                            mb: 2,
                                            display: '-webkit-box',
                                            WebkitLineClamp: expandedCard === index ? 'unset' : 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {feature.description}
                                        </Typography>
                                        {expandedCard === index && feature.details && (
                                            <Box sx={{ 
                                                mt: 2,
                                                textAlign: 'left',
                                                borderTop: '1px solid #e2e8f0',
                                                pt: 2
                                            }}>
                                                <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                                    <strong>How it works:</strong> {feature.details}
                                                </Typography>
                                                {feature.benefits && (
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                                            <strong>Benefits:</strong>
                                                        </Typography>
                                                        <ul style={{ 
                                                            paddingLeft: '20px',
                                                            margin: 0,
                                                            color: '#475569'
                                                        }}>
                                                            {feature.benefits.map((benefit, i) => (
                                                                <li key={i}>{benefit}</li>
                                                            ))}
                                                        </ul>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                        <Chip 
                                            label={expandedCard === index ? "Show Less" : "Learn More"} 
                                            size="small"
                                            sx={{ 
                                                mt: 1,
                                                backgroundColor: expandedCard === index ? '#e2e8f0' : '#2563eb',
                                                color: expandedCard === index ? '#475569' : 'white',
                                                '&:hover': {
                                                    backgroundColor: expandedCard === index ? '#cbd5e1' : '#1d4ed8'
                                                }
                                            }}
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Mission Statement */}
                <Box sx={{ 
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    p: 4,
                    mb: 6,
                    maxWidth: "900px",
                    mx: "auto",
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '5px',
                        height: '100%',
                        backgroundColor: '#2563eb'
                    }
                }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ 
                        mb: 3,
                        color: "#2563eb",
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <PeopleAlt sx={{ mr: 2, fontSize: '2rem' }} />
                        Our Mission
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: "#64748b",
                        lineHeight: 1.8,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        position: 'relative'
                    }}>
                        Our goal is to democratize learning by fostering a culture of knowledge-sharing, 
                        allowing individuals to enhance their skills in an affordable and accessible manner.
                    </Typography>
                </Box>

                {/* Call to Action */}
                <Box sx={{ 
                    mt: 3, 
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: "#2563eb",
                            fontSize: "1rem",
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: "600",
                            mb: 2,
                            "&:hover": {
                                backgroundColor: "#1d4ed8",
                                transform: "translateY(-2px)",
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                            },
                            transition: "all 0.2s ease"
                        }} 
                        onClick={() => navigate("/signup")}
                    >
                        Join Now & Start Learning!
                    </Button>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Already have an account? 
                        <Button 
                            onClick={() => navigate("/login")}
                            sx={{ 
                                color: '#2563eb',
                                textTransform: 'none',
                                fontWeight: '600',
                                ml: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                                }
                            }}
                        >
                            LogIn
                        </Button>
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

// Features Array with enhanced data
const features = [
    { 
        title: "Skill Exchange", 
        description: "Offer and learn skills from others through our innovative mutual exchange system.",
        details: "List skills you can teach and browse skills you want to learn. Connect with partners for 1:1 skill swaps.",
        benefits: [
            "No monetary cost - trade skills instead",
            "Learn at your own pace",
            "Build meaningful connections"
        ],
        image: skillExchangeImg,
        icon: <SwapHoriz color="primary" />
    },
    { 
        title: "Smart Matching", 
        description: "Our algorithm finds the perfect skill partners based on your preferences and availability.",
        details: "We consider skill level, location, schedule, and learning style to make the best matches.",
        benefits: [
            "Save time finding the right partner",
            "Higher success rate for skill exchanges",
            "Personalized recommendations"
        ],
        image: smartMatchingImg,
        icon: <ConnectWithoutContact color="primary" />
    },
    { 
        title: "Live Interaction", 
        description: "Integrated chat and video conferencing(to be added soon) tools make learning seamless and interactive.",
        details: "Schedule sessions, share materials, and communicate directly through our platform.",
        benefits: [
            "Real-time feedback and guidance",
            "Screen sharing capabilities",
            "Session recording options"
        ],
        image: liveInteractionImg,
        icon: <Videocam color="primary" />
    },
    { 
        title: "Feedback System", 
        description: "Rate and review sessions to maintain quality and enhance the learning experience.",
        details: "After each session, both partners provide feedback to help improve future exchanges.",
        benefits: [
            "Maintain high-quality exchanges",
            "Build your reputation as a teacher/learner",
            "Help others find great partners"
        ],
        image: feedbackImg,
        icon: <RateReview color="primary" />
    },
    { 
        title: "Community", 
        description: "Join a thriving global community of learners and experts in various fields.",
        details: "Participate in forums, group learning sessions, and community events.",
        benefits: [
            "Network with like-minded individuals",
            "Join specialized interest groups",
            "Attend workshops and webinars"
        ],
        image: communityImg,
        icon: <Public color="primary" />
    },
    { 
        title: "Future Features", 
        description: "We're constantly innovating to bring you the best learning experience.",
        details: "Coming soon: Gamification, AI recommendations, and certification support.",
        benefits: [
            "Earn badges for achievements",
            "Get personalized learning paths",
            "Showcase verified skills"
        ],
        image: futureImg,
        icon: <PeopleAlt color="primary" />
    },
];

export default AboutUs;