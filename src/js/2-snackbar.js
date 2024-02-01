// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");




const makePromise = ({ value ,delay }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value === 'fulfilled') {
                resolve(value);
            } else {
                reject(value);
            }
        }, delay);
    });
}

form.addEventListener("click", e => {
    e.preventDefault()
  const delay = form.delay.value;
  const value = form.state.value;
    makePromise({ value ,delay})
        .then(value =>
            iziToast.show({
                title: '✔️',
                message: `Fulfilled promise in ${delay} ms!`,
            }))

        .catch(error => iziToast.show({
            title: '❌',
            message: `Rejected promise in ${delay} ms!`
        }
        )),delay,  form.reset()
}) 