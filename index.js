const billInputEl = document.getElementById("bill-input");
const customTipInputEl = document.getElementById("custom-tip-input");
const numberOfPeopleInputEl = document.getElementById("number-of-people");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");
const resetBtnEl = document.getElementById("reset-btn");
const errorBorder = "1px solid red";
const allRadioElements = document.querySelectorAll('input[type="radio"]');
const allNumberInputs = document.querySelectorAll('input[type="number"]');

const calculateTip = () => {
  const billAmount = checkInput(billInputEl);
  const numberOfPeople = checkInput(numberOfPeopleInputEl);
  const customTipValue =
    customTipInputEl.value > 0 ? parseFloat(customTipInputEl.value) : null;
  let tipPercentage = 0;

  const checkedRadioEl = document.querySelector('input[type="radio"]:checked');
  if (checkedRadioEl && customTipInputEl.value === "") {
    tipPercentage = parseInt(checkedRadioEl.value) / 100;
  } else if (customTipValue) {
    tipPercentage = customTipValue / 100;
    allRadioElements.forEach((radio) => {
      radio.checked = false;
    });
  } else {
    tipPercentage = 0;
  }

  if (billAmount > 0 && numberOfPeople > 0) {
    const tipAmount = ((billAmount * tipPercentage) / numberOfPeople).toFixed(
      2
    );
    const totalAmount = (
      billAmount / numberOfPeople +
      parseFloat(tipAmount)
    ).toFixed(2);
    renderTipAmount(tipAmount, totalAmount);
  } else {
    renderTipAmount(0.00, 0.00);
  }
};

const renderTipAmount = (tipAmount, totalAmount) => {
  tipAmountEl.textContent = `$${tipAmount}`;
  totalAmountEl.textContent = `$${totalAmount}`;
};

const checkInput = (element) => {
  const value = parseFloat(element.value);
  if (value <= 0) {
    element.style.border = errorBorder;
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").textContent = "Can't be zero or negative";
    return null;
  } else {
    element.style.border = "none";
    document.querySelector(".error").style.display = "none";
    return value;
  }
};

const reset = () => {
  allRadioElements.forEach((radio) => {
    radio.checked = false;
  });
  billInputEl.value = "";
  numberOfPeopleInputEl.value = "";
  customTipInputEl.value = "";
  tipAmountEl.textContent = `$0.00`;
  totalAmountEl.textContent = `$0.00`;
  billInputEl.style.border = "none";
  numberOfPeopleInputEl.style.border = "none";
  document.querySelector(".error").style.display = "none";
};

resetBtnEl.addEventListener("click", reset);

allNumberInputs.forEach((input) => {
  input.addEventListener("input", () => {
    calculateTip();
  });
});

allRadioElements.forEach((radio) => {
  radio.addEventListener("change", () => {
    calculateTip();
  });
});
