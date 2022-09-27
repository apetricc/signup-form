import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

// default test: 
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//what's in a test? we have 'test' keyword/method with 2 params: a string describing the test, and a callback function
// the callback func. will contain all the logic of our test/tests, and usually these 3 steps:
// 1. render the element we want to test, 
// 2. find the element(s) we want to test, 
// 3. make some assertion (PASS/FAIL)

//test that text box is empty to start with: 
test('inputs should be empty intially', () => {
  //render the component we want to test in our 'virtual DOM'
  render(<App />)
  // next step, find the input elements we want to test-- query for them
  // how do we do that ..?  see the RTL 'query' docs
  const emailInputElement = screen.getByRole("textbox");
  
  //for password using a regex that looks for 'password' in some form within the element: 
  const passwordInputElement = screen.getByLabelText("Password");
  //for 'confirm password' input field, another regex used here
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  
  // expecting it to be empty test/assertion for all the input fields (initially anyway): 
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");


});

//new test block for testing that we can give input to our fields
test('Should be able to type in an email', () => {
  render(<App />)
  //this checks that it has role 'textbox' and also a label 'email'
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");



  
});

