//hooks
let inputBox = document.querySelector("input");
let deck = document.querySelectorAll(".row0");

//media
let allAnswers = ["aaaa","tile","main","mare","hare","fair","care","lair","tear","link","wink","sink","body","head","feet","legs","eyes","free","tree","true","edge"];

let currentAnswer;
changeAnswer(); 

function changeAnswer(){
    currentAnswer = allAnswers[Math.floor((Math.random()*allAnswers.length))];
    // setTimer(inputBox.placeholder = "Guess the word",500);
}

//code
let numberOfTiles = 4;
let numberOfChances = 5;

let currentIndex = 0;
let currentRow= 0 ;

let waitTimeWin = 1000;
let waitTimeLoss = 500;

let streak = 0;

inputBox.addEventListener('keypress', function(e){
    inputBox.value = '';    
    if(e.key == "Enter"){
        if(currentIndex == numberOfTiles){
            //evaluate tiles for similarities
            changeTiles();
            if (fetchDeckString() == currentAnswer){
                victory();
                changeAnswer();
                return;
            }
            currentIndex = 0;
            if(currentRow == numberOfChances-1){
                defeat();
                changeAnswer();
                return;
            }
            nextRow();
            textBoxMessage(0);
            tryAgain();
            return;
        }
        else{
            return;
        } 
    }
    if(e.key == " "){
        return;
    }
    console.log(e.key);
    if(currentIndex != numberOfTiles){
        deck[currentIndex].textContent = e.key;
        currentIndex++;
    }
})

function fetchDeckString(){
    let r = "";
    for(let i = 0 ; i < numberOfTiles; i++){
        r += deck[i].textContent;
    }
    return r;
}

function clearDeck(){
    for(let i = 0 ; i < numberOfTiles; i++){
        deck[i].textContent = "";
    }
}
function allClear(){
    for(let i = 0 ; i < numberOfChances; i++){
        deck = document.querySelectorAll(`.row${i}`);
        clearDeck();
        colorReset();
    }
    deck = document.querySelectorAll(".row0");
    console.log(deck);
    currentIndex=0;
    currentRow=0;
}

function allChange(classname){
    for(let i = 0 ; i < numberOfChances; i++){
        deck = document.querySelectorAll(`.row${i}`);
        for(let i = 0 ; i < numberOfTiles; i++){
            deck[i].classList.remove("correct","incorrect","misplaced")
            deck[i].classList.add(classname);
        }
    }
}

function nextRow(){
    if(currentRow <numberOfChances){
        deck = document.querySelectorAll(`.row${++currentRow}`);
    }
    else{
        console.log("Rows Limit Reached")
    }
}

function changeTiles(){
   for(let i = 0 ; i < numberOfTiles; i++){
    deck[i].classList.add("whiteText")
    // inputBox.placeholder = "Guess the word"
    let misplacedStatus = false;
    if(deck[i].textContent == currentAnswer[i]){
        deck[i].classList.toggle("correct");
        continue;
    }
    for(let j = 0; j < numberOfTiles; j++){
        if(deck[i].textContent == currentAnswer[j]){
            deck[i].classList.toggle("misplaced");
            misplacedStatus = true;
            break;
        }
    }
    if(misplacedStatus == true){
        continue;
    }
    else{
        deck[i].classList.toggle("incorrect");
    }
   }
};

function colorReset(){
    for(let a = 0 ; a < numberOfTiles; a++){
        deck[a].classList.remove("correct","incorrect","misplaced");
        deck[a].classList.remove("whiteText")
    }
}

function updateStreak(){
    let score = document.querySelector("#score");
    if(streak<10){
        score.textContent = `0${streak}`    
    }
    else{
        score.textContent = streak;
    }
}
function textBoxMessage(statusNumber){
    //done but wrong. attempts left
    if(statusNumber == 0){
        let motivation = ["You can do it!","Try Again","Gave Up that easily?","Its just a 4 letter word dude","Trust me its easy, not that easy but easy","It got easier","How easier can it get","Try a vovel?","Vovels pay off","You canz doez itz","Slow and steady","No timers here, try again?","One, Two, Three, you can do it","Well tried good Sir, Again!", "Forward March!, We can do it!", "Not Today, We will do it!","Da Da, Da Da Da","You have the higher ground now"];
        inputBox.placeholder = `${motivation[Math.floor(Math.random()*motivation.length)]}....`;
        return
        }
    //victory
    else if(statusNumber == 1){
        let success = ["Well Guessed","Well Calculated","Well letterd","Nicely worded","Could'nt have typed better myslef","You are good at this!","Pump those streak numbers up","Up! Up! Up! Make the Score Go Up!","Nice!","Well Done","Good Job","Job done Good!","Good Good Good!", "Nice!","Nice.....","NICE!!!","Played Well you did"]
        inputBox.placeholder = `${success[Math.floor(Math.random()*success.length)]} ☆`;
        return
    }
    else{
        let defeatMessages = ["You Lost","The Streak is gone", "Defeat","DEEEFETED","YOU LOST","...."];
        inputBox.placeholder = `${defeatMessages[Math.floor(Math.random()*defeatMessages.length)]} :(`
        return;
    }
    
}

function victory(){
    allChange("correct");
    textBoxMessage(1);
    setTimeout(victoryRoutine,waitTimeWin);
    setTimeout(function(){
        inputBox.placeholder.value = `Round${streak}`;
        },2000)

    function victoryRoutine(){
        victoryCelebration();
        alert("You Won!")
        allClear();  
        colorReset();
        streak++;
        updateStreak();
        
    }
    
}
function defeat(){
    allChange("incorrect");
    textBoxMessage(3);
    setTimeout(defeatRoutine,waitTimeLoss);
    function defeatRoutine(){
        alert("You Lost!")
        allClear();  
        colorReset();
        streak = 0;
        updateStreak();
    }
}
function victoryCelebration(){
    let back = document.querySelectorAll("window,.tile,h1,h2");
    setTimeout(()=>{
        back.classList.add("correct");
        setTimeout(()=>{
            back.classList.remove("correct")
        },200)
    },50)

}
function defeatCelebration(){
    
}