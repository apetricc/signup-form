import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
//what's in a test? we have 'test' keyword/method with 2 params: a string describing the test, and a callback function
// the callback func. will contain all the logic of our test/tests, and usually these 3 steps:
// 1. render the element we want to test, 
// 2. find the element(s) we want to test, 
// 3. make some assertion (PASS/FAIL)

//using a beforeEach hook to render the app before each test is run: 
beforeEach(() => {
  render(<App />);
});

//helper function to type into our forms
// passing in an object with the email, pw, & confirmPW
//if we do pass in a field, we want to find that field in the DOM, & type into it
const typeIntoForm = ({ email, password, confirmPassword }) => {
  //find the emailInputElement in the DOM so we can userEvent.type INTO it
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}; // typeIntoForm({})

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  });
  userEvent.click(submitBtnElement);
};

describe("Test the App components.", () => {

  //new test block for testing that we can give input to our fields
  test('Should be able to type in an email -pretty', () => {
    const { emailInputElement } = typeIntoForm({
      email: "selena@gmail.com"
    });
    expect(emailInputElement.value).toBe("selena@gmail.com");
  });

  test('Should be able to type in a password -pretty', () => {
    const { passwordInputElement } = typeIntoForm({
      password: "password"
    });
    expect(passwordInputElement.value).toBe("password");
  });
  test('Should be able to type in confirmed password -pretty', () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: "password"
    });
    expect(confirmPasswordInputElement.value).toBe("password");
  });

  describe("Test the error handling in the App.", () => {
    test("should show email error message on invalid email -pretty", () => {
      // const emailErrorElement = screen.queryByText(
      //   /the email you input is invalid/i
      // );
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      typeIntoForm({
        email: "selenagmail.com"
      });
      clickSubmit();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show password error message on invalid password -pretty", () => {
      expect(
        screen.queryByText(/The password should be contain 5 or more characters/i)
      ).not.toBeInTheDocument();
      //must enter VALID email & INVALID password
      typeIntoForm({
        email: "selena@gmail.com",
        password: "pass"
      });
      clickSubmit();
      expect(
        screen.queryByText(/The password should be contain 5 or more characters/i)
      ).toBeInTheDocument();
    });

    test("should show confirmPassword error message on invalid confirmPassword -pretty", () => {
      expect(
        screen.queryByText(/The confirmed password does not match the password you entered dummy/i)
      ).not.toBeInTheDocument();
      //must enter VALID email & VALID password & INVALID confirm-password
      typeIntoForm({
        email: "selena@gmail.com",
        password: "password",
        confirmPassword: "wrongpassword"
      });
      clickSubmit();
      expect(
        screen.queryByText(/the confirmed password does not match the password you entered dummy/i)
      ).toBeInTheDocument();
    });

    test("Should not show error on valid input. -pretty", () => {
      //must enter ALL VALID for email, password, & confirm-password
      typeIntoForm({
        email: "selena@gmail.com",
        password: "password",
        confirmPassword: "password"
      });
      clickSubmit();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The password should be contain 5 or more characters/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the confirmed password does not match the password you entered dummy/i)
      ).not.toBeInTheDocument();
    });
  });

});


//*********** ALL OUR OLD UGLY REPETITIVE TESTS WE WROTE 1ST ********************************* */



//test that text box is empty to start with: 
test('inputs should be empty intially', () => {
  //render the component we want to test in our 'virtual DOM'
  // render(<App />)
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
test('Should be able to type in an email -UGLY', () => {
  //this checks that it has role 'textbox' and also a label 'email'
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");
});
test('Should be able to type in a password -UGLY', () => {
  //this checks that it has role 'password' and also a label 'password'
  const passwordInputElement = screen.getByLabelText("Password", {
    name: "password"
  });
  userEvent.type(passwordInputElement, "password");
  expect(passwordInputElement.value).toBe("password");
});
test('Should be able to type in confirmed password -UGLY', () => {
  //this checks that it has role 'password' and also a label '?'
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password", {
    name: "confirm-password"
  });
  userEvent.type(confirmPasswordInputElement, "password");
  expect(confirmPasswordInputElement.value).toBe("password");
});

test("should show email error message on invalid email -UGLY", () => {
  // check that the error isn't there on render of virt DOM; can't use "getBy", must use "queryBy"
  //* 1st thing we're doing is querying it
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );// ** this will be null b/c it doesn't exist 
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  });
  //***then we're asserting that it's not there, which will pass b/c it's null, duh doy
  expect(emailErrorElement).not.toBeInTheDocument();

  //must first enter a VALID email, then invalid password; 
  userEvent.type(emailInputElement, "selenagmail.com")
  userEvent.click(submitBtnElement)

  //expect(element).toBeInTheDocument is a matcher that looks if the thing is in the virtual DOM
  //****but then we're trying to assert that the same var will be in the document... which it won't be.
  //**** ∴, we need to initialize it again, commenting this original call that failed: 
  // expect(emailErrorElement).toBeInTheDocument();
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );// this time it shouldn't be null, right? 
  //so we should be able to assert that it's there now:
  expect(emailErrorElementAgain).toBeInTheDocument();
}); //"should show email error message on invalid email"


/** ********************************************************** */
//test password--> if (validEmail && invalidPassword) --> 'pw should be 5 or more chars'

test("should show password error message on invalid password -UGLY", () => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordErrorElement = screen.queryByText(
    /The password should be contain 5 or more characters/i
  );//will be null
  const passwordInputElement = screen.getByLabelText("Password");
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  });
  // here we haven't entered anything, haven't clicked on 'submit' button yet;  passwordErrorElement should be 'null'
  expect(passwordErrorElement).not.toBeInTheDocument();

  //must enter VALID email & INVALID password
  userEvent.type(emailInputElement, "selena@gmail.com")
  userEvent.type(passwordInputElement, "pass")
  userEvent.click(submitBtnElement)

  const passwordErrorElementAgain = screen.queryByText(
    /The password should be contain 5 or more characters/i
  );
  // we entered a valid email, and invalid pw; We should see the invalid password error message in the DOM
  expect(passwordErrorElementAgain).toBeInTheDocument();
}); //"should show password error message on invalid password"



// IF (valid email && valid password && INVALID confirmPassword) 

test("should show confirmPassword error message on invalid confirmPassword -UGLY", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /The confirmed password does not match the password you entered dummy/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  });

  //haven't entered any input yet, should not have confirmPassword error or any error yet; 
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  //must enter VALID email & VALID password & INVALID confirm-password
  userEvent.type(emailInputElement, "selena@gmail.com")
  userEvent.type(passwordInputElement, "password")
  userEvent.type(confirmPasswordInputElement, "wrongpassword")
  userEvent.click(submitBtnElement)

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the confirmed password does not match the password you entered dummy/i
  );
  //now we should see the confirm-password error in the DOM
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
}); //"should show confirmPassword error message on invalid confirmPassword"

test("Should not show error on valid input. -UGLY", () => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  });

  //must enter ALL VALID for email, password, & confirm-password
  userEvent.type(emailInputElement, "selena@gmail.com")
  userEvent.type(passwordInputElement, "password")
  userEvent.type(confirmPasswordInputElement, "password")
  userEvent.click(submitBtnElement)

  //confirming that none of the error messages are in the DOM
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /The password should be contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /the confirmed password does not match the password you entered dummy/i
  );
  //assert that each error element not in the DOM  aka: 'ASSERTING THE HAPPY PATH'
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
}); //"Should not show error on valid input."


// default test: 
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


