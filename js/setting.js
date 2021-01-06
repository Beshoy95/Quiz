// https://opentdb.com/api.php?amount=10&category=10&difficulty=medium
import Quiz from "./quiz.js";
export class Setting {
    constructor() {
        this.amountElement = document.getElementById("Number");
        this.categoryElement = document.querySelector("#category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.startBtn = document.getElementById("startBtn");
        this.quizElement= document.getElementById("quiz")
        this.startBtn.addEventListener("click", this.startQuiz.bind(this))
        this.quiz = {};
    }
    async startQuiz() {
        let amout = this.amountElement.value;
        let category = this.categoryElement.value;
        let difficulty = [...this.difficultyElement].filter(elment => elment.checked);
        let url = `https://opentdb.com/api.php?amount=${amout}&category=${category}&difficulty=${difficulty[0].id}`
        let result = await this.fetchUrl(url);
        if (result.length > 0) {
            $("#setting").fadeOut(700,()=>{
                $("#quiz").fadeIn(700)
            })
        
            this.quiz = new Quiz(this.quizElement,amout,result);
        }

    }
    async fetchUrl(url) {

        let response = await fetch(url);
        let result = await response.json();
        return result.results;
    }
}
