import QuackParser from './node_modules/ducky-css/quack.js';

document.addEventListener('DOMContentLoaded', function() {
    const quack = new QuackParser();
    fetch('main.quack')
    .then(response => response.text())
    .then(data => {
        quack.quack(data);
    })
    .catch(error => {
      console.error('Error fetching file:', error);
    });
});
