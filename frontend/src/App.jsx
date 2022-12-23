import { useState, useEffect } from "react";
import "./App.css";
// import Leaderboard from './components/Leaderboard'
import Login from "./components/Login";
import Signup from "./components/Signup";
import CustomizedDialogs from "./components/CustomizedDialog";
import { Button, Container, Paper } from "@mui/material";
function App() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  const handleModalChange = () => {
    setOpen(!open);
  };

  const changeLoginVar = () => {
    setLoginMode(!loginMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [])
  
  return (
    <Container>
      <div className="clearfix">
        <div className="row">
          {isLoggedIn ? (
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button variant="contained" onClick={handleModalChange}>
              Login/Signup
            </Button>
          )}
          <CustomizedDialogs
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleModalChange}
          >
            {loginMode ? (
              <Login changeLoginVar={changeLoginVar} handleModalChange={handleModalChange} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Signup changeLoginVar={changeLoginVar} handleModalChange={handleModalChange} setIsLoggedIn={setIsLoggedIn} />
            )}
          </CustomizedDialogs>
        </div>
      </div>
    </Container>
  );
}

// useEffect(() => {
//   fetch('http://localhost:3000/api/leaderboard').then((response)=> response.json()).then((data) => {
//     setData(data)
//     setLoading(true)
//   })
// }, [])

// return <div>
//   {loading ? <Leaderboard data={data}/> : <div>Loading</div>}
//   <LoginForm />
//   <SignupForm />
//   </div>

export default App;
