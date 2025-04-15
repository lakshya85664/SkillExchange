import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const UpdateSkill = () => {
    const id = useParams().id;
    
    const navigate = useNavigate();

    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);

    const getAllCategories = async () => {
        const res = await axios.get("/category/getallcategories");
        console.log(res.data);
        setcategory(res.data.data);
    };

    const getSubcategoryByCategoryId = async (id) => {
        const res = await axios.get("/subcategory/getsubcategorybycategoryid/" + id);
        console.log("subcategory response...", res.data);
        setsubCategory(res.data.data);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:async()=>{
            const res = await axios.get("/skill/getskillbyid/"+id)
            return res.data.data
        }
    });

    console.log("error", errors);

    const submitHandle = async (data) => {
        // console.log(data);
        // const userId = localStorage.getItem("id")
        // data.userId = userId;
        // console.log(data);
        // console.log(data.image[0]);

        // const formData = new FormData();
        // formData.append("categoryId", data.categoryId);
        // formData.append("subcategoryId", data.subcategoryId);
        // formData.append("image", data.image[0]);
        // formData.append("userId", data.userId);

        // const res = await axios.post("/users/adduserpic",formData);
        // //const res2 = await axios.post("/skill/addskill",formData);
        // console.log(res);
        // console.log(res.data);
        // navigate("/user")
        // // console.log("data "+data)
        // // const userId = localStorage.getItem("id");
        // // data.userId = userId;
        // //const res = await axios.post("/skill/addskill",data);
        // // console.log(res.data);

        console.log(data);
        const userId = localStorage.getItem("id");
        data.userId = userId;
        delete data._id;
        const res = await axios.put("/skill/updateskill/"+id, data);
        if (res.status === 200) {
              
              toast.success('Skill Updated Successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });setTimeout(() => {
                  navigate('/user');
                }, 2200);
            }
      } 

    const validationSchema = {
        domainValidation: {
            required: {
                value: true,
                message: "Domain Name is required*"
            }
        },
        skillValidation: {
            required: {
                value: true,
                message: "Skill name is required*"
            }
        },
        // photoValidation: {
        //     required: {
        //         value: true,
        //         message: "Please upload your photo*"
        //     }
        // }
    };
    return (

        <main className="app-main">
            <div className="app-content-header">
            <ToastContainer
                    position="top-right"
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h3 className="mb-0">Update Skill Form</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-content">
                <div className="container-fluid">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <div className="card card-primary card-outline mb-4">
                                <form onSubmit={handleSubmit(submitHandle)}>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Category Name
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                {...register("categoryId", validationSchema.domainValidation)}
                                                onChange={(event) => {
                                                    getSubcategoryByCategoryId(event.target.value);
                                                }}
                                            >
                                                <option>Select Category</option>
                                                {category?.map((category) => {
                                                    return <option value={category._id}>{category.name}</option>;
                                                })}
                                            </select>
                                            <span style={{ color: "red" }}>
                                                {
                                                    errors.categoryId?.message
                                                }
                                            </span>
                                        </div>
                                        {/* <div><label htmlFor="name">Name</label>
                                                <input type="text" />
                                        </div> */}
                                        <div className="mb-3">
                                            <label htmlFor="subcategory" className="form-label">
                                                SubCategory
                                            </label>
                                            <select
                                                className="form-control"
                                                {...register("subcategoryId", validationSchema.skillValidation)}
                                            >
                                                <option>Select SubCategory</option>
                                                {subCategory?.map((subCategory) => {
                                                    return <option value={subCategory._id}>{subCategory.name}</option>;
                                                })}
                                            </select>
                                            <span style={{ color: "red" }}>
                                                {
                                                    errors.subcategoryId?.message
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="mb-3">
                                        <label htmlFor="exampleNoofseatavailable" className="form-label">
                                            User_Photo :
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="exampleInputseat"
                                            min={0}
                                            {...register("image", validationSchema.photoValidation)}
                                        />
                                        <span style={{ color: "red" }}>
                                            {
                                                errors.image?.message
                                            }
                                        </span>
                                    </div> */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">
                                            UPDATE SKILL
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>


    )
}

export default UpdateSkill