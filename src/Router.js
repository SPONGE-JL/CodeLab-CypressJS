import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "routes/Login/Login";
import Home from "routes/Home/Home";
import Profile from "routes/Profile/Profile";
import Navigation from "./components/Navigation/Navigation";

const Router = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      <Navigation displayName={userObj && userObj.displayName} />
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </>
          :
          <>
            <Route path="/" element={<Login />} />
          </>
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default Router;