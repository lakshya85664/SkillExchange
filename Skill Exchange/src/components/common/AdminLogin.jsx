// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { Box, Typography, TextField, Button } from '@mui/material';

// const AdminLogin = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();

//     const submitHandler = async (data) => {
//         try {
//             const res = await axios.post("/admin/login", data);
//             if (res.status === 200) {
//                 toast.success('Logged In Successfully', {
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
//                 localStorage.setItem("id", res.data.data._id);
//                 localStorage.setItem("role", res.data.data.roleId.name);
//                 if (res.data.data.roleId.name === "admin") {
//                     setTimeout(() => {
//                         navigate("/admin/profile");
//                     }, 1500);
//                 }
//             }
//         } catch (err) {
//             toast.error("Invalid email or password", {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 transition: Bounce,
//             });
//         }
//     };

//     const validationSchema = {
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
//         }
//     };

//     return (
//         <Box sx={{
//             display: 'flex',
//             marginLeft:'500px',
//             minHeight: '100vh',
//             minWidth:'35vw',
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
//                     Admin Login
//                 </Typography>
//                 <Typography sx={{
//                     color: '#64748b',
//                     textAlign: 'center',
//                     mb: 4,
//                     fontSize: '1rem'
//                 }}>
//                     Enter your admin credentials
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
//                             placeholder="Enter Password"
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
//                         <Box sx={{ textAlign: 'right', mt: 1 }}>
//                             <Typography 
//                                 component="a" 
//                                 href="/adminforgotpass"
//                                 sx={{
//                                     color: '#5e14d6',
//                                     fontSize: '0.85rem',
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         textDecoration: 'underline'
//                                     }
//                                 }}
//                             >
//                                 Forgot Password?
//                             </Typography>
//                         </Box>
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
//                         Login
//                     </Button>
                    
//                     <Box sx={{ textAlign: 'center', mt: 2 }}>
//                         <Typography component="span" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
//                             New Admin?
//                         </Typography>
//                         <Typography 
//                             component="a" 
//                             href="/adminsignup"
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
//                             Sign Up
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default AdminLogin;

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/admin/login", data);
            if (res.status === 200) {
                toast.success('Logged In Successfully', {
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
                localStorage.setItem("id", res.data.data._id);
                localStorage.setItem("role", res.data.data.roleId.name);
                if (res.data.data.roleId.name === "admin") {
                    setTimeout(() => {
                        navigate("/admin/profile");
                    }, 1500);
                }
            }
        } catch (err) {
            toast.error("Invalid email or password", {
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
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            minWidth: '100vw',
            width: '100%',
            backgroundColor: '#f8fafc',
            p: 2
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
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                p: 4
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 700,
                    color: '#5e14d6',
                    mb: 2,
                    textAlign: 'center'
                }}>
                    Admin Login
                </Typography>
                <Typography sx={{
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 4
                }}>
                    Enter your admin credentials
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter email"
                            {...register("email", validationSchema.emailValidator)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                    
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Enter Password"
                            {...register("password", validationSchema.passwordValidator)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Typography 
                            component="a" 
                            href="/adminforgotpass"
                            sx={{
                                display: 'block',
                                textAlign: 'right',
                                mt: 1,
                                color: '#5e14d6',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </Box>
                    
                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#5e14d6',
                            color: 'white',
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#4a0fb5'
                            }
                        }}
                    >
                        Login
                    </Button>
                    
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        New Admin?{' '}
                        <Typography 
                            component="a" 
                            href="/adminsignup"
                            sx={{
                                color: '#5e14d6',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLogin;