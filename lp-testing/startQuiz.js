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
const displayQuiz = (i) => {
    document.querySelector('.quix').innerHTML = `
        <h4>${quizSetData[i].category}</h4>
        <h3>${quizSetData[i].question}</h3>
        <button onClick="validateAns(0)">${quizSetData[i].option[0]}</button>
        <button onClick="validateAns(1)">${quizSetData[i].option[1]}</button>
        <button onClick="validateAns(2)">${quizSetData[i].option[2]}</button>
        <button onClick="validateAns(3)">${quizSetData[i].option[3]}</button>
    `;

    
    let time_i = 10;
    document.querySelector('.score-timer').innerHTML = time_i;
    document.querySelector('.timer').innerHTML = en2mm(time_i);
    let timer = setInterval(() => {
        time_i--;
        
        if (time_i <= 0) {
            clearInterval(timer);
            questionResult();
        }
        
        document.querySelector('.score-timer').innerHTML = time_i;
        document.querySelector('.timer').innerHTML = en2mm(time_i);
        return time_i;
    }, 1000);
    // setTimeout(() => {
    //     questionResult();
    //     console.log("TIME IS UP");
    // }, 5000);
}

displayQuiz(0); /* starts from 0 to get first item from quizSetData */
let quiz_i = 0; /* quiz index*/

/* ---------------------------------------------------- */
// display questions ++
/* ---------------------------------------------------- */
const nextQuestion = () => {
    userAns = null;
    quiz_i++;
    document.querySelector('.result').innerHTML ="";

    if(quiz_i >= 10){
        document.querySelector('.quix').innerHTML = `<h1>HEHEHEHH</h1>`;
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
        document.querySelector('.result').innerHTML = `
        <h2>အမှတ် ${en2mm(score)}</h2>
        <h3>${resultText}</h3>
        <p>${quizSetData[quiz_i].answer}</p>
        <small>${quizSetData[quiz_i].explanation}</small>
        <button onclick="nextQuestion()">Next</button>
    `;
    } else {
        document.querySelector('.result').innerHTML = `
        <h1>You Lose !!!</h1>
    `;
    }
    
}