// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");




const makePromise = ({ value ,delay }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault()
  const delay = form.delay.value;
  const value = form.state.value;
    makePromise({ value , delay})
        .then(value =>
            iziToast.success({
                title: '',
                message: `Fulfilled promise in ${delay} ms!`,
                
            }))

        .catch(delay => iziToast.error({
            title: '',
            message: `Rejected promise in ${delay} ms!`,
            
        }
        )), form.reset()
}) 