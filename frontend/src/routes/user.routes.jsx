import PageNotFound from "../pages/common/PageNotFound"
import ViewUsers from "../pages/admin/ViewUsers"
import GetUser from "../pages/user/GetUser"
import Profile from "../pages/user/Profile"
import UpdateProfile from "../pages/user/UpdateUserProfile"
import { Routes, Route } from "react-router-dom"


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="update-profile" element={<UpdateProfile />} />
      <Route path="list" element={<ViewUsers />} />
      <Route path=":user_id" element={<GetUser />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default UserRoutes
