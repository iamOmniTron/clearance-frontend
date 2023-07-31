import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import IndexPage from "./pages/main";
import LoginUser from "./pages/user/login";
import UserDashboard from "./pages/user/components/dashboard";
import AdminDashboard from "./pages/admin/components/dashboard";
import AdminOverview from "./pages/admin";
import ManageSessions from "./pages/admin/sessions";
import ManageUsers from "./pages/admin/users";
import SingleUser from "./pages/admin/user";
import FormsListPage from "./pages/admin/forms";
import StagesPage from "./pages/admin/stages";
import AdminLogin from "./pages/admin/login";
import UserProfile from "./pages/user/profile";
import UserOverview from "./pages/user";
import DocumentsPage from "./pages/admin/documents";
import Facility from "./pages/user/components/facility";




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage/>}/>
          <Route path="/login" element={<LoginUser/>}/>
          {/* STUDENTS ROUTE */}
          <Route path="/student" element={<UserDashboard/>}>
            <Route path="" index element={<UserOverview/>}/>
            <Route path="profile" element={<UserProfile/>}/>
            <Route path="facility" element={<Facility/>}/>
          </Route>
          {/* ADMIN ROUTE */}
            <Route path="/admin/login"  element={<AdminLogin/>}/>
          <Route path="/admin" element={<AdminDashboard/>}>
            <Route path="" index element={<AdminOverview/>}/>
            <Route path="sessions" element={<ManageSessions/>}/>
            <Route path="users" element={<ManageUsers/>}/>
            <Route path="users/user" element={<SingleUser/>}/>
            <Route path="settings/forms" element={<FormsListPage/>}/>
            <Route path="settings/document-type" element={<DocumentsPage/>}/>
            <Route path="settings/stages" element={<StagesPage/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
