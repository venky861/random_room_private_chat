export const validateRegister = (name, email, password1, password2) => {
  const errors = []
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!name && !email && !password1 && !password2) {
    errors.push("Please enter all the fields ")
  } else {
    if (!name) {
      errors.push("Name cannot be empy")
    }
    if (!regexp.test(email)) {
      errors.push("Please enter a valid Email Address")
    }
    if (password1.length < 4 || password2.length < 4) {
      errors.push("Password should be greater than 4 characters")
    }
  }

  if (password1 !== password2) {
    errors.push("Password does not match")
  }

  return errors
}

export const validateLogin = (email, password1) => {
  const errors = []
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regexp.test(email)) {
    errors.push("Please enter a valid Email Address")
  }
  if (password1.length < 4) {
    errors.push("Password should be greater than 4 characters")
  }

  return errors
}
