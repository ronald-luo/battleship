document.querySelector('h1').addEventListener('click', () => {
    window.location = '/';
});

document.querySelector('.rotate-button').addEventListener('click', game.rotateShip);