//Тут собраны все актёры
let actors = [{
        Имя: "Том",
        Фамилия: "Харди",
        src: "images/hardy.jpg"
    },
    {
        Имя: "Джейк",
        Фамилия: "Джилленхол",
        src: "images/jill.png"
    },
    {
        Имя: "Джон",
        Фамилия: "Траволта",
        src: "images/travolta.jpg"
    },
    {
        Имя: "Том",
        Фамилия: "Круз",
        src: "images/cruise.jpg"
    },
    {
        Имя: "Киану",
        Фамилия: "Ривз",
        src: "images/reeves.jpg"
    },
    {
        Имя: "Брэд",
        Фамилия: "Питт",
        src: "images/pitt.jpg"
    },
    {
        Имя: "Леонардо",
        Фамилия: "Дикаприо",
        src: "images/dicaprio.jpg"
    },
    {
        Имя: "Кристиан",
        Фамилия: "Бэйл",
        src: "images/bale.jpg"
    },
    {
        Имя: "Джонни",
        Фамилия: "Депп",
        src: "images/depp.jpg"
    },
    {
        Имя: "Брюс",
        Фамилия: "Уиллис",
        src: "images/willis.jpg"
    }
];
//Объявление всех переменных
let imagesCount, imgCount, randomImage, radio, usersAnswer, noRepeat, rightAnswer, rightRadioAnswer, randomRightAnswer, points, button;
radio = document.getElementsByName('guessTheActor');
button = document.getElementById("submitButton");
imagesCount = actors.length; //временная переменная кол-ва картинок для дальнейших операций
console.log('Общее количество актёров: ' + imagesCount);
imagesCount--;
rightRadioAnswer = '404';
round = 0;
points = 0;

function reload() {
    location.reload();
}

function checkTheAnswer() {
    document.getElementById('A-text').innerHTML = `<input type="radio" name="guessTheActor" value="A" class="pointer"> Актёр 1`;
    document.getElementById('B-text').innerHTML = `<input type="radio" name="guessTheActor" value="B" class="pointer"> Актёр 2`;
    document.getElementById('C-text').innerHTML = `<input type="radio" name="guessTheActor" value="C" class="pointer"> Актёр 3`;
    document.getElementById('D-text').innerHTML = `<input type="radio" name="guessTheActor" value="D" class="pointer"> Актёр 4`;
    button.innerHTML = "Ответить";

    if (radio.value == undefined) {
        button.disabled = true;
        button.classList.add("disabled");
    }

    function randomNumber(max) {
        let result;
        result = Math.random(result) * max;
        result = Math.round(result);
        return result;
    }

    randomImage = randomNumber(imagesCount);

    if (noRepeat === randomImage) {
        return checkTheAnswer();
    }
    if (round === 0) {
        console.log(`
            Игра началась!
            `);
    }

    if (usersAnswer == rightRadioAnswer) {
        points += 5;
        alert(`    Правильно ✅
    Вы получили 5 очков.`);
    } else if (round >= 1) {
        let name = prompt(`
        💀 Game over 💀
        Ваше количество очков: ${points}
        Введите своё имя ниже для сохранения рекорда`, 'Ваше имя..');
        if (name !== null && name !== 'Ваше имя..' && name !== "" && name !== " ") {
            //api.telegram.org/bot1279639951:AAH1PfQsWzGNa4MPN7DK8VyodQ1EmjSt18s/getUpdates
            let xhttp = new XMLHttpRequest();
            let message = `Пользователь ${name} набрал(а) ${points} очков.`;
            const url = 'https://api.telegram.org/bot1279639951:AAH1PfQsWzGNa4MPN7DK8VyodQ1EmjSt18s/sendMessage?chat_id=-1001341693208&text=';
            xhttp.open("GET", url + message, true);
            xhttp.send();
            points = 0;
        }
        else {
            points = 0;
        }
    }

    round++;
    document.getElementById('round').innerHTML = `Раунд №${round} | Очков: ${points} `;
    noRepeat = randomImage;
    document.getElementById("needToGuess").src = `${actors[randomImage].src}`;
    rightAnswer = randomImage; //индекс картинки которую надо угадать
    randomRightAnswer = randomNumber(3);
    imgCount = imagesCount + 1; //правильное кол-во картинок на сайте

    let used, fakeAnswer,i;
    used = [];
    fakeAnswer = 0;
    i = 0;
    function fakeAnswers() {
        if (fakeAnswer !== used[i] && fakeAnswer !== used[0]) {
            used[i+1] = fakeAnswer;
        }
        else {
            fakeAnswer++;
            fakeAnswers();
        }
        i++;
        while (i < 3) {
            fakeAnswers();
        }
        return used;
    }

    switch (randomRightAnswer) {
        case 0:
            used.push(rightAnswer);
            fakeAnswers();
            document.getElementById('A-text').innerHTML = `<input type="radio" name="guessTheActor" value="A" class="pointer"> ${actors[used[0]].Имя} ${actors[used[0]].Фамилия}`;          
            document.getElementById('B-text').innerHTML = `<input type="radio" name="guessTheActor" value="B" class="pointer"> ${actors[used[1]].Имя} ${actors[used[1]].Фамилия}`;
            document.getElementById('C-text').innerHTML = `<input type="radio" name="guessTheActor" value="C" class="pointer"> ${actors[used[2]].Имя} ${actors[used[2]].Фамилия}`;
            document.getElementById('D-text').innerHTML = `<input type="radio" name="guessTheActor" value="D" class="pointer"> ${actors[used[3]].Имя} ${actors[used[3]].Фамилия}`;
            console.log('Случайный порядок: ' + used);
            used = [];
            rightRadioAnswer = "A";
            break;
        case 1:
            used.push(rightAnswer);
            fakeAnswers();
            document.getElementById('B-text').innerHTML = `<input type="radio" name="guessTheActor" value="B" class="pointer"> ${actors[used[0]].Имя} ${actors[used[0]].Фамилия}`;          
            document.getElementById('A-text').innerHTML = `<input type="radio" name="guessTheActor" value="A" class="pointer"> ${actors[used[1]].Имя} ${actors[used[1]].Фамилия}`;
            document.getElementById('C-text').innerHTML = `<input type="radio" name="guessTheActor" value="C" class="pointer"> ${actors[used[2]].Имя} ${actors[used[2]].Фамилия}`;
            document.getElementById('D-text').innerHTML = `<input type="radio" name="guessTheActor" value="D" class="pointer"> ${actors[used[3]].Имя} ${actors[used[3]].Фамилия}`;
            console.log('Случайный порядок: ' + used);
            used = [];
            rightRadioAnswer = "B";
            break;
        case 2:
            used.push(rightAnswer);
            fakeAnswers();
            document.getElementById('C-text').innerHTML = `<input type="radio" name="guessTheActor" value="C" class="pointer"> ${actors[used[0]].Имя} ${actors[used[0]].Фамилия}`;          
            document.getElementById('B-text').innerHTML = `<input type="radio" name="guessTheActor" value="B" class="pointer"> ${actors[used[1]].Имя} ${actors[used[1]].Фамилия}`;
            document.getElementById('A-text').innerHTML = `<input type="radio" name="guessTheActor" value="A" class="pointer"> ${actors[used[2]].Имя} ${actors[used[2]].Фамилия}`;
            document.getElementById('D-text').innerHTML = `<input type="radio" name="guessTheActor" value="D" class="pointer"> ${actors[used[3]].Имя} ${actors[used[3]].Фамилия}`;
            console.log('Случайный порядок: ' + used);
            used = [];
            rightRadioAnswer = "C";
            break;
        case 3:
            used.push(rightAnswer);
            fakeAnswers();
            document.getElementById('D-text').innerHTML = `<input type="radio" name="guessTheActor" value="D" class="pointer"> ${actors[used[0]].Имя} ${actors[used[0]].Фамилия}`;          
            document.getElementById('B-text').innerHTML = `<input type="radio" name="guessTheActor" value="B" class="pointer"> ${actors[used[1]].Имя} ${actors[used[1]].Фамилия}`;
            document.getElementById('C-text').innerHTML = `<input type="radio" name="guessTheActor" value="C" class="pointer"> ${actors[used[2]].Имя} ${actors[used[2]].Фамилия}`;
            document.getElementById('A-text').innerHTML = `<input type="radio" name="guessTheActor" value="A" class="pointer"> ${actors[used[3]].Имя} ${actors[used[3]].Фамилия}`;
            console.log('Случайный порядок: ' + used);
            used = [];
            rightRadioAnswer = "D";
            break;
        default:
            console.log('ERROR GENERATING RANDOM RIGHT ANSWER');
    }
    for (let i = 0; i < radio.length; i++) {
        radio[i].onchange = checkRadio;
    }

    function checkRadio() {
        usersAnswer = (this.value);
        button.disabled = false;
        button.classList.remove("disabled");
    }
}

let slider = 0;
function toLeft() {
    document.getElementById('slider-right').disabled = false;
    document.getElementById('slider-right').classList.remove("disabled");
    if (slider > -800) {
        slider -= 180;
    }
    document.getElementById('slider-line').style.left = slider + 'px';
    if (slider === -900) {
        document.getElementById('slider-left').disabled = true;
        document.getElementById('slider-left').classList.add("disabled");
    }
}

function toRight() {
    document.getElementById('slider-left').disabled = false;
    document.getElementById('slider-left').classList.remove("disabled");
    if (slider < 0) {
        slider += 180;
    }
    if (slider === 0) {
        document.getElementById('slider-right').disabled = true;
        document.getElementById('slider-right').classList.add("disabled");
    }
    document.getElementById('slider-line').style.left = slider + 'px';
}