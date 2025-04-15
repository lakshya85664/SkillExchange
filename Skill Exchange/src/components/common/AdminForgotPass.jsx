// import React from 'react'
// import { useForm } from 'react-hook-form'
// //import '../../assets/forgotpass.css'

// const AdminForgotPass = () => {
//     const {register,handleSubmit,formState:{errors}} = useForm();

//     console.log("error",errors);

//     const handleClick = () => {
//         console.log("Hello")
//     }

//     const submitHandler = (data) => {
//         console.log(data);
//     };

//     const validationSchema = {
//       emailValidator:{
//         required:{
//           value:true,
//           message:"Email is required*"
//         },
//         pattern:{
//             value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//             message:"Enter valid email*"
//         }
//       },
//     }

//   return (
//     <div id='main'>
//       <h2 id='h2'>Forgot your Password?</h2><br />
//       <p>Enter your registered email address. <br /> We'll send you a link to reset your password.</p><br />
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <div>
//             <div id='email'>
//               <label id='log-inp'>Email</label><br />
//             </div>
//             <input type='text' id='inp-email' placeholder='Enter registered email' {...register("email",validationSchema.emailValidator)}></input><br />
//             <span id='err1'>
//               {
//                 errors.email?.message
//               }
//             </span>
//         </div>
//         <div>
//             <input onClick={() => {handleClick()}} id='btnp' type="submit" value="Reset Password"/>
//         </div>
//         <div id='last'>
//             <span id='new'>Back to</span>
//             <a href="/adminlogin">Login</a>
//         </div>
//       </form>
//       <br /><br /><br />
//     </div>
//   )
// }

// export default AdminForgotPass;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminForgotPass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        console.log(data);
        toast.success('Reset link sent to your email', {
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
    }

    return (
        <Box sx={{
            display: 'flex',
            // marginLeft:"400px",
            minHeight: '100vh',
            minWidth:"99vw",
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
                    mb: 2,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    fontSize: { xs: '1.8rem', md: '2rem' }
                }}>
                    Forgot your Password?
                </Typography>
                <Typography sx={{
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: '1rem'
                }}>
                    Enter your registered email address. We'll send you a link to reset your password.
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
                            placeholder="Enter registered email"
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
                        Reset Password
                    </Button>
                    
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography component="span" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
                            Back to
                        </Typography>
                        <Typography 
                            component="a" 
                            href="/adminlogin"
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

export default AdminForgotPass;