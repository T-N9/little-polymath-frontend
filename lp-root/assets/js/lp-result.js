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

const resultMedia = document.querySelector('.result-media');
const resultBool = document.querySelector('.result-bool');
const resultTitle = document.querySelector('.result-title');
const remainLife = document.querySelector('.remain-life');
const scoreTotal = document.querySelector('.score-total');
const resultBonus = document.querySelector('.result-bonus');
const resultFinal = document.querySelector('.result-final');
const resultHome = document.querySelector('.result-home');
let session_data = sessionStorage.getItem("sessionData");
let result_data = session_data.split(",");
let total_score = result_data[0];
let remain_life = result_data[1];
// console.log(result_data);

if(total_score > 60 && remain_life > 1) {
    resultMedia.innerHTML = `<img src="assets/images/Completed-game.svg" alt="Complete-Game">`;
    resultBool.textContent = "ဂုဏ်ယူပါတယ်။";
}else {
    resultMedia.innerHTML = `<img src="assets/images/lose-game.svg" alt="Lose-Game">`;
    resultBool.textContent = "ထပ်မံကြိုးစားကြည့်ပါ။";
}

scoreTotal.innerHTML = `
    <span>${en2mm(total_score)} <img class="lp-point" src="./assets/images/point.svg" alt="point"></span>
`;

remainLife.innerHTML = `
    <span>${en2mm(remain_life)} <img class="lp-life" src="./assets/images/heart.png" alt="heart"></span>
`;

resultBonus.innerHTML = `
    ${en2mm(total_score)} + ( ${en2mm(remain_life)} x ${en2mm(100)})
`;

resultFinal.innerHTML = `
    <span class="flex-auto"> ${en2mm(parseInt(total_score) + (remain_life * 100))} <img class="lp-point" src="./assets/images/point.svg" alt="point"></span>
`;

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

    case (total_score > 60 && remain_life > 1):
        resultTitle.textContent= "ဖြေဆိုမှု အောင်မြင်ပါသည်။";
        break;
    case (remain_life < 1):
        resultTitle.textContent= "ဖြေဆိုမှု မအောင်မြင်ပါ။";
        break;
}

resultHome.addEventListener('click', ()=> {
    window.location.href = "index.html";
    sessionStorage.removeItem("sessionData");
    localStorage.clear();
});