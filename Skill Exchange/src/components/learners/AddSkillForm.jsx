// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom';

// const AddSkillForm = () => {

//     const [user, setuser] = useState([]);
//     const userId = localStorage.getItem("id");

//     const getUser = async () => {
//         const res = await axios.get(`/users/getuserbyid/${userId}`)
//         console.log(res.data)
//         setuser(res.data.data)
//     }

//     useEffect(() => {
//         getUser()
//     }, []);

//     const { register, handleSubmit, formState: { errors } } = useForm({});
//     const navigate = useNavigate();

//     const [category, setcategory] = useState([]);
//     const [subCategory, setsubCategory] = useState([]);
//     const [selectedSubCategory, setSelectedSubCategory] = useState({ id: "", name: "" });

//     const getAllCategories = async () => {
//         const res = await axios.get("/category/getallcategories");
//         console.log(res.data);
//         setcategory(res.data.data);
//     };

//     const getSubcategoryByCategoryId = async (id) => {
//         const res = await axios.get("/subcategory/getsubcategorybycategoryid/" + id);
//         console.log("subcategory response...", res.data);
//         setsubCategory(res.data.data);
//     };

//     useEffect(() => {
//         getAllCategories();
//     }, []);

//     console.log("error", errors);

//     const submitHandle = async (data) => {
//         // console.log(data);
//         // const userId = localStorage.getItem("id")
//         // data.userId = userId;
//         // console.log(data);
//         // console.log(data.image[0]);

//         // const formData = new FormData();
//         // formData.append("categoryId", data.categoryId);
//         // formData.append("subcategoryId", data.subcategoryId);
//         // formData.append("image", data.image[0]);
//         // formData.append("userId", data.userId);

//         // const res = await axios.post("/users/adduserpic",formData);
//         // //const res2 = await axios.post("/skill/addskill",formData);
//         // console.log(res);
//         // console.log(res.data);
//         // navigate("/user")
//         // // console.log("data "+data)
//         // // const userId = localStorage.getItem("id");
//         // // data.userId = userId;
//         // //const res = await axios.post("/skill/addskill",data);
//         // // console.log(res.data);

//         console.log(data);
//         const userId = localStorage.getItem("id");
//         data.userId = userId;

//         // const formData = new FormData();
//         // formData.append("categoryId", data.categoryId);
//         // formData.append("subcategoryId", data.subcategoryId);
//         // // formData.append("image", data.image[0]);
//         // formData.append("userId", data.userId);

//         const formData = {
//             userId: userId,
//             categoryId: data.categoryId,
//             subcategoryId: selectedSubCategory.id,
//             name: selectedSubCategory.name,  // Automatically use subcategory name as skill name
//         };

//         try {
//             // First API call
//             // const res1 = await axios.post("/users/adduserpic", formData);
//             // console.log("API 1 Response:", res1.data);

//             // Second API call after first one succeeds
//             const res2 = await axios.post("/skill/addskill", formData);
//             console.log("API 2 Response:", res2.data);

//             data.userId = localStorage.getItem("id");
//             // console.log(data);
//             // delete data._id;
//             // console.log(data);
//             const res = await axios.put(`/users/getuserbyidandupdate/${userId}`, data);

//             navigate("/user/profile");
//         } catch (error) {
//             console.error("Error in API calls:", error);
//         }
//     };

//     const validationSchema = {
//         domainValidation: {
//             required: {
//                 value: true,
//                 message: "Domain Name is required*"
//             }
//         },
//         skillValidation: {
//             required: {
//                 value: true,
//                 message: "Skill name is required*"
//             }
//         },
//         photoValidation: {
//             required: {
//                 value: true,
//                 message: "Please upload your photo*"
//             }
//         }
//     };
//     return (

