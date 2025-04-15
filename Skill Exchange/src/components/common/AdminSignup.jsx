// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const AdminSignup = () => {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

//     const submitHandler = async (data) => {
//         try {
//             data.roleId = "67c5e5f985287f45b90db131";
//             const res = await axios.post("/admin/signup", data);
//             if (res.status === 201) {
//                 toast.success('Signed Up Successfully', {
//                     position: "top-center",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: false,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                     transition: Bounce,
//                 });
//                 setTimeout(() => {
//                     navigate("/adminlogin");
//                 }, 1500);
//             }
//         } catch (err) {
//             toast.error('Admin already registered', {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce,
//             });
//         }
//     };

//     const validationSchema = {
//         nameValidator: {
//             required: {
//                 value: true,
//                 message: "Name is required*"
//             }
//         },
//         emailValidator: {
//             required: {
//                 value: true,
//                 message: "Email is required*"
//             },
//             pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                 message: "Enter valid email*"
//             }
//         },
//         passwordValidator: {
//             required: {
//                 value: true,
//                 message: "Password is required*"
//             },
//             pattern: {
//                 value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
//                 message: "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
//             }
//         },
//         confirmPasswordValidator: {
//             required: {
//                 value: true,
//                 message: "Please confirm your password*"
//             },
//             validate: (value) => 
//                 value === watch('password') || "Passwords do not match"
//         },
//         contactValidator: {
//             required: {
//                 value: true,
//                 message: "Contact is required*"
//             },
//             pattern: {
//                 value: /[6-9]{1}[0-9]{9}/,
//                 message: "Enter valid number*"
//             },
//         },
//     };

//     return (
//         <Box sx={{
//             display: 'flex',
//             minHeight: '100vh',
//             marginLeft: '400px',
//             minWidth: "50vw",
//             backgroundColor: '#f8fafc',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
//         }}>
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//                 transition={Bounce}
//             />
//             <Box sx={{
//                 width: '100%',
//                 maxWidth: '450px',
//                 margin: 'auto',
//                 padding: '2rem',
//                 backgroundColor: 'white',
//                 borderRadius: '12px',
//                 boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                     boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)'
//                 }
//             }}>
//                 <Typography variant="h4" sx={{
//                     fontWeight: 700,
//                     color: '#5e14d6',
//                     mb: 3,
//                     textAlign: 'center',
//                     lineHeight: 1.3,
//                     fontSize: { xs: '1.8rem', md: '2rem' }
//                 }}>
//                     Admin Sign Up
//                 </Typography>
//                 <Typography sx={{
//                     color: '#64748b',
//                     textAlign: 'center',
//                     mb: 4,
//                     fontSize: '1rem'
//                 }}>
//                     Create your admin account
//                 </Typography>
                
