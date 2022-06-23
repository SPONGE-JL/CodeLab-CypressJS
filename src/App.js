import { useEffect, useState } from "react";
import Router from "Router";
import AuthService from "services/AuthService/AuthService";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    AuthService.refresh((user) => {
      setInit(true);
      if (user) {
        setisLoggedIn(true);
        setUserObj({
          displayName: user.displayName ?? user.email.split("@")[0],
          uid: user.uid,
          email: user.email,
          updateProfile: () => AuthService.saveProfile({
            displayName: user.displayName
          }),
        });
        return;
      }
      setisLoggedIn(false);
      setUserObj(null);
    });
  }

  useEffect(() => {
    refreshUser();
  }, [])

  return (
    <div className="wrapper">
      {init ?
        <Router
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
        :
        "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