//         <main className="app-main">
//             <div className="app-content-header">
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-sm-6">
//                             <h3 className="mb-0">Add Skills You Know</h3>
//                         </div>
//                         <div>
//                             <p>Share your expertise with the SkillExchange community! Add the skills you excel in and help others learn from your knowledge. Whether it's coding, design, marketing, or any other talent, empower learners by teaching them efficiently. Join us in building a network of skill-sharing and mutual growth!</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="app-content">
//                 <div className="container-fluid">
//                     <div className="row g-2">
//                         <div className="col-md-6">
//                             <div className="card card-primary card-outline mb-4">
//                                 <form onSubmit={handleSubmit(submitHandle)}>
//                                     <div className="card-body">
//                                         {/* <div className="mb-3">
//                                             <label htmlFor="category" className="form-label">
//                                                 User Name
//                                             </label><br />
//                                             <input className="form-control" type="text" value={user.userName} {...register("userName")} />
//                                         </div> */}
//                                         <div className="mb-3">
//                                             <label htmlFor="category" className="form-label">
//                                                 Category Name
//                                             </label>
//                                             <select
//                                                 className="form-control"
//                                                 aria-describedby="emailHelp"
//                                                 {...register("categoryId", validationSchema.domainValidation)}
//                                                 onChange={(event) => {
//                                                     getSubcategoryByCategoryId(event.target.value);
//                                                 }}
//                                             >
//                                                 <option>Select Category</option>
//                                                 {category?.map((category) => {
//                                                     return <option value={category._id}>{category.name}</option>;
//                                                 })}
//                                             </select>
//                                             <span style={{ color: "red" }}>
//                                                 {
//                                                     errors.categoryId?.message
//                                                 }
//                                             </span>
//                                         </div>
//                                         {/* <div><label htmlFor="name">Name</label>
//                                                 <input type="text" />
//                                         </div> */}
//                                         {/* <div className="mb-3">
//                                             <label htmlFor="subcategory" className="form-label">
//                                                 SubCategory
//                                             </label>
//                                             <select
//                                                 className="form-control"
//                                                 {...register("subcategoryId", validationSchema.skillValidation)}
//                                             >
//                                                 <option>Select SubCategory</option>
//                                                 {subCategory?.map((subCategory) => {
//                                                     return <option value={subCategory._id}>{subCategory.name}</option>;
//                                                 })}
//                                             </select>
//                                             <span style={{ color: "red" }}>
//                                                 {
//                                                     errors.subcategoryId?.message
//                                                 }
//                                             </span>
//                                         </div> */}
//                                         <div className="mb-3">
//                                             <label htmlFor="subcategory" className="form-label">
//                                                 SubCategory
//                                             </label>
//                                             <select
//                                                 className="form-control"
//                                                 {...register("subcategoryId", validationSchema.skillValidation)}
//                                                 onChange={(event) => {
//                                                     const selected = subCategory.find(sub => sub._id === event.target.value);
//                                                     if (selected) {
//                                                         setSelectedSubCategory({ id: selected._id, name: selected.name }); // Store ID & Name
//                                                     }
//                                                 }}
//                                             >
//                                                 <option>Select SubCategory</option>
//                                                 {subCategory?.map((sub) => (
//                                                     <option key={sub._id} value={sub._id}>
//                                                         {sub.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <span style={{ color: "red" }}>
//                                                 {errors.subcategoryId?.message}
//                                             </span>
//                                         </div>

//                                     </div>
//                                     {/* <div className="mb-3">
//                                         <label htmlFor="exampleNoofseatavailable" className="form-label">
//                                             User_Photo :
//                                         </label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             id="exampleInputseat"
//                                             min={0}
//                                             {...register("image", validationSchema.photoValidation)}
//                                         />
//                                         <span style={{ color: "red" }}>
//                                             {
//                                                 errors.image?.message
//                                             }
//                                         </span>
//                                     </div> */}
//                                     <div className="card-footer">
//                                         <button type="submit" className="btn btn-primary">
//                                             ADD SKILL
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>


//     )
// }

// export default AddSkillForm
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, MenuItem, Button, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/system';

