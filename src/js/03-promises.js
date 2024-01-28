import Notiflix from "notiflix";

const formInput = document.querySelector(".form");

formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const delay = parseInt(formData.get("delay"), 10);
  const step = parseInt(formData.get("step"), 10);
  const amount = parseInt(formData.get("amount"), 10);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay+i*step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}