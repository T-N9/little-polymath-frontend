const resultBool = document.querySelector('.result-bool');
const resultTitle = document.querySelector('.result-title');
const resultDesc = document.querySelector('.result-desc')
let total_score = sessionStorage.getItem("totalScore");
let remain_life = sessionStorage.getItem("remainLife");
console.log(total_score, remain_life);

if(total_score > 60) {
    resultBool.textContent = "ဂုဏ်ယူပါတယ်။";
}else {
    resultBool.textContent = "ထပ်မံကြိုးစားကြည့်ပါ။";
}

resultDesc.innerHTML += `
    <p></p>
`;

// document.body.innerHTML = `<h1>${total_score}</h1>`;

switch (true) {
    
    case (total_score > 150):
        
        resultTitle.textContent= "ထူးချွန်စွာ ဖြေဆိုနိုင်ခဲ့ပါသည်။";
        break;
        
    case (total_score > 120):
        resultTitle.textContent= "ထူးကဲစွာ ဖြေဆိုနိုင်ခဲ့ပါသည်။";
        break;

    case (total_score > 100):
        resultTitle.textContent= "သင် လေ့လာမှုအားကောင်းပါသည်။";
        break;
    
    case (total_score > 80):
        resultTitle.textContent= "အောင်မြင်စွာ ဖြေဆိုနိုင်ခဲ့ပါသည်။";
        break;

    case (total_score > 60):
        resultTitle.textContent= "ဖြေဆိုမှု အောင်မြင်ပါသည်။";
        break;
    case (total_score < 60):
        resultTitle.textContent= "ဖြေဆိုမှု မအောင်မြင်ပါ။";
        break;
}