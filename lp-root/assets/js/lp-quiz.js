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
let quiz_i = 4;
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
// display questions ++
/* ---------------------------------------------------- */
const nextQuestion = () => {
    userAns = null;
    quiz_i++;
    document.querySelector('.result').innerHTML ="";

    if(quiz_i >= 10){
        console.log("Out of QUiz");
    }

    try{
        displayQuiz(quiz_i);
    }catch(e){
        console.log("Here is error");
    }
}

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
        })
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
let life = 3;

const questionResult = () => {
    let resultText; 
    if(userAns === true){
        resultText = "သင့်အဖြေ မှန်ကန်ပါသည်။";
        score = score + 10 + score_Timer;
    }else if (userAns === false){
        resultText = "သင့်အဖြေ မှားယွင်းနေပါသည်။";
        life = life -1;
    }else {
        resultText = "သင် ဖြေဆိုထားခြင်းမရှိပါ။";
        life = life -1;
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
        let readBtn = resultBtn.getAttribute('ondblclick').slice(12,-1)

        if(readBtn == ansIndex) {
            resultBtn.classList.add('success-btn');
            console.log("TREUREJ");
        }else if(readBtn !=ansIndex && readBtn == clickedBtnIndex){
            resultBtn.classList.add('danger-btn');
        }
    })
    

    console.log(clickedBtnIndex, ansIndex)
    } else {
        document.querySelector('.result').innerHTML = `
        <h1>You Lose !!!</h1>
    `;
    }
}