// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

const inputElement = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysData = document.querySelector("[data-days]");
const hoursData = document.querySelector("[data-hours]");
const minutesData = document.querySelector("[data-minutes]");
const secondsData = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  
    if (selectedDates[0] < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
},
};

options.onClose([options.defaultDate]);
flatpickr(inputElement, options);

let countDownInterval;

startBtn.addEventListener("click", () => {
  const endDate = flatpickr.parseDate(inputElement.value);
  startBtn.disabled = true;
  countDownInterval = setInterval(() => {
    const timeLeft = endDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(countDownInterval);
      daysData.textContent = "0";
      hoursData.textContent = "0";
      minutesData.textContent = "0";
      secondsData.textContent = "0";
      startBtn.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysData.textContent = addLeadingZero(days);
      hoursData.textContent = addLeadingZero(hours);
      minutesData.textContent = addLeadingZero(minutes);
      secondsData.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
