import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function successToast(message: string) {
  Toastify({
    text: message,
    duration: 4000,
    gravity: 'top',
    position: 'right',
    style: {
      background: '#29BE43',
    },
  }).showToast();
}

export function errorToast(message: string) {
  Toastify({
    text: message,
    duration: 4000,
    gravity: 'top',
    position: 'right',
    style: {
      background: '#EF4444',
    },
  }).showToast();
}
