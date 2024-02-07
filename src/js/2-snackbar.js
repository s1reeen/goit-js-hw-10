// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import svgError from '/img/bi_x-octagon.svg';
import svgSuccess from '/img/group.svg';

const fulfilledButton = document.querySelector("input[value='fulfilled']");
const ourForm = document.querySelector('.form');
const rejectedButton = document.querySelector("input[value='rejected']");

document.querySelector('button').addEventListener('click', event => {
  event.preventDefault();
  const delay = Number(document.querySelector("input[name = 'delay']").value);
  const isFulfilledBull = fulfilledButton.checked;
  const isRejectedBull = rejectedButton.checked;
  ourForm.reset();
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilledBull) {
        resolve(delay);
      }
      if (isRejectedBull) {
        reject(delay);
      }
    }, delay);
  })
    .then(() => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: svgSuccess,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#59a10d',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
      });
    })
    .catch(() => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: svgError,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
      });
    });
});
