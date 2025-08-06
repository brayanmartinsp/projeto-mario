const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const coin = document.querySelector('.moeda'); 
const gameOverMessage = document.querySelector('#game-over');
const scoreDisplay = document.querySelector('#pontos');
const congratulationsMessage = document.createElement('div'); 


let pontos = 0;
let coinCollected = false; 



congratulationsMessage.textContent = "Parabéns! Voce Finalizou o Game  ";
congratulationsMessage.style.position = 'absolute';
congratulationsMessage.style.top = '50%';
congratulationsMessage.style.left = '50%';
congratulationsMessage.style.transform = 'translate(-50%, -50%)';
congratulationsMessage.style.fontSize = '40px';
congratulationsMessage.style.fontFamily = "ps" ;
congratulationsMessage.style.textAlign = 'center';
congratulationsMessage.style.color = 'red';
congratulationsMessage.style.display = 'none';
document.body.appendChild(congratulationsMessage);

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const updatepontos = () => {
    pontos += 10;
    scoreDisplay.textContent = `Pontos: ${pontos}`;

    
    if (pontos >= 15000) {
        congratulationsMessage.style.display = 'block'; 

       
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 2000);
    }
};

const checkCoinCollection = () => {
    const coinPosition = coin.offsetLeft; 
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 
    
    
    if (coinPosition <= 100 && !coinCollected && marioPosition < 80) {
        updatepontos(); 
        coinCollected = true; 

        coin.style.display = 'none';
    }

    
    if (coinPosition < 1) {
        coinCollected = false;
        
        coin.style.display = 'block';
        coin = document.createElement('.moeda');
    }
};


const gameOver = () => {
    gameOverOccurred = true;

    const currentRecord = parseInt(localStorage.getItem('record')) || 0;

   if (pontos > currentRecord) {
        localStorage.setItem('record', pontos);
   }


   
    mario.src = './imagens/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    gameOverMessage.style.display = 'block';
  

    setTimeout(() => {
         window.location.href = 'index.html';  
    }, 2000);
};


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

   
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
         
       pipe.style.left = `${pipePosition}px`;  
        gameOver(); 
        clearInterval(loop); 
    }

    checkCoinCollection(); 

}, 10); 

// document.addEventListener('keydown', (e) => {
//     if (e.code === 'Space' || e.code === 'ArrowUp') jump();
// });

// // ✅ Pulo com toque (corrigido)
// document.addEventListener('touchstart', (e) => {
//     e.preventDefault();
//     jump(); // chamando a função diretamente
// });

document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  jump();
});



 
const record = localStorage.getItem('record') || 0; 

const recordDisplay = document.querySelector('#record-display');
recordDisplay.textContent = `Recorde: ${record}`;




