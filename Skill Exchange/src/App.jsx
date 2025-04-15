import { useEffect, useState } from 'react'
import UserSidebar from './components/layouts/UserSidebar'
import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import UserProfile from './components/user/UserProfile'
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import ForgotPassword from './components/common/ForgotPassword'
import AddSkillForm from './components/learners/AddSkillForm'
import axios from 'axios'
import AdminSidebar from './components/layouts/AdminSidebar'
import AdminProfile from './components/admin/AdminProfile'
import AdminLogin from './components/common/AdminLogin'
import AdminSignup from './components/common/AdminSignup'
import AdminForgotPass from './components/common/AdminForgotPass'
import PrivateRoutes from './components/hook/PrivateRoutes'
import UserInfo from './components/learners/UserInfo'
import UpdateSkill from './components/learners/UpdateSkill'
import { Home } from '@mui/icons-material'
import { AuthProvider } from './context/AuthContext'
import HomeRoute from './components/common/HomeRoute'
import ContactUs from './components/common/ContactUs'
import UserDetails from './components/admin/UserDetails'
import ResetPassword from './components/common/ResetPassword'
import PrivateRoutes2 from './components/hook/PrivateRoutes2'
import RequestSkill from './components/learners/RequestSkill'
import AboutUs from './components/common/AboutUs'
import SkillUsersList from './components/learners/SkillUsersList'
import Requests from './components/learners/Requests'
import Messages from './components/learners/Messages'
import ManageSkills from './components/admin/ManageSkills'
import UserDetailsView from './components/admin/UserDetailsView'
import ViewReports from './components/admin/ViewReports'
import Chats from './components/learners/Chats'
import Notifications from './components/learners/Notifications'

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"} >
        <Routes>
          <Route path='/' element={<HomeRoute />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/contact' element={<ContactUs />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgotpass' element={<ForgotPassword />}></Route>
          <Route path='/resetpassword/:token' element={<ResetPassword />}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/adminsignup' element={<AdminSignup />}></Route>
          <Route path='/adminforgotpass' element={<AdminForgotPass />}></Route>
          <Route path='/requestskill' element={<RequestSkill />}></Route>


          <Route path='' element={<PrivateRoutes />}>
            <Route path='/user' element={<UserSidebar />}>
              <Route path='requests' element={<Requests />}></Route>
              <Route path='messages' element={<Messages />}></Route>
              <Route path='chats/:matchId' element={<Chats />}></Route>
              <Route path='skillusers/:skillName' element={<SkillUsersList />}></Route>
              <Route path='profile' element={<UserProfile />}></Route>
              <Route path='form' element={<AddSkillForm />}></Route>
              <Route path='updateform/:id' element={<UpdateSkill />}></Route>
              <Route path='info' element={<UserInfo />}></Route>
              {/* <Route path='notifications' element={<Notifications />}></Route> */}
            </Route>
          </Route>
          <Route path='' element={<PrivateRoutes2 />}>
            <Route path='/admin' element={<AdminSidebar />}>
              <Route path='profile' element={<AdminProfile />}></Route>
              <Route path="userdetails/:id" element={<UserDetailsView />} />
              <Route path='userdetails' element={<UserDetails />}></Route>
              <Route path='manageskills' element={<ManageSkills/>}></Route>
              <Route path='reports' element={<ViewReports/>}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
