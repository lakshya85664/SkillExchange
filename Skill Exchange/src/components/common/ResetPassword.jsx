// // import axios from 'axios'
// // import React from 'react'
// // import { useForm } from 'react-hook-form'
// // import { useParams } from 'react-router-dom'
// // import '../../assets/resetpass.css'
// // import { Bounce, toast, ToastContainer } from 'react-toastify'

// // const ResetPassword = () => {
// //     const token = useParams().token
// //     const { register, handleSubmit, formState: { errors } } = useForm()
// //     const submitHandler = async (data) => {
// //         //resetpassword api..
// //         try {
// //             const obj = {
// //                 token: token,
// //                 password: data.password
// //             }
// //             const res = await axios.post("/users/resetpassword", obj)
// //             console.log(res.data);

// //             if (res.status === 200) {
// //                 toast.success('Password Reset Successfully!', {
// //                     position: "top-center",
// //                     autoClose: 1500,
// //                     hideProgressBar: false,
// //                     closeOnClick: false,
// //                     pauseOnHover: true,
// //                     draggable: true,
// //                     progress: undefined,
// //                     theme: "dark",
// //                     transition: Bounce,
// //                 });
// //             }
// //         } catch (err) {
// //             toast.error("Try Again!", {
// //                 position: "top-center",
// //                 autoClose: 5000,
// //                 hideProgressBar: false,
// //                 closeOnClick: false,
// //                 pauseOnHover: true,
// //                 draggable: true,
// //                 progress: undefined,
// //                 transition: Bounce,
// //             });
// //         }

// //     }

// //     const validationSchema = {
// //         passwordValidator: {
// //             required: {
// //                 value: true,
// //                 message: "Password is required*"
// //             },
// //             pattern: {
// //                 value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
// //                 message: "Enter valid password*"
// //             }
// //         }
// //     }


// //     return (
// //         <div id='main2'>
// //             <ToastContainer
// //                 position="top-center"
// //                 autoClose={5000}
// //                 hideProgressBar={false}
// //                 newestOnTop={false}
// //                 closeOnClick={false}
// //                 rtl={false}
// //                 pauseOnFocusLoss
// //                 draggable
// //                 pauseOnHover
// //                 theme="dark"
// //                 transition={Bounce}
// //             />
// //             <h2 id='h2'>Reset your Password</h2>
// //             <form onSubmit={handleSubmit(submitHandler)}>
// //                 <div>
// //                     <label id='res'>Password</label><br />
// //                     <input id='inp' type='password' placeholder='Enter new password' {...register("password", validationSchema.passwordValidator)}></input><br />
// //                     <span id='error'>
// //                         {
// //                             errors.password?.message
// //                         }
// //                     </span>
// //                 </div>
// //                 <div>
// //                     <input id='btnr' type="submit" value="Reset" />
// //                 </div>
// //             </form>
// //         </div>
// //     )
// // }

// // export default ResetPassword;

// import axios from 'axios'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'
// import { Bounce, toast, ToastContainer } from 'react-toastify'

// const ResetPassword = () => {
//     const token = useParams().token
//     const { register, handleSubmit, formState: { errors } } = useForm()

//     // Styles
//     const styles = {
//         container: {
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//             padding: '20px',
//             backgroundColor: '#f5f5f5',
//         },
//         card: {
//             background: 'white',
//             padding: '2rem',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//             width: '100%',
//             maxWidth: '450px',
//         },
//         title: {
//             textAlign: 'center',
//             marginBottom: '1.5rem',
//             color: '#333',
//             fontSize: '1.8rem',
//         },
//         formGroup: {
//             marginBottom: '1.5rem',
//         },
//         label: {
//             display: 'block',
//             marginBottom: '0.5rem',
//             color: '#555',
//             fontWeight: '500',
//         },
//         input: {
//             width: '100%',
//             padding: '12px 15px',
//             border: '1px solid #ddd',
//             borderRadius: '6px',
//             fontSize: '1rem',
//             transition: 'border-color 0.3s',
//         },
//         inputFocus: {
//             outline: 'none',
//             borderColor: '#4a90e2',
//             boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
//         },
//         inputError: {
//             borderColor: '#e74c3c',
//         },
//         errorMessage: {
//             display: 'block',
//             marginTop: '0.5rem',
//             color: '#e74c3c',
//             fontSize: '0.875rem',
//         },
//         button: {
//             width: '100%',
//             padding: '12px',
//             backgroundColor: '#4a90e2',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             fontSize: '1rem',
//             fontWeight: '500',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s',
//         },
//         buttonHover: {
//             backgroundColor: '#3a7bc8',
//         },
//         // Responsive styles
//         responsive: {
//             card768: {
//                 padding: '1.5rem',
//             },
//             title768: {
//                 fontSize: '1.5rem',
//             },
//             container480: {
//                 padding: '10px',
//             },
//             card480: {
//                 padding: '1.25rem',
//             },
//             input480: {
//                 padding: '10px 12px',
//             },
//             button480: {
//                 padding: '10px',
//             },
//         }
//     }

//     const submitHandler = async (data) => {
//         try {
//             const obj = {
//                 token: token,
//                 password: data.password
//             }
//             const res = await axios.post("/users/resetpassword", obj)
//             console.log(res.data);

//             if (res.status === 200) {
//                 toast.success('Password Reset Successfully!', {
//                     position: "top-center",
//                     autoClose: 1500,
//                     hideProgressBar: false,
//                     closeOnClick: false,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                     transition: Bounce,
//                 });
//             }
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Try Again!", {
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
//     }

