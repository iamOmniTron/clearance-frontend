import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import IndexPage from "./pages/main";
import LoginUser from "./pages/user/login";
import UserDashboard from "./pages/user/components/dashboard";
import AdminDashboard from "./pages/admin/components/dashboard";
import AdminOverview from "./pages/admin";
import ManageSessions from "./pages/admin/sessions";
import ManageUsers from "./pages/admin/users";
import SingleUser from "./pages/admin/user";




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage/>}/>
          <Route path="/login" element={<LoginUser/>}/>
          {/* STUDENTS ROUTE */}
          <Route path="/student" element={<UserDashboard/>}>

          </Route>
          {/* ADMIN ROUTE */}
          <Route path="/admin" element={<AdminDashboard/>}>
            {/* <Route path="/login"/> */}
            <Route path="" index element={<AdminOverview/>}/>
            <Route path="sessions" element={<ManageSessions/>}/>
            <Route path="users" element={<ManageUsers/>}/>
            <Route path="users/user" element={<SingleUser/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
