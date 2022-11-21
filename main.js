const questions = [
    {
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage (){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion(){
    const headerTemplate = `<h2 class="tittle">%tittle%</h2>`;
    const tittle = headerTemplate.replace('%tittle%', questions[questionIndex]['question']);

    headerContainer.innerHTML = tittle;
    let answerNumber = 1;

    for (let answerText of questions[questionIndex]['answers']){
        const questionsTemplate = 
        `<li>
                <label>
                    <input value = "%number%" type="radio" class="answer" name="answer"/>
                    <sppan>%answer%</span>
                </label>
        </li>`;

        let answerHtml = questionsTemplate.replace('%answer%', answerText);
        answerHtml = answerHtml.replace('%number%', answerNumber);

        listContainer.innerHTML  += answerHtml;
        answerNumber++;
    }
}

function checkAnswer (){
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if(!checkedRadio){
        
     
        submitBtn.blur();
        return;
    }

    const userAnswer = parseInt(checkedRadio.value);

    if(userAnswer === questions[questionIndex]['correct']){
        score++;
    }

    if(questionIndex !== questions.length -1){
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults();

    }
}

function showResults (){
    const resultsTemplate = 
                            `<h2 class="tittle">%title%</h2>
                            <h2 class="summary">%message%</h2>
                            <p class="result">%result%</p>`;

       let tittle, message;
       if(score === questions.length){
            tittle = 'Pozdraviam';
            message = 'Vy otvetili na wse woprosy';
       }   else if((score * 100) / questions.length >= 50){
                tittle = 'Ne ploho';
                message = 'super';
       }  
       
       let result = `${score} iz ${questions.length}`;

       const finalMessage = resultsTemplate.replace('%title%', tittle)
                                            .replace('%message%', message)
                                            .replace('%result%', result);

        headerContainer.innerHTML = finalMessage;
}