//                 <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '1.5rem'
//                 }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         <Typography component="label" sx={{
//                             fontWeight: 500,
//                             color: '#334155',
//                             fontSize: '0.95rem'
//                         }}>
//                             Username
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             placeholder="Enter your full name"
//                             {...register("adminName", validationSchema.nameValidator)}
//                             error={!!errors.adminName}
//                             helperText={errors.adminName?.message}
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '8px',
//                                     '& fieldset': {
//                                         borderColor: '#e2e8f0',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#5e14d6',
//                                     },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     padding: '12px 14px',
//                                 }
//                             }}
//                         />
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         <Typography component="label" sx={{
//                             fontWeight: 500,
//                             color: '#334155',
//                             fontSize: '0.95rem'
//                         }}>
//                             Email
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             placeholder="Enter email"
//                             {...register("email", validationSchema.emailValidator)}
//                             error={!!errors.email}
//                             helperText={errors.email?.message}
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '8px',
//                                     '& fieldset': {
//                                         borderColor: '#e2e8f0',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#5e14d6',
//                                     },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     padding: '12px 14px',
//                                 }
//                             }}
//                         />
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         <Typography component="label" sx={{
//                             fontWeight: 500,
//                             color: '#334155',
//                             fontSize: '0.95rem'
//                         }}>
//                             Password
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             type={showPassword ? "text" : "password"}
//                             variant="outlined"
//                             placeholder="Enter a Password"
//                             {...register("password", validationSchema.passwordValidator)}
//                             error={!!errors.password}
//                             helperText={errors.password?.message}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '8px',
//                                     '& fieldset': {
//                                         borderColor: '#e2e8f0',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#5e14d6',
//                                     },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     padding: '12px 14px',
//                                 }
//                             }}
//                         />
//                     </Box>

//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         <Typography component="label" sx={{
//                             fontWeight: 500,
//                             color: '#334155',
//                             fontSize: '0.95rem'
//                         }}>
//                             Confirm Password
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             type={showConfirmPassword ? "text" : "password"}
//                             variant="outlined"
//                             placeholder="Confirm your password"
//                             {...register("confirmPassword", validationSchema.confirmPasswordValidator)}
//                             error={!!errors.confirmPassword}
//                             helperText={errors.confirmPassword?.message}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle confirm password visibility"
//                                             onClick={handleClickShowConfirmPassword}
//                                             edge="end"
//                                         >
//                                             {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '8px',
//                                     '& fieldset': {
//                                         borderColor: '#e2e8f0',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#5e14d6',
//                                     },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     padding: '12px 14px',
//                                 }
//                             }}
//                         />
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                         <Typography component="label" sx={{
//                             fontWeight: 500,
//                             color: '#334155',
//                             fontSize: '0.95rem'
//                         }}>
//                             Contact Details
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             type="tel"
//                             variant="outlined"
//                             placeholder="Enter your contact no"
//                             inputProps={{ maxLength: 10 }}
//                             {...register("contact", validationSchema.contactValidator)}
//                             error={!!errors.contact}
//                             helperText={errors.contact?.message}
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '8px',
//                                     '& fieldset': {
//                                         borderColor: '#e2e8f0',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderColor: '#5e14d6',
//                                     },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     padding: '12px 14px',
//                                 }
//                             }}
//                         />
//                     </Box>
                    
//                     <Button 
//                         type="submit"
//                         variant="contained"
//                         sx={{
//                             backgroundColor: '#5e14d6',
//                             color: 'white',
//                             padding: '12px',
//                             borderRadius: '8px',
//                             fontWeight: 600,
//                             fontSize: '1rem',
//                             textTransform: 'none',
//                             '&:hover': {
//                                 backgroundColor: '#4a0fb5',
//                                 transform: 'translateY(-2px)'
//                             },
//                             transition: 'all 0.2s ease',
//                             mt: 1
//                         }}
//                     >
//                         Sign Up
//                     </Button>
                    
//                     <Box sx={{ textAlign: 'center', mt: 2 }}>
//                         <Typography component="span" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
//                             Already Registered?
//                         </Typography>
//                         <Typography 
//                             component="a" 
//                             href="/adminlogin"
//                             sx={{
//                                 color: '#5e14d6',
//                                 textDecoration: 'none',
//                                 fontWeight: 500,
//                                 ml: 1,
//                                 '&:hover': {
//                                     textDecoration: 'underline'
//                                 }
//                             }}
//                         >
//                             Login
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default AdminSignup;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AdminSignup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const submitHandler = async (data) => {
        try {
            data.roleId = "67c5e5f985287f45b90db131";
            const res = await axios.post("/admin/signup", data);
            if (res.status === 201) {
                toast.success('Signed Up Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/adminlogin");
                }, 1500);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Admin already registered', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const validationSchema = {
        nameValidator: {
            required: {
                value: true,
                message: "Name is required*"
            }
        },
        emailValidator: {
            required: {
                value: true,
                message: "Email is required*"
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter valid email*"
            }
        },
        passwordValidator: {
            required: {
                value: true,
                message: "Password is required*"
            },
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
            }
        },
        confirmPasswordValidator: {
            required: {
                value: true,
                message: "Please confirm your password*"
            },
            validate: (value) => 
                value === watch('password') || "Passwords do not match"
        },
        contactValidator: {
            required: {
                value: true,
                message: "Contact is required*"
            },
            pattern: {
                value: /[6-9]{1}[0-9]{9}/,
                message: "Enter valid 10-digit number*"
            },
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            minWidth:'99vw',
            backgroundColor: '#f8fafc',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            p: { xs: 2, sm: 3 }
        }}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <Box sx={{
                width: '100%',
                maxWidth: '450px',
                margin: 'auto',
                padding: { xs: '1.5rem', sm: '2rem' },
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)'
                }
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 700,
                    color: '#5e14d6',
                    mb: 3,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}>
                    Admin Sign Up
                </Typography>
                <Typography sx={{
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                    Create your admin account
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' }
                        }}>
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your full name"
                            {...register("adminName", validationSchema.nameValidator)}
                            error={!!errors.adminName}
                            helperText={errors.adminName?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e2e8f0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#5e14d6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px 12px', sm: '12px 14px' },
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    mx: 0
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' }
                        }}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter email"
                            {...register("email", validationSchema.emailValidator)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e2e8f0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#5e14d6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px 12px', sm: '12px 14px' },
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    mx: 0
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' }
                        }}>
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Enter a Password"
                            {...register("password", validationSchema.passwordValidator)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e2e8f0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#5e14d6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px 12px', sm: '12px 14px' },
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    mx: 0
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' }
                        }}>
                            Confirm Password
                        </Typography>
                        <TextField
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", validationSchema.confirmPasswordValidator)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e2e8f0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#5e14d6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px 12px', sm: '12px 14px' },
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    mx: 0
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: { xs: '0.9rem', sm: '0.95rem' }
                        }}>
                            Contact Details
                        </Typography>
                        <TextField
                            fullWidth
                            type="tel"
                            variant="outlined"
                            placeholder="Enter your contact no"
                            inputProps={{ maxLength: 10 }}
                            {...register("contact", validationSchema.contactValidator)}
                            error={!!errors.contact}
                            helperText={errors.contact?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#e2e8f0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#5e14d6',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    padding: { xs: '10px 12px', sm: '12px 14px' },
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                    mx: 0
                                }
                            }}
                        />
                    </Box>
                    
                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#5e14d6',
                            color: 'white',
                            padding: { xs: '10px', sm: '12px' },
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#4a0fb5',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.2s ease',
                            mt: 1
                        }}
                    >
                        Sign Up
                    </Button>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography component="span" sx={{ 
                            color: '#64748b', 
                            fontSize: { xs: '0.85rem', sm: '0.95rem' } 
                        }}>
                            Already Registered?
                        </Typography>
                        <Typography 
                            component="a" 
                            href="/adminlogin"
                            sx={{
                                color: '#5e14d6',
                                textDecoration: 'none',
                                fontWeight: 500,
                                ml: 1,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Login
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSignup;