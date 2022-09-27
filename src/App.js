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


  const handleChange = (myEvent) => {
    setSignInput({
      ...signupInput,
      [myEvent.target.name]: myEvent.target.value,
    });
  };//handleChange

  const handleClick = (myEvent) => {
    myEvent.preventDefault();
    if(!validator.isEmail(signupInput.email)) {
      //throw error
      return setError("The email you input is invalid")
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
            className='form-control'
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
            className='form-control'
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
        <button type="submit" className='btn btn-primary' onclick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;
