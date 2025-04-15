import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageSkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/skill/getallskills");
        if (response.data && response.data.data) {
          // Group skills by name and collect users
          const skillsMap = new Map();
          
          response.data.data.forEach(skill => {
            if (!skillsMap.has(skill.name)) {
              skillsMap.set(skill.name, {
                name: skill.name,
                category: skill.categoryId?.name || 'Uncategorized',
                users: []
              });
            }
            if (skill.userId) {
              skillsMap.get(skill.name).users.push({
                id: skill.userId._id,
                name: skill.userId.userName,
                email: skill.userId.email,
                profilePic: skill.userId.profilePic
              });
            }
          });
          
          setSkills(Array.from(skillsMap.values()));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleDeleteSkill = async (skillName, userId) => {
    try {
      await axios.delete(`/skill/deleteskillbyuser/${userId}/${skillName}`);
      // Refresh the skills list after deletion
      const response = await axios.get("/skill/getallskills");
      if (response.data && response.data.data) {
        const skillsMap = new Map();
        
        response.data.data.forEach(skill => {
          if (!skillsMap.has(skill.name)) {
            skillsMap.set(skill.name, {
              name: skill.name,
              category: skill.categoryId?.name || 'Uncategorized',
              users: []
            });
          }
          if (skill.userId) {
            skillsMap.get(skill.name).users.push({
              id: skill.userId._id,
              name: skill.userId.userName,
              email: skill.userId.email,
              profilePic: skill.userId.profilePic
            });
          }
        });
        
        setSkills(Array.from(skillsMap.values()));
      }
    } catch (err) {
      console.error("Error deleting skill:", err);
      setError("Failed to delete skill. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        Manage Skills
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Total Unique Skills: {skills.length}
        </Typography>
        
        {skills.length === 0 ? (
          <Typography>No skills found.</Typography>
        ) : (
          <Box>
            {skills.map((skill, index) => (
              <Accordion 
                key={index} 
                expanded={expanded === `panel${index}`} 
                onChange={handleChange(`panel${index}`)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ flex: 1, fontWeight: 'bold' }}>
                      {skill.name}
                    </Typography>
                    <Chip 
                      label={skill.category} 
                      color="secondary" 
                      size="small" 
                      sx={{ mr: 2 }} 
                    />
                    <Chip 
                      label={`${skill.users.length} user(s)`} 
                      color="primary" 
                      size="small" 
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  {skill.users.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {skill.users.map((user, userIndex) => (
                            <TableRow key={userIndex}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar 
                                    src={`http://localhost:3000/${user.profilePic}` || "https://via.placeholder.com/150"} 
                                    alt={user.name}
                                    sx={{ width: 30, height: 30, mr: 2 }}
                                  />
                                  <Typography>{user.name}</Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell align="right">
                                <Button 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleDeleteSkill(skill.name, user.id)}
                                >
                                  Remove
                                </Button>
                                <Button 
                                  size="small" 
                                  color="primary"
                                  sx={{ ml: 1 }}
                                  onClick={() => navigate(`/admin/userdetails/${user.id}`)}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No users associated with this skill.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ManageSkills;