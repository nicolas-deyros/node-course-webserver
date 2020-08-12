//FETCH API TO LOG DATA TO THE APP
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msj1 = document.querySelector('#msj-1');
const msj2 = document.querySelector('#msj-2');

weatherForm.addEventListener('submit', (e) => {
  const location = search.value;

  msj1.textContent = 'Loading...';
  msj2.textContent = '';

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msj1.textContent = data.error;
      } else {
        msj1.textContent = data.location;
        msj2.textContent = `Son las ${data.clima.hora} hace una temperatura de ${data.clima.temperatura}, humedad del ${data.clima.humedad}`;
      }
    });
  });

  e.preventDefault();
});
