import logo from './logo.svg';
import './App.css';
import { useState } from "react"
import validator from 'validator';

function App() {
  
  //inside the App, but not the return statement/rendering part
  const [signupInput, setSignInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setSignInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };//handleChange

  const handleClick = (e) => {
    e.preventDefault();
    // alert("you clicked!")
    if(!validator.isEmail(signupInput.email)) {
      
      //throw error
      return setError("The email you input is invalid");
    }//if email invalid
    else if (5 > (signupInput.password.length)) {
            return setError("The password should be contain 5 or more characters.");
        }
    else if (signupInput.confirmPassword !== signupInput.password) {
        console.log("password and confirmpassword mismatch")
        return setError("The confirmed password does not match the password you entered dummy");
    }    

  };//handleClick

  return (
    // add a class name and 'margin y' of 5, aka "my-5"
    <div className="container my-5">
      <form>
        {/* add margin bottom of 3, aka "mb-3" */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className='form-control'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;
