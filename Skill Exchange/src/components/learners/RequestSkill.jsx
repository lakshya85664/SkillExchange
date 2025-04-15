import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Container,
    Grid,
    CircularProgress,
    Alert,
    Rating
} from "@mui/material";
import Footer from "../common/Footer";
import { styled } from "@mui/system";
import UserSidebar from "../layouts/UserSidebar";

const Ribbon = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 16,
    right: -22,
    width: 113,
    backgroundColor: '#4caf50',
    color: 'white',
    textAlign: 'center',
    lineHeight: '30px',
    letterSpacing: '1px',
    transform: 'rotate(45deg)',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    '&:before, &:after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        borderTop: '10px solid #3f51b5',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent'
    },
    '&:before': {
        left: 0,
        borderLeft: '10px solid transparent'
    },
    '&:after': {
        right: 0,
        borderRight: '10px solid transparent'
    }
}));

const RequestSkill = () => {
    const [categoriesWithSkills, setCategoriesWithSkills] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        // Get current user ID from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const currentUser = JSON.parse(userData);
                if (currentUser && currentUser._id) {
                    setCurrentUserId(String(currentUser._id));
                    console.log("Current user ID set:", String(currentUser._id));
                }
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }

        const fetchCategoriesWithSkills = async () => {
            try {
                setLoading(true);
                setError(null);

                const [categoriesResponse, skillsResponse, subCategoriesResponse] = await Promise.all([
                    axios.get("/category/getallcategories"),
                    axios.get("/skill/getallskills"),
                    axios.get("/subcategory/getallsubcategories")
                ]);

                const categories = categoriesResponse.data?.data || [];
                const allSkills = skillsResponse.data?.data || [];
                const allSubCategories = subCategoriesResponse.data?.data || [];

                setSubCategories(allSubCategories);

                const groupedCategories = categories.map(category => {
                    const categorySkills = allSkills.filter(skill => {
                        const skillCategoryId = skill.categoryId?._id ?
                            skill.categoryId._id.toString() :
                            skill.categoryId?.toString();
                        const categoryId = category._id?.toString();
                        return skillCategoryId && categoryId && skillCategoryId === categoryId;
                    }).map(skill => {
                        // Find matching subcategory for the skill
                        const subCategory = allSubCategories.find(
                            sc => sc.name && skill.name &&
                                sc.name.toLowerCase() === skill.name.toLowerCase()
                        );
                        return {
                            ...skill,
                            // Use subcategory average rating if available, otherwise fall back to skill rating
                            rating: subCategory?.averageRating || skill.rating || 4.8,
                            ratingCount: subCategory?.ratingCount || 0
                        };
                    });

                    // Count unique skills
                    const uniqueSkillNames = new Set();
                    categorySkills.forEach(skill => {
                        if (skill.name) {
                            uniqueSkillNames.add(skill.name.toLowerCase());
                        }
                    });
                    const uniqueSkillCount = uniqueSkillNames.size;

                    const avgRating = categorySkills.length > 0 ?
                        (categorySkills.reduce((sum, skill) => sum + skill.rating, 0) / categorySkills.length) :
                        4.8;

                    return {
                        ...category,
                        skills: categorySkills,
                        avgRating: parseFloat(avgRating.toFixed(2)),
                        skillCount: uniqueSkillCount
                    };
                }).filter(category => category.skills.length > 0);

                setCategoriesWithSkills(groupedCategories);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.response?.data?.message || "Failed to load skills. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesWithSkills();
    }, []);

    const getUniqueSkills = (skills) => {
        const uniqueSkills = [];
        const skillNames = new Set();

        // First, find all skills that belong to the current user
        const currentUserSkills = skills.filter(skill => {
            if (!currentUserId || !skill.userId) return false;
            const skillUserId = typeof skill.userId === 'object' ?
                String(skill.userId._id) :
                String(skill.userId);
            return skillUserId === currentUserId;
        });

        // Then add all skills, prioritizing current user's skills
        skills.forEach(skill => {
            const lowerCaseName = skill.name.toLowerCase();
            if (skill.name && !skillNames.has(lowerCaseName)) {
                skillNames.add(lowerCaseName);

                // Check if there's a current user version of this skill
                const currentUserVersion = currentUserSkills.find(s =>
                    s.name.toLowerCase() === lowerCaseName);

                // If found, use that version instead
                uniqueSkills.push(currentUserVersion || skill);
            }
        });

        return uniqueSkills;
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const isCurrentUserSkill = (skill) => {
        if (!currentUserId || !skill.userId) return false;

        const skillUserId = typeof skill.userId === 'object' ?
            String(skill.userId._id) :
            String(skill.userId);

        console.log("Comparing skill user ID:", skillUserId, "with current user ID:", currentUserId);
        return skillUserId === currentUserId;
    };

    const handleSkillClick = (skill) => {
        if (isCurrentUserSkill(skill)) {
            console.log("This is the current user's skill - action prevented");
            return;
        }
        setSelectedSkill(skill);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSkill(null);
    };

    const handleConfirm = () => {
        if (selectedSkill?.name) {
            window.location.href = `/user/skillusers/${encodeURIComponent(selectedSkill.name)}`;
        }
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    return (
        <div>
            <UserSidebar />
            <Box
                sx={{
                    minHeight: "91vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f7fa",
                    padding: "40px 20px"
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            mb: 6,
                            fontSize: { xs: '1.8rem', sm: '2.2rem' }
                        }}
                    >
                        {selectedCategory ? `${selectedCategory.name} Skills` : "Browse Skills by Category"}
                    </Typography>

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={4}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    ) : selectedCategory ? (
                        <Box>
                            <Button
                                onClick={handleBackToCategories}
                                sx={{ mb: 3 }}
                            >
                                ← Back to Categories
                            </Button>
                            <Grid container spacing={4}>
                                {getUniqueSkills(selectedCategory.skills).map(skill => {
                                    const isCurrentUser = isCurrentUserSkill(skill);
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={skill._id}>
                                            <Card
                                                sx={{
                                                    padding: "24px",
                                                    minHeight: "200px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    background: isCurrentUser ? "#f5f5f5" : "#ffffff",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                    transition: "all 0.3s ease",
                                                    cursor: isCurrentUser ? "default" : "pointer",
                                                    border: "1px solid #e2e8f0",
                                                    "&:hover": {
                                                        transform: isCurrentUser ? "none" : "translateY(-5px)",
                                                        boxShadow: isCurrentUser ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 10px 15px rgba(0, 0, 0, 0.1)"
                                                    },
                                                    position: "relative",
                                                    overflow: "hidden"
                                                }}
                                                onClick={() => {
                                                    console.log("Skill clicked:", skill.name);
                                                    if (!isCurrentUser) {
                                                        handleSkillClick(skill);
                                                    }
                                                }}
                                            >
                                                {isCurrentUser && (
                                                    // <Typography 
                                                    //     variant="body2" 
                                                    //     sx={{
                                                    //         position: "absolute",
                                                    //         top: 8,
                                                    //         right: 8,
                                                    //         backgroundColor: "#4caf50",
                                                    //         color: "white",
                                                    //         padding: "4px 8px",
                                                    //         borderRadius: "12px",
                                                    //         fontSize: "0.75rem"
                                                    //     }}
                                                    // >
                                                    //     Your Skill
                                                    // </Typography>
                                                    <Ribbon>
                                                        Your Skill
                                                    </Ribbon>
                                                )}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "600",
                                                        color: "#2d3748",
                                                        mb: 1.5,
                                                        fontSize: "1.25rem"
                                                    }}
                                                >
                                                    {skill.name}
                                                </Typography>
                                                <Rating
                                                    value={skill.rating}
                                                    precision={0.1}
                                                    readOnly
                                                    sx={{
                                                        color: "#4caf50",
                                                        mb: 1.5
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#718096",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {skill.rating.toFixed(1)} average rating {skill.ratingCount > 0 && `(${skill.ratingCount} ratings)`}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    ) : categoriesWithSkills.length === 0 ? (
                        <Typography variant="body1" color="textSecondary" align="center">
                            No skills available at the moment.
                        </Typography>
                    ) : (
                        <Grid container spacing={4}>
                            {categoriesWithSkills.map(category => (
                                <Grid item xs={12} sm={6} md={4} key={category._id}>
                                    <Card
                                        sx={{
                                            padding: "24px",
                                            textAlign: "center",
                                            background: "#ffffff",
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease",
                                            cursor: "pointer",
                                            border: "1px solid #e2e8f0",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
                                            }
                                        }}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: "600",
                                                color: "#2d3748",
                                                mb: 2
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                        <Box>
                                            <Rating
                                                value={category.avgRating}
                                                precision={0.1}
                                                readOnly
                                                sx={{
                                                    color: "#4caf50",
                                                    mb: 1
                                                }}
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: "#718096",
                                                    fontWeight: "500",
                                                    mb: 2
                                                }}
                                            >
                                                {category.avgRating} average rating
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "#4caf50",
                                                    fontWeight: "600"
                                                }}
                                            >
                                                {category.skillCount} skills available
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: "12px" } }}>
                        <DialogTitle sx={{ fontWeight: "600", color: "#2d3748" }}>
                            Learn Skill
                        </DialogTitle>
                        <DialogContent>
                            <Typography>Do you want to learn "{selectedSkill?.name}"?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                sx={{
                                    color: "#718096",
                                    fontWeight: "600",
                                    "&:hover": {
                                        backgroundColor: "rgba(113, 128, 150, 0.1)"
                                    }
                                }}
                            >
                                No
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                sx={{
                                    color: "#4caf50",
                                    fontWeight: "600",
                                    "&:hover": {
                                        backgroundColor: "rgba(76, 175, 80, 0.1)"
                                    }
                                }}
                            >
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
            <Footer />
        </div>
    );
};

export default RequestSkill;