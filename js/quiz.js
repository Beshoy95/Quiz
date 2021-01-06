class Quiz {
    constructor(quizElement, amount, question) {
        this.quizElement = quizElement;
        this.totalAmount = amount;
        this.questions = question;
        this.currentElement = document.getElementById("current");
        this.questionElement = document.getElementById("question");
        this.tryBtn = document.getElementById("tryBtn");
        this.nextBtn = document.getElementById("next");
        this.amounElement = document.getElementById("totalAmount");
        this.rowAnswerElement = document.getElementById("rowAnswer");
        this.anserCheck = document.getElementsByName("answer");
        this.answeredAmount = 0;
        this.isCorrect = false;
        this.score = 0;
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));
        this.tryBtn.addEventListener("click", this.tryAgain.bind(this))
        this.showQuestion()
        this.renderQuestion();
    }
    showQuestion() {
        this.questionElement.innerHTML = this.questions[this.answeredAmount].question;
        this.answers = this.getAnswer(this.questions[this.answeredAmount])
        this.renderQuestion()
    }
    nextQuestion() {
        let CheckedElement = [...this.anserCheck].filter(elment => elment.checked);
        console.log(CheckedElement.length)
        if (CheckedElement.length == 0) {
            $(".alert").fadeIn(500)
        } else {
            $(".alert").fadeOut(0)
            this.isCorrect = this.CheckAnswer(CheckedElement);
            (this.isCorrect) ? $("#Correct").fadeIn(500, () => {
                this.Show()
            }): $("#inCorrect").fadeIn(500, () => {
                this.Show()
            })
        }

    }
    Show() {
        $("#Correct").fadeOut(0)
        $("#inCorrect").fadeOut(0)
        this.answeredAmount++;
        (this.totalAmount > this.answeredAmount) ? this.showQuestion(): this.finish();

    }

    CheckAnswer(elementChecked) {
        console.log("elementChecked[0].value", elementChecked[0].value)
        console.log("this.questions[this.answeredAmount].correct_answer", this.questions[this.answeredAmount].correct_answer)

        if (elementChecked[0].value == this.questions[this.answeredAmount].correct_answer) {
            this.isCorrect = true;
            this.score++;
        } else {
            this.isCorrect = false;
        }

        return this.isCorrect
    }
    finish() {
        document.getElementById("score").innerHTML = this.score
        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500);
        });

    }
    tryAgain() {
        $("#finish").fadeOut(1000, () => {
            $("#setting").fadeIn(1000);
        });
    }

    renderQuestion() {

        this.currentElement.innerHTML = this.answeredAmount + 1;
        this.amounElement.innerHTML = this.totalAmount;
        let temp = "";
        for (let i = 0; i < this.answers.length; i++) {
            temp += ` <div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${this.answers[i]}" >
               ${this.answers[i]}
            </label>
        </div>
        `
        }
        this.rowAnswerElement.innerHTML = temp;
    }


    getAnswer(questions) {
        let answersArray = [
            questions.correct_answer,
            ...questions.incorrect_answers
        ]
        let answers = [],
            i = answersArray.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            answers.push(answersArray[j]);
            answersArray.splice(j, 1);
        }
        return answers
    }


    CheckAnswer(elementChecked) {
        console.log("elementChecked[0].value", elementChecked[0].value)
        console.log("this.questions[this.answeredAmount].correct_answer", this.questions[this.answeredAmount].correct_answer)

        if (elementChecked[0].value == this.questions[this.answeredAmount].correct_answer) {
            this.isCorrect = true;
            this.score++;
        } else {
            this.isCorrect = false;
        }

        return this.isCorrect
    }

    
    finish() {
        document.getElementById("score").innerHTML = this.score
        $("#quiz").fadeOut(500, () => {
            $("#finish").fadeIn(500);
        });

    }
    tryAgain() {
        $("#finish").fadeOut(1000, () => {
            $("#setting").fadeIn(1000);
        });
    }

}
export default Quiz;