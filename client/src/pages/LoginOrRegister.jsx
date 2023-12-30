import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import { jwtDecode } from "jwt-decode";

const LoginForm = ({ setIsLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    const formdata = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "/user/login",
        { ...formdata },
        { withCredentials: true }
      );
      if (response.data.success) {
        //setting in localstorage for private route
        localStorage.setItem("loggedIn", true);

        //Set User
        const { user } = jwtDecode(response.data.accessToken);
        setUser(user);

        setIsLoggedIn(true);
        alert("Login Successfull");
        navigate("/dashboard/user");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 my-2 bg-slate-50 bg-opacity-10 rounded shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form>
        <label className="block mb-4">
          <span className="text-gray-900">Email:</span>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-900">Password:</span>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-1">
          Not Register!{" "}
          <span
            className="text-blue-900 cursor-pointer"
            onClick={() => setIsLoginForm(false)}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

const RegisterForm = ({ setIsLoginForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");
  const [role, setRole] = useState("student");
  const [classGrade, setClassGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [allowedClass, setAllowedClass] = useState([]);

  const classes = ["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

  const handleAllowedClass=(e)=>{
    const {checked, name, value} = e.target
      if(checked){
        setAllowedClass([...allowedClass, value])
      }else{
        const updateClass= allowedClass.filter((item)=> item!==value);
        setAllowedClass([...updateClass])
      }

    
  }

  const handleRegister = async () => {
    const formdata = {
      email,
      password,
      name,
      language,
      role,
     
    };

    if (role === "student") {
      formdata["classGrade"] = classGrade;
    } else {
      formdata["subject"] = subject;
      formdata["allowedClass"] = allowedClass
    }
 
    // Add your registration logic here

    try {
      const response = await axios.post("/user/register",{...formdata}, {withCredentials:true});

      if(response.data.success){
        alert("Registered Successfully")

        setName("");
        setEmail("");
        setPassword("");
        setLanguage("");
        setRole("");
        setSubject("");
        setClassGrade("");
        setAllowedClass([])
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50 bg-opacity-10 rounded shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <form>
        <label className="block mb-4">
          <span className="text-gray-900">Name:</span>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-900">Email:</span>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-900">Password:</span>
          <input
            className="mt-1 p-2 w-full border rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-900">Language:</span>
          <select
            className="mt-1 p-2 w-full border rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-900">Role:</span>
          <select
            className="mt-1 p-2 w-full border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </label>
        {role === "student" && (
          <label className="block mb-4">
            <span className="text-gray-900">Class:</span>
            <select
              className="mt-1 p-2 w-full border rounded"
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              required
            >
              <option>Select grade</option>
              {classes.map((item, idx) => (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        )}
        {role === "tutor" && (
          <>
            <label className="block mb-4">
              <span className="text-gray-900">Subject:</span>
              <select
                className="mt-1 p-2 w-full border rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option>Select subject</option>
                <option value="english">English</option>
                <option value="maths">Maths</option>
                <option value="science">Science</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-gray-900">Allowed Class:</span>
              <br />
              <div className=" grid grid-cols-2 gap-1">
                {classes.map((item, idx) => (
                  <div className="flex items-center" key={item+idx}>
                    <input
                      type="checkbox"
                      id={item}
                      name="allowedClass"
                      value={item}
                      checked={allowedClass.includes(item)}
                      onChange={handleAllowedClass}
                      className="mr-2"
                    />
                    <label htmlFor={item} className="text-sm">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </label>
          </>
        )}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-center mt-2">
          Already Register!{" "}
          <span
            className="text-blue-900 cursor-pointer"
            onClick={() => setIsLoginForm(true)}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export { LoginForm, RegisterForm };
