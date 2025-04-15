const roleModel = require("../models/RoleModel");

const getAllRoles = async(req,res) =>{
    const roles = await roleModel.find()
    res.json({
        message: "route fetched successfully",
        data:roles
    });
};

const addRole = async(req,res) => {
    //req.body,req.params,req.headers,req.query
   //console.log("request body",req.body);
   //res.json({
   // message: "ok..."
   //});
   const savedRole = await roleModel.create(req.body);
   res.json({
        message: "Role Created",
        data : savedRole
   })

}

const deleteRole = async(req,res) => {

    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
    res.json({
        message: "Role deleted successfully",
        data:deletedRole
    })
}

const getRoleById = async (req,res) =>{
    const foundRole = await roleModel.findById(req.params.id);
    res.json({
        meassage: "found id",
        data : foundRole
    })
}

module.exports = {
    getAllRoles,addRole,deleteRole,getRoleById
}