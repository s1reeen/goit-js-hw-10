import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import svgError from "/img/bi_x-octagon.svg";

let userSelectedDate;
const timeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

startButton.setAttribute('disabled', '');
timeInput.removeAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      startButton.setAttribute('disabled', '');
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        iconUrl: svgError,
      });
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  timeInput.setAttribute('disabled', '');
  startButton.setAttribute('disabled', '');
  setInterval(() => {
    if (userSelectedDate > Date.now()) {
      daysTimer.textContent = addLeadingZero(
        convertMs(userSelectedDate - Date.now()).days
      );
      hoursTimer.textContent = addLeadingZero(
        convertMs(userSelectedDate - Date.now()).hours
      );
      minutesTimer.textContent = addLeadingZero(
        convertMs(userSelectedDate - Date.now()).minutes
      );
      secondsTimer.textContent = addLeadingZero(
        convertMs(userSelectedDate - Date.now()).seconds
      );
    } else {
      return;
    }
  }, 1000);
});
