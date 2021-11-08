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
// get session data
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
const quizJumEl = document.querySelector('.quiz-jum')
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

    timerIndicator.classList.add('wait');
    let time_i = 5;
    document.querySelector('.score-timer').innerHTML = time_i;
    setTimeout(() => {
        timerIndicator.classList.remove('wait');
        timerIndicator.classList.add('start');

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
    }, 900);
    
}

quizJumEl.classList.remove('waiting');
quizJumEl.classList.add('ready');
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
// display questions ++
/* ---------------------------------------------------- */
let score = 0;
let life = 4;

const nextQuestion = () => {
    timerIndicator.classList.remove('timer-danger');
    timerIndicator.classList.add('wait');
    if(life === 0) {
        // sessionStorage.setItem("remainLife" , life);
        sessionStorage.setItem("totalScore" , score);
        window.location.href = "lp-result.html";
    } else {
        userAns = null;
        quiz_i++;
        // document.querySelector('.result').innerHTML ="";
        document.querySelector('.quiz-result').classList.add('d-none');
        optionButtons.forEach(btnClass => {
            btnClass.classList.value = "op-button";
            btnClass.removeAttribute('disabled');
        });

        setTimeout(() => {
            timerIndicator.classList.add('start'); 
        }, 2000);

        if(quiz_i >= 10){
            // score = score + (life *)
            sessionStorage.setItem("totalScore" , score);
            // sessionStorage.setItem("remainLife" , life);
            window.location.href = "lp-result.html";
            console.log("Out of QUiz");
        } else {
            try{
                quizJumEl.classList.remove('waiting');
                quizJumEl.classList.add('ready');
                displayQuiz(quiz_i);
            }catch(e){
                console.log("Here is error");
            }
        }

        return quiz_i, userAns;
    }
}

/* ---------------------------------------------------- */
// result for each question
/* ---------------------------------------------------- */
// let score = 0;
// let life = 4;
let lifeEl = document.querySelector('.lives');
const userMark = document.querySelector('.lp-mark');
userMark.innerHTML = en2mm(score);



const resultFooter = document.querySelector('.result-footer');
const resultImg = document.querySelector('.result-img');
const resultText = document.querySelector('.result-text');
const resultExpl = document.querySelector('.result-expl');
const resultRight = document.querySelector('.result-right');
const resultLife = document.querySelector('.result-life');
const resultMark = document.querySelector('.result-mark');

// Setting user lives
const setLife = (no) => {
    let deadCount = 4-life;
    console.log("Dead "+deadCount);
    let deadHeart = `<img class="lp-life" src="./assets/images/un-heart.png">`;
    


    lifeEl.innerHTML="";
    resultLife.innerHTML="";
    for(let d = 0; d < deadCount; d++){
        resultLife.innerHTML += deadHeart;
        lifeEl.innerHTML += deadHeart;
    }
    for( let l = 0; l < no ; l++){
        resultLife.innerHTML += `
            <img class="lp-life" src="./assets/images/heart.png">
        `;
        lifeEl.innerHTML += `
            <img class="lp-life" src="./assets/images/heart.png">
        `;
    }
}
setLife(life);

const questionResult = () => {
    quizJumEl.classList.remove('ready');
    quizJumEl.classList.add('waiting');
    resultExpl.innerHTML = quizSetData[quiz_i].explanation;
    if(userAns === true){
        resultRight.innerHTML = "";
        resultImg.setAttribute("src", "./assets/images/correct-answer.svg");
        resultText.innerHTML = `သင့်အဖြေ <span class="h-d-s-text">မှန်ကန်</span> ပါသည်။`;
        timer_Score = document.querySelector('.score-timer');
        
        let ori_score = score;
        score = score + 10 + score_Timer;
        resultMark.innerHTML = `${en2mm(ori_score)} <span class="h-d-p-text">+ ${en2mm(10)} + ${en2mm(score_Timer)}</span> = <span class="h-d-s-text">${en2mm(score)}</span> `;
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
        
        let ori_score = score;
        resultMark.innerHTML = `${en2mm(ori_score)} = <span class="h-d-s-text">${en2mm(score)}</span> `;
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

        let ori_score = score;
        resultMark.innerHTML = `${en2mm(ori_score)} = <span class="h-d-s-text">${en2mm(score)}</span> `;
    }
    if(life > 0) {
        userMark.innerHTML = en2mm(score);
        optionButtons.forEach(resultBtn => {
            let readBtn = resultBtn.getAttribute('ondblclick').slice(12,-1);
            resultBtn.setAttribute('disabled', '');

            if(readBtn == ansIndex) {
                resultBtn.classList.add('success-btn');
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
        userMark.innerHTML = en2mm(score);
        optionButtons.forEach(resultBtn => {
            let readBtn = resultBtn.getAttribute('ondblclick').slice(12,-1);
            resultBtn.setAttribute('disabled', '');

            if(readBtn == ansIndex) {
                resultBtn.classList.add('success-btn');
            }else if(readBtn !=ansIndex && readBtn == clickedBtnIndex){
                resultBtn.classList.add('danger-btn');
            }
        });

        setTimeout(() => {
            document.querySelector('.quiz-result').classList.remove('d-none');
        }, 1000);
        // console.log("You Lose!!!");
    }
}