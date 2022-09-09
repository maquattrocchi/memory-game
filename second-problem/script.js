const container = document.getElementById('grid');
const result = document.getElementById('result');
const endGame = document.getElementById('end-game');
const button = document.getElementById('play-again');
const timerContainer = document.getElementById('timer-container');
button.addEventListener('click', startGame); //add event listener to start the game

const cardNumber = 12; //number of cards
const timerSec = 59; //duration of the game
const timeToShowCard = 1500; //time to show cards at the start of the game
const numOfCol = 3; //to change number of column
let flippedCards = 0; //to know number of flipped cards
let matchFind = 0; //to know number of match find
let countdown; //to set and clear timer
let cardColors = []; //array to put the random color

function startGame(){
    container.innerHTML = '';
    timerContainer.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${numOfCol}, 1fr)`;
    endGame.classList.remove('block');
    matchFind = 0;
    createCard();
    setTimeout(() => {
        flipAllCards();
    }, 2000);
}

//function to find random color
function randomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

//function to generate different colors for the card
function generateColors(){
    //create an array of 6 colors
    let i = 0;
    const colors = [];
    while(i < cardNumber / 2){
        let color = randomColor();
        if(!colors.includes(color)){
            colors.push(color);
            i++;
        }
    }
    console.log(colors);
    //create an array by joining the color array twice
    cardColors = [...colors, ...colors];
    //sort the array in a random way
    cardColors = shuffleArray(cardColors);
}

//function to shuffle array usign the Fisher-Yates shuffling algorithm.
function shuffleArray(array){
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const originalEl = clonedArray[i];
        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = originalEl;
    }
    return clonedArray;
}

//function to create the single card
function createCard(){
    generateColors()
    for(let i = 0; i < cardNumber; i++){
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.addEventListener('click', flipCard);
    
        const cardFront = document.createElement('div');
        cardFront.setAttribute('class', 'card-front');
        cardFront.innerHTML = `${i+1}`;

        const cardBack = document.createElement('div');
        cardBack.setAttribute('class', 'card-back');
        cardBack.style.backgroundColor = `#${cardColors[i]}`;
        
        card.append(cardFront, cardBack);
     
        container.append(card);
    }
    const backs = document.querySelectorAll('.card-back');
    for(let i = 0; i < backs.length; i++){
        backs[i].style.backgroundColor = `#${cardColors[i]}`;
    }
}

//flip all the cards
function flipAllCards(){
    const cards = document.querySelectorAll('.card');

    cards.forEach(el => {
        el.classList.add('rotate');
    });

    setTimeout(() => {
        cards.forEach(el => {
            el.classList.remove('rotate');
        });
        setTimer(timerSec) //to start countdown
    }, timeToShowCard);
} 

//flip the card to verify the match
function flipCard() {
    this.classList.add('rotate');
    this.removeEventListener('click', flipCard);
    flippedCards++;
    if (flippedCards == 2){
        cards = document.querySelectorAll('.rotate:not(.match)');
        flippedCards = 0;
        cards.forEach(el => {
            el.addEventListener('click', flipCard);
        });
        checkMatch(cards);
    }
}

//check match between two cards
function checkMatch(cards){
    //take the two cards to verify if are the same
    const card1 = cards[0];
    const card2 = cards[1];
    const back1 = card1.children[1].getAttribute('style');
    const back2 = card2.children[1].getAttribute('style');
    if(back1 === back2){
        clearInterval(countdown);

        matchFind++;
        console.log(matchFind)
        const match = document.getElementById('match'); //when the card match
        const cardMatched = document.getElementById('card-matched'); //to change the bgc of the card matched

        card1.classList.add('match');
        card2.classList.add('match');
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);

        //take the time to restart the timer at the right time
        time = document.getElementById('timer-container').innerHTML;

        if(matchFind < 6){
            setTimeout(() => {
                cardMatched.style.cssText = back1;
                match.classList.add('block');
                setTimeout(() => {
                    match.classList.remove('block');
                    setTimer(time - 1);
                }, 1600);
            }, 600);
        }

        gameWon();
    }else{
        setTimeout(function() {
            card1.classList.remove('rotate');
            card2.classList.remove('rotate');
        }, 700);
    }
}

//function to set the timer of the game
function setTimer(sec){
    countdown = setInterval(function(){
        timerContainer.innerHTML= sec;
        sec--;
        if (sec < 0) {
            clearInterval(countdown);
            gameLost();
        }
    }, 1000);
}

function gameWon(){
    if(matchFind == cardNumber / 2){
        clearInterval(countdown);
        setTimeout(function() {
            endGame.classList.add('block');
            result.innerHTML = 'Congratulations! You won!';
        }, 500);
    }
}

function gameLost(){
    const cards = document.querySelectorAll('.card:not(.match)');
    cards.forEach(el => {
        el.classList.add('rotate')
    });
    endGame.classList.add('block');
    result.innerHTML = "Oh no, sorry! You lost!";
}

startGame()