//     const validationSchema = {
//         passwordValidator: {
//             required: {
//                 value: true,
//                 message: "Password is required*"
//             },
//             pattern: {
//                 value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
//                 message: "Password must contain at least 8 characters, including uppercase, lowercase, and numbers*"
//             }
//         }
//     }

//     return (
//         <div style={styles.container}>
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
//                 style={{
//                     width: '100%',
//                     maxWidth: '400px',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                 }}
//             />
//             <div style={{...styles.card, ...(window.innerWidth <= 768 && styles.responsive.card768), ...(window.innerWidth <= 480 && styles.responsive.card480)}}>
//                 <h2 style={{...styles.title, ...(window.innerWidth <= 768 && styles.responsive.title768)}}>Reset your Password</h2>
//                 <form onSubmit={handleSubmit(submitHandler)}>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="password" style={styles.label}>Password</label>
//                         <input 
//                             id="password"
//                             type="password" 
//                             placeholder="Enter new password" 
//                             {...register("password", validationSchema.passwordValidator)}
//                             style={{
//                                 ...styles.input,
//                                 ...(errors.password && styles.inputError),
//                                 ...(window.innerWidth <= 480 && styles.responsive.input480)
//                             }}
//                             onFocus={(e) => {
//                                 e.target.style = {...styles.input, ...styles.inputFocus};
//                             }}
//                             onBlur={(e) => {
//                                 e.target.style = errors.password 
//                                     ? {...styles.input, ...styles.inputError}
//                                     : styles.input;
//                             }}
//                         />
//                         {errors.password && (
//                             <span style={styles.errorMessage}>
//                                 {errors.password.message}
//                             </span>
//                         )}
//                     </div>
//                     <button 
//                         type="submit" 
//                         style={{
//                             ...styles.button,
//                             ...(window.innerWidth <= 480 && styles.responsive.button480)
//                         }}
//                         onMouseEnter={(e) => {
//                             e.target.style = {...styles.button, ...styles.buttonHover};
//                         }}
//                         onMouseLeave={(e) => {
//                             e.target.style = styles.button;
//                         }}
//                     >
//                         Reset Password
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default ResetPassword

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
    const token = useParams().token;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: windowWidth <= 480 ? '16px' : '24px',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Arial, sans-serif',
        },
        card: {
            background: 'white',
            padding: windowWidth <= 480 ? '24px' : '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '450px',
            textAlign: 'center',
        },
        title: {
            color: '#2d3748',
            fontSize: windowWidth <= 480 ? '24px' : '28px',
            fontWeight: '600',
            marginBottom: '16px',
        },
        description: {
            color: '#4a5568',
            fontSize: windowWidth <= 480 ? '14px' : '16px',
            marginBottom: '24px',
            lineHeight: '1.5',
        },
        formGroup: {
            marginBottom: '20px',
            textAlign: 'left',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: '500',
        },
        input: {
            width: '100%',
            padding: windowWidth <= 480 ? '10px 12px' : '12px 16px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#2d3748',
            transition: 'all 0.2s',
        },
        inputFocus: {
            borderColor: '#3182ce',
            boxShadow: '0 0 0 1px #3182ce',
        },
        inputError: {
            borderColor: '#e53e3e',
        },
        errorMessage: {
            display: 'block',
            marginTop: '4px',
            color: '#e53e3e',
            fontSize: '12px',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginTop: '8px',
        },
        buttonHover: {
            backgroundColor: '#2c5282',
        },
        backLink: {
            display: 'inline-block',
            marginTop: '24px',
            color: '#3182ce',
            fontSize: '14px',
            textDecoration: 'none',
            fontWeight: '500',
        },
    };

    const submitHandler = async (data) => {
        try {
            const obj = {
                token: token,
                password: data.password
            };
            const res = await axios.post("/users/resetpassword", obj);
            console.log(res.data);

            if (res.status === 200) {
                toast.success('Password Reset Successfully!', {
                    position: windowWidth <= 480 ? "top-center" : "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Try Again!", {
                position: windowWidth <= 480 ? "top-center" : "top-right",
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
        passwordValidator: {
            required: {
                value: true,
                message: "Password is required"
            },
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "Must contain 8+ chars with uppercase, lowercase, and numbers"
            }
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer
                position={windowWidth <= 480 ? "top-center" : "top-right"}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                style={{
                    width: '100%',
                    maxWidth: windowWidth <= 480 ? '100%' : '400px',
                    padding: windowWidth <= 480 ? '0 16px' : '0',
                    top: windowWidth <= 480 ? '16px' : '24px',
                    right: windowWidth <= 480 ? 'auto' : '24px',
                    left: windowWidth <= 480 ? '0' : 'auto',
                }}
            />
            
            <div style={styles.card}>
                <h2 style={styles.title}>Reset your Password</h2>
                <p style={styles.description}>
                    Enter your new password below. Make sure it's secure and you won't forget it.
                </p>
                
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>New Password</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Enter your new password" 
                            {...register("password", validationSchema.passwordValidator)}
                            style={{
                                ...styles.input,
                                ...(errors.password && styles.inputError),
                            }}
                            onFocus={(e) => {
                                e.target.style = {
                                    ...styles.input,
                                    ...styles.inputFocus,
                                    ...(errors.password && styles.inputError)
                                };
                            }}
                            onBlur={(e) => {
                                e.target.style = {
                                    ...styles.input,
                                    ...(errors.password && styles.inputError)
                                };
                            }}
                        />
                        {errors.password && (
                            <span style={styles.errorMessage}>
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.target.style = {
                                ...styles.button,
                                ...styles.buttonHover
                            };
                        }}
                        onMouseLeave={(e) => {
                            e.target.style = styles.button;
                        }}
                    >
                        Reset Password
                    </button>
                </form>
                
                <Link to="/login" style={styles.backLink}>
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;