// Custom styling using MUI
const FormContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const StyledCard = styled(Card)({
    maxWidth: 600, 
    width: '100%',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(to right, #bdbdbd, #757575)',
    color: '#fff',
});

const StyledButton = styled(Button)({
    background: '#424242',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    '&:hover': {
        background: '#212121',
    },
});

const AddSkillForm = () => {
    const [user, setUser] = useState([]);
    const userId = localStorage.getItem("id");
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState({ id: "", name: "" });

    useEffect(() => {
        axios.get(`/users/getuserbyid/${userId}`).then(res => setUser(res.data.data));
        axios.get("/category/getallcategories").then(res => setCategories(res.data.data));
    }, [userId]);

    const getSubcategoryByCategoryId = async (id) => {
        const res = await axios.get(`/subcategory/getsubcategorybycategoryid/${id}`);
        setSubCategories(res.data.data);
    };

    const submitHandle = async (data) => {
        data.userId = userId;
        const formData = {
            userId: userId,
            categoryId: data.categoryId,
            subcategoryId: selectedSubCategory.id,
            name: selectedSubCategory.name,
        };

        try {
            await axios.post("/skill/addskill", formData);
            await axios.put(`/users/getuserbyidandupdate/${userId}`, data);
            navigate("/user/profile");
        } catch (error) {
            console.error("Error in API calls:", error);
        }
    };

    return (
        <FormContainer>
            <StyledCard>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Add Skills You Know
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Share your expertise with SkillExchange! Add the skills you excel in and help others learn from your knowledge. Let's build a strong skill-sharing community.
                    </Typography>

                    <form onSubmit={handleSubmit(submitHandle)}>
                        <label htmlFor="" style={{color:"#212121",marginTop:"5px"}}>Select Category</label>
                        <TextField
                            select
                            fullWidth
                            //label="Category Name"
                            {...register("categoryId", { required: "Category is required" })}
                            onChange={(event) => getSubcategoryByCategoryId(event.target.value)}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }} // FIXED LABEL OVERLAPPING
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                                '& .MuiInputLabel-root': { color: '#000' }, 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#ddd' },
                                    '&:hover fieldset': { borderColor: '#666' },
                                    '&.Mui-focused fieldset': { borderColor: '#6a11cb' },
                                },
                            }}
                        >
                            <MenuItem value="">Select Category</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                            ))}
                        </TextField>
                        {errors.categoryId && <Typography color="error">{errors.categoryId.message}</Typography>}
                        <label htmlFor="" style={{color:"#212121"}}>Select  SubCategory</label>
                        <TextField
                            select
                            fullWidth
                            //label="SubCategory"
                            placeholder='SubCategory'
                            name='solid'
                            {...register("subcategoryId", { required: "SubCategory is required" })}
                            onChange={(event) => {
                                const selected = subCategories.find(sub => sub._id === event.target.value);
                                if (selected) {
                                    setSelectedSubCategory({ id: selected._id, name: selected.name });
                                }
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }} // FIXED LABEL OVERLAPPING
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                                '& .MuiInputLabel-root': { color: '#000' }, 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#ddd' },
                                    '&:hover fieldset': { borderColor: '#666' },
                                    '&.Mui-focused fieldset': { borderColor: '#6a11cb' },
                                },
                            }}
                        >
                            <MenuItem value="">Select SubCategory</MenuItem>
                            {subCategories.map(sub => (
                                <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                            ))}
                        </TextField>
                        {errors.subcategoryId && <Typography color="error">{errors.subcategoryId.message}</Typography>}
                    </form>
                </CardContent>
                <CardActions>
                    <StyledButton style={{marginLeft:"406px",paddingRight:"15px",paddingLeft:"15px"}} onClick={handleSubmit(submitHandle)}>
                        ADD SKILL
                    </StyledButton>
                </CardActions>
            </StyledCard>
        </FormContainer>
    );
};

export default AddSkillForm;

