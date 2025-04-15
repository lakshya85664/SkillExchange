// // import React from 'react'
// // import { useForm } from 'react-hook-form'
// // import '../../assets/login.css'
// // import axios from 'axios';
// // import { Bounce, toast, ToastContainer } from 'react-toastify';
// // import { useNavigate } from 'react-router-dom';

// // const Signup = () => {
// //   const { register, handleSubmit, formState: { errors } } = useForm();
// //   console.log("error", errors);

// //   const navigate = useNavigate();

// //   const submitHandler = async (data) => {
// //     try {
// //       console.log(data)
// //       data.roleId = "67c5e5d985287f45b90db12f"
// //       const res = await axios.post("/users/users", data);
// //       console.log(res);
// //       console.log(res.data);
// //       if (res.status === 201) {
// //         toast.success('Signed Up Successfully', {
// //           position: "top-center",
// //           autoClose: 2000,
// //           hideProgressBar: false,
// //           closeOnClick: false,
// //           pauseOnHover: true,
// //           draggable: true,
// //           progress: undefined,
// //           theme: "dark",
// //           transition: Bounce,
// //         });
// //         setTimeout(() => {
// //           navigate("/login")
// //         }, 1500);
// //       }
// //     } catch (err) {
// //       toast.error('User already registered', {
// //         position: "top-center",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: false,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //         theme: "dark",
// //         transition: Bounce,
// //       });
// //     }
// //   };

// //   const validationSchema = {
// //     nameValidator: {
// //       required: {
// //         value: true,
// //         message: "Name is required*"
// //       }
// //     },
// //     emailValidator: {
// //       required: {
// //         value: true,
// //         message: "Email is required*"
// //       },
// //       pattern: {
// //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
// //         message: "Enter valid email*"
// //       }
// //     },
// //     passwordValidator: {
// //       required: {
// //         value: true,
// //         message: "Password is required*"
// //       },
// //       pattern: {
// //         value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
// //         message: "Enter valid password*"
// //       }
// //     },
// //     contactValidator: {
// //       required: {
// //         value: true,
// //         message: "Contact is required*"
// //       },
// //       pattern: {
// //         value: /[6-9]{1}[0-9]{9}/,
// //         message: "Enter valid number*"
// //       },
// //     },
// //   }

// //   return (
// //     <div id='body'>
// //       <ToastContainer
// //         position="top-center"
// //         autoClose={2000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick={false}
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="dark"
// //         transition={Bounce}
// //       />
// //       <h2 id='h2'>Sign up and start learning <br /> and exploring new skills!</h2><br />
// //       <form onSubmit={handleSubmit(submitHandler)}>
// //         <div>
// //           <label id='name'>Username</label><br />
// //           <input id='inp-email' type='text' placeholder='Enter your full name' {...register("userName", validationSchema.nameValidator)}></input><br />
// //           <span id='err3' style={{ color: 'red' }}>
// //             {
// //               errors.userName?.message
// //             }
// //           </span>
// //         </div>
// //         <div>
// //           <label id='log-inp'>Email</label><br />
// //           <input type='text' id='inp-email' placeholder='Enter email' {...register("email", validationSchema.emailValidator)}></input><br />
// //           <span id='err1'>
// //             {
// //               errors.email?.message
// //             }
// //           </span>
// //         </div>
// //         <div>
// //           <label id='sign-inp'>Password</label><br />
// //           <input type='password' id='inp-pass' placeholder='Enter a Password' {...register("password", validationSchema.passwordValidator)}></input><br />
// //           <span id='err2'>
// //             {
// //               errors.password?.message
// //             }
// //           </span>
// //         </div>
// //         <div>
// //           <label id='contact'>Contact Details</label><br />
// //           <input id='inp-email' type="contact" maxLength={10} placeholder='Enter your contact no' {...register("contact", validationSchema.contactValidator)} /><br />
// //           <span id='err4' style={{ color: 'red' }}>
// //             {
// //               errors.contact?.message
// //             }
// //           </span>
// //         </div>
// //         <div>
// //           <input id='btn' type="submit" value="Sign Up" />
// //         </div>
// //         <div id='last'>
// //           <span id='new1'>Already Registered?</span>
// //           <a href="/login">Login</a>
// //         </div>
// //       </form><br /><br /><br /><br />
// //     </div>
// //   )
// // }

// // export default Signup

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { Box, Typography, TextField, Button } from '@mui/material';

// const Signup = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();

//     const submitHandler = async (data) => {
//         try {
//             data.roleId = "67c5e5d985287f45b90db12f";
//             const res = await axios.post("/users/users", data);
//             if (res.status === 201) {
//                 toast.success('Signed Up Successfully', {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: false,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                     transition: Bounce,
//                 });
//                 setTimeout(() => {
//                     navigate("/login");
//                 }, 1500);
//             }
//         } catch (err) {
//             toast.error('User already registered', {
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
//                 message: "Enter valid password*"
//             }
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
//             backgroundColor: '#f8fafc',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
//         }}>
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
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
//                     Sign up and start learning and exploring new skills!
//                 </Typography>
//                 <Typography sx={{
//                     color: '#64748b',
//                     textAlign: 'center',
//                     mb: 4,
//                     fontSize: '1rem'
//                 }}>
//                     Create your account to get started
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
//                             {...register("userName", validationSchema.nameValidator)}
//                             error={!!errors.userName}
//                             helperText={errors.userName?.message}
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
//                             type="password"
//                             variant="outlined"
//                             placeholder="Enter a Password"
//                             {...register("password", validationSchema.passwordValidator)}
//                             error={!!errors.password}
//                             helperText={errors.password?.message}
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
//                             href="/login"
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

// export default Signup;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const submitHandler = async (data) => {
        try {
            data.roleId = "67c5e5d985287f45b90db12f";
            const res = await axios.post("/users/users", data);
            if (res.status === 201) {
                toast.success('Signed Up Successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (err) {
            toast.error('User already registered', {
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
                message: "Enter valid number*"
            },
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>
            <ToastContainer
                position="top-center"
                autoClose={2000}
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
                padding: '2rem',
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
                    fontSize: { xs: '1.8rem', md: '2rem' }
                }}>
                    Sign up and start learning and exploring new skills!
                </Typography>
                <Typography sx={{
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: '1rem'
                }}>
                    Create your account to get started
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: '0.95rem'
                        }}>
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your full name"
                            {...register("userName", validationSchema.nameValidator)}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
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
                                    padding: '12px 14px',
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: '0.95rem'
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
                                    padding: '12px 14px',
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: '0.95rem'
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
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
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
                                    padding: '12px 14px',
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: '0.95rem'
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
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                    padding: '12px 14px',
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Typography component="label" sx={{
                            fontWeight: 500,
                            color: '#334155',
                            fontSize: '0.95rem'
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
                                    padding: '12px 14px',
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
                            padding: '12px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '1rem',
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
                        <Typography component="span" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Already Registered?
                        </Typography>
                        <Typography 
                            component="a" 
                            href="/login"
                            sx={{
                                color: '#5e14d6',
                                textDecoration: 'none',
                                fontWeight: 500,
                                ml: 1,
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

export default Signup;