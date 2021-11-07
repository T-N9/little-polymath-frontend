/* ---------------------------------------------------- */
// Timer Indicator UX
/* ---------------------------------------------------- */
const timerIndicator = document.querySelector('.timer-indicator');

/* ---------------------------------------------------- */
// converting english number to myanmar
// credit Saya Ei Mg
/* ---------------------------------------------------- */
function en2mm(num) {
    var nums = ['၀','၁','၂','၃','၄','၅','၆','၇','၈','၉'];
    return (num+"").replace(/([0-9])/g, function (s, key){
        return nums[key] || s;
    });
}

let quizSetData; /* to store a temporary data from session */

/* ---------------------------------------------------- */
// return session data
/* ---------------------------------------------------- */
const getData = () => {
    quizSetData= JSON.parse(sessionStorage.getItem("items"))

    return quizSetData;
}
getData();
console.log(quizSetData);

/* ---------------------------------------------------- */
// Translation number (Eng to Myanmar)
/* ---------------------------------------------------- */
let userAns = null; /* temp var to check condition user selected answer */

/* ---------------------------------------------------- */
// creating template for each quiz
/* ---------------------------------------------------- */
let quiz_i = 0;
const lpQuesNo = document.querySelector('.lp-no')
const lpCategory = document.querySelector('.lp-category');
const lpQuestion = document.querySelector('.lp-question');
const lpOp1 = document.querySelector('.lp-option-a');
const lpOp2 = document.querySelector('.lp-option-b');
const lpOp3 = document.querySelector('.lp-option-c');
const lpOp4 = document.querySelector('.lp-option-d');

const displayQuiz = (i) => {
    lpQuesNo.textContent = en2mm(quiz_i+1);
    lpCategory.textContent = quizSetData[i].category;
    lpQuestion.textContent = quizSetData[i].question;
    lpOp1.textContent = quizSetData[i].option[0];
    lpOp2.textContent = quizSetData[i].option[1];
    lpOp3.textContent = quizSetData[i].option[2];
    lpOp4.textContent = quizSetData[i].option[3];

    timerIndicator.classList.add('start');

    let time_i = 5;
    document.querySelector('.score-timer').innerHTML = time_i;
    let timer = setInterval(() => {
        time_i--;
        
        if (time_i <= 0) {
            clearInterval(timer);
            questionResult();
        }

        if (time_i <= 13){
            timerIndicator.classList.add('timer-warning');
        }

        if (time_i <= 6){
            timerIndicator.classList.remove('timer-warning');
            timerIndicator.classList.add('timer-danger');
        }

        document.querySelector('.score-timer').innerHTML = time_i;
        return time_i;
    }, 1000);
}

displayQuiz(quiz_i);

/* ---------------------------------------------------- */
// validate user answer with answer in quizSetData
/* ---------------------------------------------------- */
let clickedBtnIndex; /* Clicked Button Index */
let ansIndex;
const optionButtons = Array.from(document.getElementsByClassName('op-button'));
optionButtons.forEach(btn => {
    btn.addEventListener('dblclick', ()=>{
        optionButtons.forEach(btnClass => {
            btnClass.classList.value = "op-button";
        });
        btn.classList.add("selected");
        clickedBtnIndex = parseInt(btn.getAttribute('ondblclick').slice(12,-1));
        return clickedBtnIndex;
    });
});

let timer_Score; /* Get Time of user answer */
let score_Timer; /* Store time of user answer */
const validateAns = (ans) => {
    timer_Score = document.querySelector('.score-timer');
    score_Timer = parseInt(timer_Score.textContent);

    for(let a=0 ; a <4; a++){
        if(quizSetData[quiz_i].option[a] === quizSetData[quiz_i].answer) {
            ansIndex = a;
        }
    }

    if(quizSetData[quiz_i].option[ans] === quizSetData[quiz_i].answer){
        userAns = true;
        console.log("TRUE",quizSetData[quiz_i].option[ans]);
        console.log("TRUE at "+ ans);
    }else {
        userAns = false;
        console.log("FALSE",quizSetData[quiz_i].option[ans]);
    }
    console.log(score_Timer);
    return userAns, score_Timer, ansIndex;
}

