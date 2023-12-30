import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./component/Layout";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import AskDoubt from "./pages/AskDoubt";
import AllDoubt from "./pages/AllDoubt";
import Error from "./pages/Error";

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [user, setUser]= useState({})
 

  return (
    <div className="App">
      <UserContext.Provider value={{isLoggedIn,setIsLoggedIn, user,setUser}}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="dashboard" element={<Layout/>}>
            <Route index path="user" element={< PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="askdoubt" element={< PrivateRoute><AskDoubt/></PrivateRoute>}/>
            <Route path="alldoubt" element={< PrivateRoute><AllDoubt/></PrivateRoute>}/>
            <Route path="*" element={< PrivateRoute><Error/></PrivateRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

function PrivateRoute({children, auth}){

  const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
 
  if(isLoggedIn){   
    return children
    
  }else{
  
    return <Navigate to={"/"}></Navigate>
  }
 
 

}


export default App;
