const contentDiv = document.querySelector("#content");

const form = document.createElement("div");
form.classList.add("form");
form.innerHTML = `
<svg class="close-btn" id="close-btn">
    <use xlink:href="#close">
</svg>

<div>
    <p class="privacy-notice"><span class="underline">Privacy Notice:</span> We do not store any of your data. The data requested here is just used for the sake of input.</p>
</div>

<div class="dob">
    <label class="dob__heading" for="dob">Select your date of birth</label>
    <br />
    <input class="dob__input" id="dob__input" type="date" name="dob" />
</div>

<div class="lucky-num">
    <label class="lucky-num__heading" for="lucky-num"
    >Enter your lucky number</label
    >
    <br />
    <input
        class="lucky-num__input"
        id="lucky-num__input"
        type="number"
        name="lucky-num"
    />
</div>

<button class="check-btn" id="check-btn">Check</button>

<div id="res"></div>

`;

const formLink = document.querySelector("#form-link");

const heroText = document.querySelector("#hero-txt");

const partyPopperLeft = document.createElement("div");
partyPopperLeft.innerHTML = `
  <svg class="party-popper-left">
      <use xlink:href="#party-popper" />
  </svg>`;

const partyPopperRight = document.createElement("div");
partyPopperRight.innerHTML = `
  <svg class="party-popper-right">
      <use xlink:href="#party-popper" />
  </svg>`;

const congratDiv = document.createElement("div");
congratDiv.classList.add("congrats");
congratDiv.innerHTML = `
  <h1>Congratulations ! Your Birthday is Lucky.</h1>
  `;

const unluckyDiv = document.createElement("div");
unluckyDiv.classList.add("unlucky");
unluckyDiv.innerHTML = `
  <h1>We're sorry to say that it's unlucky :(</h1>
    `;

const errorDiv = document.createElement("div");
errorDiv.classList.add("error");

formLink.addEventListener("click", event => {
  event.preventDefault();
  heroText.style.display = "none";
  contentDiv.appendChild(form);
  const resDiv = document.querySelector("#res");
  partyPopperLeft.remove();
  partyPopperRight.remove();
  congratDiv.remove();
  unluckyDiv.remove();
  errorDiv.remove();

  const dob = document.querySelector("#dob__input");
  const luckyNo = document.querySelector("#lucky-num__input");
  const checkBtn = document.querySelector("#check-btn");

  dob.value = "";
  luckyNo.value = "";

  checkBtn.addEventListener("click", () => {
    partyPopperLeft.remove();
    partyPopperRight.remove();
    congratDiv.remove();
    unluckyDiv.remove();
    errorDiv.remove();
    const dobVal = dob.value;
    const luckyNoVal = parseInt(luckyNo.value);
    if (dobVal.trim() === "") {
      errorDiv.innerHTML = `<h1>Please enter a valid date</h1>`;
      resDiv.appendChild(errorDiv);
    } else if (luckyNo.value === "") {
      errorDiv.innerHTML = `
      <h1>Please enter a lucky number</h1>
      <h1>It helps us to give you an accurate result.</h1>
      `;
      resDiv.appendChild(errorDiv);
    } else {
      const WHOLE_NUMS = "0123456789";
      let digitSum = 0;
      for (let charIndex = 0; charIndex < dobVal.length; charIndex++) {
        const char = dobVal.charAt(charIndex);

        if (WHOLE_NUMS.indexOf(char) > -1) {
          const digit = parseInt(char);
          digitSum += digit;
        }
      }
      if (digitSum % luckyNoVal === 0) {
        document.body.appendChild(partyPopperLeft);
        document.body.appendChild(partyPopperRight);
        resDiv.appendChild(congratDiv);
      } else resDiv.appendChild(unluckyDiv);
    }
  });
  
  const closeBtn = document.querySelector("#close-btn");

  closeBtn.addEventListener("click", () => {
    heroText.style.display = "block";
    form.remove();
    partyPopperLeft.remove();
    partyPopperRight.remove();
  });
});
