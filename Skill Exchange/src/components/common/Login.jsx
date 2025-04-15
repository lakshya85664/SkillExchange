// import React from 'react'
// import { useForm } from 'react-hook-form'
// import '../../assets/login.css'
// import axios from 'axios';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';


// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   console.log("error", errors);

//   const navigate = useNavigate();

//   const submitHandler = async (data) => {
//     try {


//       console.log(data)
//       //data.roleId = "67be8606bef7f7875926306a"
//       const res = await axios.post("/users/users/login", data);
//       console.log(res);
//       console.log(res.data);
//       if (res.status === 200) {
//         toast.success('Logged In Successfully', {
//           position: "top-center",
//           autoClose: 1500,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Bounce,
//         });
//         localStorage.setItem("id", res.data.data._id);
//         localStorage.setItem("role", res.data.data.roleId.name);
//         if (res.data.data.roleId.name === "user") {
//           setTimeout(() => {
//             navigate("/user/profile")
//           }, 1500)
//         }
//       }
//     }catch(err){
//       toast.error("Invalid email or password", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         transition: Bounce,
//       });
//     }
//   }
//   const validationSchema = {
//     emailValidator: {
//       required: {
//         value: true,
//         message: "Email is required*"
//       },
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//         message: "Enter valid email*"
//       }
//     },
//     passwordValidator: {
//       required: {
//         value: true,
//         message: "Password is required*"
//       },
//       pattern: {
//         value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
//         message: "Enter valid password*"
//       }
//     }
//   }

//   return (
//     <div id='body'>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         transition={Bounce}
//       />
//       <h2 id='h2'>Log in to continue your <br />learning experience!</h2><br />
//       <div id='form-container'>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div>
//             <div id='email'>
//               <label id='log-inp'>Email</label><br />
//             </div>
//             <input type='text' id='inp-email' placeholder='Enter email' {...register("email", validationSchema.emailValidator)}></input><br />
//             <span id='err1'>
//               {
//                 errors.email?.message
//               }
//             </span>
//           </div>
//           <div>
//             <label id='sign-inp'>Password</label><br />
//             <input type='password' id='inp-pass' placeholder='Enter Password' {...register("password", validationSchema.passwordValidator)}></input><br />
//             <span id='err2'>
//               {
//                 errors.password?.message
//               }
//             </span>
//             <div>
//               <a id='fp' href="/forgotpass">Forgot Password?</a>
//             </div>
//           </div>
//           <div>
//             <input id='btn' type="submit" value="Login"/>
//           </div>
//           <div id='last'>
//             <span id='new'>New User?</span>
//             <a href="/signup">SignUp</a>
//           </div>
//         </form><br /><br /><br />
//       </div>
//     </div>
//   )
// }

// export default Login;

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/users/users/login", data);
            if (res.status === 200) {
                toast.success('Logged In Successfully', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                localStorage.setItem("user", JSON.stringify(res.data.data));
                localStorage.setItem("id", res.data.data._id);
                localStorage.setItem("role", res.data.data.roleId.name);
                if (res.data.data.roleId.name === "user") {
                    setTimeout(() => {
                        navigate("/user/profile");
                    }, 1500);
                }
            }
        } catch (err) {
            let errorMessage = "Invalid email or password";
        if (err.response && err.response.status === 403) {
            errorMessage = "Your account has been blocked. Please contact support.";
        }

            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
    };

    const validationSchema = {
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
                message: "Enter valid password*"
            }
        }
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
                    Log in to continue your learning experience!
                </Typography>
                <Typography sx={{
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: '1rem'
                }}>
                    Enter your details to access your account
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
                            type="password"
                            variant="outlined"
                            placeholder="Enter Password"
                            {...register("password", validationSchema.passwordValidator)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
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
                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Typography 
                                component="a" 
                                href="/forgotpass"
                                sx={{
                                    color: '#5e14d6',
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Box>
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
                        Login
                    </Button>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography component="span" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
                            New User?
                        </Typography>
                        <Typography 
                            component="a" 
                            href="/signup"
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
                            Sign Up
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;