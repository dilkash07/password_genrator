// inputSlider section
let dataLength = document.querySelector("[data-lengthNumber]");
let inputSlider = document.querySelector("[data-lengthSlider]");

inputSlider.value = 10;
dataLength.innerText = inputSlider.value;
inputSlider.addEventListener("input", () => {
  dataLength.innerText = inputSlider.value;
});

// genrate uppercase
const randomUpperCase = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};

// genrate lowercase
const randomLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// genrate numbers
const randomNumber = () => {
  return Math.floor(Math.random() * 10);
};

// genrate symbols
const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "?",
  "(",
  ")",
  "-",
  "+",
  "=",
];
const randomSybols = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// genrate random integer
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// checkcount
const inputCheckbox = document.querySelectorAll("input");

const checked = () => {
  let checkCount = "";
  inputCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  if (inputSlider.value < checkCount) {
    inputSlider.value = checkCount;
    dataLength.innerText = checkCount;
  }
};

// create password
const upperCaseCheckbox = document.querySelector("#uppercase");
const lowerCaseCheckbox = document.querySelector("#lowercase");
const numbersCheckbox = document.querySelector("#numbers");
const symbolsCheckbox = document.querySelector("#symbols");

const createPassword = () => {
  let password = "";
  checked();
  // if (upperCaseCheckbox.checked) {
  //   password += randomUpperCase();
  // }
  // if (lowerCaseCheckbox.checked) {
  //   password += randomLowerCase();
  // }
  // if (numbersCheckbox.checked) {
  //   password += randomNumber();
  // }
  // if (symbolsCheckbox.checked) {
  //   password += randomSybols();
  // }
  // return password;

  let funcArr = [];
  if (upperCaseCheckbox.checked) {
    funcArr.push(randomUpperCase);
  }
  if (lowerCaseCheckbox.checked) {
    funcArr.push(randomLowerCase);
  }
  if (numbersCheckbox.checked) {
    funcArr.push(randomNumber);
  }
  if (symbolsCheckbox.checked) {
    funcArr.push(randomSybols);
  }

  // compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining addition
  for (let i = 0; i < inputSlider.value - funcArr.length; i++) {
    let randIndex = randomInteger(0, funcArr.length);
    console.log("randindex" + randIndex);
    password += funcArr[randIndex]();
  }
  console.log(funcArr.length);
  return password;
};

// shuffle password
const shufflePassword = (array) => {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
};
const passwordshuffle = () => {
  password = shufflePassword(Array.from(createPassword()));
  return password;
};

// calculate strength
const indicator = document.querySelector("[data-indicator]");

//set strength circle color to grey
setIndicator("#ccc");

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (upperCaseCheckbox.checked) hasUpper = true;
  if (lowerCaseCheckbox.checked) hasLower = true;
  if (numbersCheckbox.checked) hasNum = true;
  if (symbolsCheckbox.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && inputSlider.value >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    inputSlider.value >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

// genrate password
const genrateButton = document.querySelector(".genrate-btn");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

genrateButton.addEventListener("click", () => {
  passwordDisplay.value = passwordshuffle();
  calcStrength();
});

// copied section
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});
