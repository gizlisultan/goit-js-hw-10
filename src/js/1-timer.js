// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const date = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")
const days = document.querySelector("[data-days]")
const hours = document.querySelector("[data-hours]")
const minutes = document.querySelector("[data-minutes]")
const seconds = document.querySelector("[data-seconds]")




const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
  
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < Date.now()) {
            iziToast.show({
                titel: "",
                message: "Please choose a date in the future!",
            })
        } else {
            startBtn.disabled = false;
        }
    }
};

 let userSelectedDate;

flatpickr(date, options);

startBtn.disabled = true;

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

startBtn.addEventListener("click", e => {
    const intervalID = setInterval(() => {
        const diff = userSelectedDate - Date.now();
        const time = convertMs(diff);
        if (diff <= 0) {
            clearInterval(intervalID)
        } else {
            days.textContent = addLeadingZero(time.days);
            hours.textContent = addLeadingZero(time.hours);
            minutes.textContent = addLeadingZero(time.minutes);
            seconds.textContent = addLeadingZero(time.seconds)
            
        }
    }, 1000, startBtn.disabled = true, date.disabled = true)
})
function addLeadingZero(value) {
    const numb = String(value)
    return numb.length < 2 ? numb.padStart(2, "0") : numb;

}