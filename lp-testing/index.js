let questionSet = []; /* var for storing a set of quiz (10 items) */
let randomNumbers; /* for random numbers */

/* ---------------------------------------------------- */
// Function to get random numbers without duplication
/* ---------------------------------------------------- */
function randomUniqueNum(range, outputCount) {
    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }
  
    let result = [];
  
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
    return result;
}

/* ---------------------------------------------------- */
// Reset and output a new random number array
/* ---------------------------------------------------- */
const rebootRandomNum = () => {
    randomNumbers = [];
    randomNumbers = randomUniqueNum(7, 2);
}

/* ---------------------------------------------------- */
// Function to get each question set (2 items) from each difficulty
// Also fetching a local data
/* ---------------------------------------------------- */
const dataSet = async () => {
    const response = await fetch('little-polymath-data.json');
    const data = await response.json();

    const difficultyArr = [ data.easy, data.easy_medium, data.medium, data.medium_hard, data.hard];
    const getQuestionSet = (difficulty) => {
        for(let i = 0; i <= randomNumbers.length -1; i++){
            document.querySelector('section').innerHTML += `<p>${difficulty[randomNumbers[i]-1].question}</p>`;
            console.log(difficulty[randomNumbers[i]-1]);
            questionSet.push(difficulty[randomNumbers[i]-1]);
        }
    }

    difficultyArr.map(item => {
        rebootRandomNum();
        getQuestionSet(item);
    })

    console.log(questionSet);
    window.sessionStorage.setItem("items", JSON.stringify(questionSet));
}
dataSet();

/* ---------------------------------------------------- */
// Redirect to quiz page
// Also carrying session data
/* ---------------------------------------------------- */
const startQuiz = () => {
    window.location.href = "/lp-testing/start.html";
}





