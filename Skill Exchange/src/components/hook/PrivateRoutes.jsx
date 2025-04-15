import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
    const [AuthState, setAuthState] = useState({isLoggedin:false, role:""});
    const [Loading, setLoading] = useState(true);

    useEffect(()=>{
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if(id){
            setAuthState({isLoggedin:true,role});
        }
        setLoading(false);
    },[]);
    return{...AuthState,Loading};
}

const PrivateRoutes = () =>{
    const auth = useAuth();

    if(auth.Loading){
        return <h1>Loading..</h1>
    }
    return auth.isLoggedin ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoutes;