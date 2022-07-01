const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showErrorMessage = (input, message) => {
  const parent = input.parentElement;
  parent.className = 'form-control error';

  const small = parent.querySelector('small');
  small.innerHTML = message;
};

const showSuccessMessage = (input) => {
  const parent = input.parentElement;
  parent.className = 'form-control success';
};

const checkRequired = (...inputArray) => {
  inputArray.forEach((item) => {
    if (item.value.trim() === '') {
      showErrorMessage(item, `${firstLetterUppercase(item.id)} is required`);
    } else {
      showSuccessMessage(item);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min && input.value.length > 0) {
    showErrorMessage(input, `Username must be greater than ${min}`);
  } else if (input.value.length > max) {
    showErrorMessage(input, `Username must be less than ${max}`);
  }
};

const checkPasswordMatch = (password, password2) => {
  if (password.value !== password2.value) {
    showErrorMessage(password, 'Password not same');
    showErrorMessage(password2, 'Password not same');
  }
};

const firstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1, -1);
};

const isEmailValid = (input) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.toLowerCase())) {
    showSuccessMessage(input);
  } else {
    showErrorMessage(input, 'Email address not valid');
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired(username, email, password, password2);
  checkLength(username, 3, 5);
  checkLength(password, 3, 5);
  checkLength(password2, 3, 5);
  isEmailValid(email);
  checkPasswordMatch(password, password2);
});
