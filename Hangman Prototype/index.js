const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters-container');

const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const popup_container = document.getElementsByClassName('popup');

const playEasy = document.getElementById('play-buttonE');
const playMid = document.getElementById('play-buttonM');
const playHard = document.getElementById('play-buttonH');
const playImp = document.getElementById('play-buttonI');

const figureParts=document.querySelectorAll(".figure-part");

const loseStat = document.getElementById('loseVal')
const winStat = document.getElementById('winVal')

const easyWords = ['above', 'about', 'baby', 'both', 'cucumber', 'cheese', 'decrease', 'example', 'famous', 'forget', 'game', 'green',
                'healthy', 'holiday', 'increase', 'jump', 'knife', 'leave', 'machine', 'never', 'ocean', 'picture', 'photo', 'queen', 
                'radio', 'science', 'table', 'together', 'understand', 'vegetable', 'without', 'wild', 'yesterday', 'zero' ]

const midWords = ['misspell', 'pharaoh', 'weird', 'intelligence', 'pronunciation', 'homogenous', 'absence', 'abstain', 'acknowledgment',
                'adequate', 'arbitrary', 'articulation', 'benevolent', 'brazen', 'capacious', 'cognitive', 'coherence', 'commemorate', 
                'condescending', 'delineate', 'eloquent', 'encompass', 'frugality', 'illegitimate', 'inalienable', 'mayhem', 'omnipotent',
                'rehabilitation', 'stagnant', 'threshold', 'xenophobia', 'defibrillator']

const hardWords = ['aberration', 'laudatory', 'onomatopoeia', 'camaraderie', 'egregious', 'idiosyncratic', 'vicissitude']

const impossibleWords = ['jazz', 'quiz', 'zinc', 'onyx', 'lymph', 'rhythm', 'oat', 'buzzed', 'demagogue', 'etcetera']

let selectedWord = easyWords[Math.floor(Math.random()* easyWords.length)];
finalMessage.innerHTML='Choose a mode'

const cL=[]
const wL=[]

var winVal = 0
var loseVal = 0

$("#play-buttonE").click(function(){
    finalMessage.innerHTML='';
    cL.splice(0);
    wL.splice(0);
    selectedWord = easyWords[Math.floor(Math.random()* easyWords.length)];
    displayword();
    updatewrongLetters();
    popup.style.display="none";
})

$("#play-buttonM").click(function(){
    finalMessage.innerHTML='';
    cL.splice(0);
    wL.splice(0);
    selectedWord = midWords[Math.floor(Math.random()* midWords.length)];
    displayword();
    updatewrongLetters();
    popup.style.display="none";
});

$("#play-buttonH").click(function(){
    finalMessage.innerHTML=''
    cL.splice(0);
    wL.splice(0);
    selectedWord = hardWords[Math.floor(Math.random()* hardWords.length)];
    displayword();
    updatewrongLetters();
    popup.style.display="none";
});

$("#play-buttonI").click(function(){
    finalMessage.innerHTML='';
    cL.splice(0);
    wL.splice(0);
    selectedWord = impossibleWords[Math.floor(Math.random()* impossibleWords.length)];
    displayword();
    updatewrongLetters();
    popup.style.display="none";
});

//show hidden word

//split transforms a string to an array
function displayword(){
    word.innerHTML=`${selectedWord.split('')
        .map((letter) => `<span class="letter">
            ${cL.includes(letter)? letter:''}
            </span>`
            )
        .join('')}
        `;
    
        const innerword = word.innerText.replace(/\n/g,'')
        // It's a regex expression telling to replace \n i.e newline with string something globally.

        if (innerword==selectedWord){
            finalMessage.innerText='Congratulations! You have won!';
            popup.style.display='flex';
            winVal++;
            winStat.innerHTML = `win: ${winVal}`
        }
}

//update wrong letters
function updatewrongLetters(){
    //display wrong letters
    wrongLetters.innerHTML=`
    ${wL.map((letter)=>`<span>${letter}</span>`)}`;
    figureParts.forEach((part,index)=>{
        const errors = wL.length;

        if(index < errors){
            part.style.display ='block';
        }else{
            part.style.display='none';
        }
    });

    //check if lost
    if(wL.length == figureParts.length){
        finalMessage.innerHTML='You have lost the Game.';
        popup.style.display='flex';
        word.innerHTML = selectedWord
        loseVal++;
        loseStat.innerHTML = `lose: ${loseVal}`
    }
}

//keydown letter press
window.addEventListener('keydown',(e)=>{
    if(e.keyCode >= 65 && e.keyCode<=90){
        if(finalMessage.innerText == 'Congratulations! You have won!')
            finalMessage.innerText = 'Congratulations! You have won!'
            
        else if(finalMessage.innerText == 'You have lost the Game.')
            finalMessage.innerText = 'You have lost the Game.'         
        
        else{
            const letter = e.key;

            if(selectedWord.includes(letter)){
                if(!cL.includes(letter)){
                    cL.push(letter);
                    displayword();  
                }
            }

            else{
                if(!wL.includes(letter)){
                    wL.push(letter);
                    updatewrongLetters();
                }
            }
    }
}
});
