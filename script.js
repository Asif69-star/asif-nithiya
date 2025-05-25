const questions = [
  {
    text: "A. You thought I must be forget our this month of anniversary, don't you?",
    type: "choice",
    options: ["Yes", "No", "I thought a bit tho."]
  },
  {
    text: "B. Did you miss me?",
    type: "choice",
    options: ["Yes", "Beyond your imagination"]
  },
  {
    text: "C. You have got some of my surprises for you. Are you ready baby girl?",
    type: "choice",
    options: ["Yes", "CURIOUSITY OVERLOADED"]
  },
  {
    text: "D. Alright so I got some of the sections for you. Be prepared Honey.",
    type: "text"
  }
];

let currentQuestion = 0;
let answers = [];

const intro = document.getElementById('intro');
const qaSection = document.getElementById('qaSection');
const startBtn = document.getElementById('startBtn');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const nextBtn = document.getElementById('nextBtn');
const responseElement = document.getElementById('response');
const nextPageLink = document.getElementById('nextPageLink');

// Hide input and nextBtn initially
answerInput.style.display = 'none';
nextBtn.style.display = 'none';

startBtn.addEventListener('click', () => {
  intro.style.display = 'none';
  qaSection.style.display = 'block';
  showQuestion();
});

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showThankYou();
    return;
  }

  const current = questions[currentQuestion];

  // Reset
  answerInput.style.display = 'none';
  nextBtn.style.display = 'none';
  responseElement.innerHTML = '';
  questionElement.textContent = current.text;

  if (current.type === 'choice') {
    current.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.className = 'btn';
      btn.onclick = () => {
        answers.push(option);
        currentQuestion++;
        setTimeout(showQuestion, 300);
      };
      responseElement.appendChild(btn);
    });
  } else if (current.type === 'text') {
    answerInput.value = '';
    answerInput.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
  }
}

nextBtn.addEventListener('click', () => {
  const val = answerInput.value.trim();
  if (val) {
    answers.push(val);
    currentQuestion++;
    showQuestion();
  } else {
    responseElement.textContent = "Please write something, love!";
  }
});

function showThankYou() {
  questionElement.innerHTML = "💌 Thank you very much for your Cooperation and Patience.<br><br>Let's get into it My Love ❤️";
  answerInput.style.display = 'none';
  nextBtn.style.display = 'none';
  responseElement.innerHTML = `
    <h4>Your Answers:</h4>
    <ul>
      ${answers.map((ans, i) => `<li><strong>Q${i+1}:</strong> ${ans}</li>`).join('')}
    </ul>
  `;
  nextPageLink.style.display = 'inline-block';
}
