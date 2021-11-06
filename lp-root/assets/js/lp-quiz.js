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

    let time_i = 20;
    document.querySelector('.score-timer').innerHTML = time_i;
    let timer = setInterval(() => {
        time_i--;
        
        if (time_i <= 0) {
            clearInterval(timer);
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
let score_Timer;
const validateAns = (ans) => {
    score_Timer = parseInt(document.querySelector('.score-timer').textContent);
    if(quizSetData[quiz_i].option[ans] === quizSetData[quiz_i].answer){
        userAns = true;
        console.log("TRUE",quizSetData[quiz_i].option[ans]);
    }else {
        userAns = false;
        console.log("FALSE",quizSetData[quiz_i].option[ans]);
    }
    return userAns, score_Timer;
}