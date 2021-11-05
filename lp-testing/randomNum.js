fetch('little-polymath-data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data.easy_medium);

        randomNumbers = [];
        randomNumbers = randomUniqueNum(8, 2);
        for(let i = 0; i <= randomNumbers.length -1; i++){
            document.body.innerHTML += `<p>${data.easy[randomNumbers[i]-1].question}</p>`;
            getQuestionSet.push(data.easy[randomNumbers[i]-1]);
        }

        randomNumbers = [];
        randomNumbers = randomUniqueNum(8, 2);
        for(let i = 0; i <= randomNumbers.length -1; i++){
            document.body.innerHTML += `<p>${data.easy_medium[randomNumbers[i]-1].question}</p>`;
            getQuestionSet.push(data.easy_medium[randomNumbers[i]-1]);
        }
        console.log(getQuestionSet);
        
    });