/* ---------------------------------------------------- */
// result for each question
/* ---------------------------------------------------- */
let score = 0;
let life = 4;
let lifeEl = document.querySelector('.lives');

const setLife = (no) => {
    lifeEl.innerHTML="";
    for( let l = 0; l < no ; l++){
        lifeEl.innerHTML += `
            <img class="lp-life" src="./assets/images/heart.png">
        `;
    }
}
setLife(life);

const resultFooter = document.querySelector('.result-footer');
const resultImg = document.querySelector('.result-img');
const resultText = document.querySelector('.result-text');
const resultExpl = document.querySelector('.result-expl');
const resultRight = document.querySelector('.result-right');

const questionResult = () => {
    resultExpl.innerHTML = quizSetData[quiz_i].explanation;
    if(userAns === true){
        resultImg.setAttribute("src", "./assets/images/correct-answer.svg");
        resultText.innerHTML = `သင့်အဖြေ <span class="h-d-s-text">မှန်ကန်</span> ပါသည်။`;
        score = score + 10 + score_Timer;
    }else if (userAns === false){
        resultRight.innerHTML = `
            <span>
                အဖြေမှန်မှာ <span class="h-d-s-text">${quizSetData[quiz_i].answer}</span> ဖြစ်ပါသည်။
            </span>
            
        `;
        resultImg.setAttribute("src", "./assets/images/wrong-answer.svg");
        resultText.innerHTML = `သင့်အဖြေ <span class="h-d-d-text">မှားယွင်း</span> နေပါသည်။`;
        life = life -1;
        setLife(life);
    }else {
        resultRight.innerHTML = `
            <span>
                အဖြေမှန်မှာ <span class="h-d-s-text">${quizSetData[quiz_i].answer}</span> ဖြစ်ပါသည်။
            </span>
            
        `;
        resultImg.setAttribute("src", "./assets/images/no-answer.svg");
        resultText.textContent = "သင် ဖြေဆိုထားခြင်းမရှိပါ။";
        life = life -1;
        setLife(life);
    }
    if(life > 0) {
        
    //     document.querySelector('.result').innerHTML = `
    //     <h2>အမှတ် ${en2mm(score)}</h2>
    //     <h3>${resultText}</h3>
    //     <p>${quizSetData[quiz_i].answer}</p>
    //     <small>${quizSetData[quiz_i].explanation}</small>
    //     <button onclick="nextQuestion()">Next</button>
    // `;
    optionButtons.forEach(resultBtn => {
        let readBtn = resultBtn.getAttribute('ondblclick').slice(12,-1);
        resultBtn.setAttribute('disabled', '');

        if(readBtn == ansIndex) {
            resultBtn.classList.add('success-btn');
            console.log("TREUREJ");
        }else if(readBtn !=ansIndex && readBtn == clickedBtnIndex){
            resultBtn.classList.add('danger-btn');
        }
    });

    timerIndicator.classList.remove('start');
    resultFooter.innerHTML = `
        <button onclick="nextQuestion()" class="next-quesBtn">Next</button>
    `;
    
    setTimeout(() => {
        document.querySelector('.quiz-result').classList.remove('d-none');
    }, 1000);

    console.log(clickedBtnIndex, ansIndex)
    } else {
        console.log("You Lose!!!");
    }
}

/* ---------------------------------------------------- */
// display questions ++
/* ---------------------------------------------------- */
const nextQuestion = () => {
    userAns = null;
    quiz_i++;
    // document.querySelector('.result').innerHTML ="";
    document.querySelector('.quiz-result').classList.add('d-none');
    timerIndicator.classList.add('start');
    optionButtons.forEach(btnClass => {
        btnClass.classList.value = "op-button";
        btnClass.removeAttribute('disabled');
    });

    if(quiz_i >= 10){
        console.log("Out of QUiz");
    }

    try{
        displayQuiz(quiz_i);
    }catch(e){
        console.log("Here is error");
    }
}