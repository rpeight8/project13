document.addEventListener("DOMContentLoaded", () => {
  const micButton = document.getElementById("microphone");
  const resultText = document.getElementById("result");

  let isRecording = false;
  let nextEvaluation = "";

  const evaluations = [
    "Найк про",
    "Щавель",
    "Фары слепят",
    "Персик",
    "Ракушка",
  ];

  // Функция для случайной оценки обстановки
  function randomEvaluation() {
    if (nextEvaluation) {
      const eval = nextEvaluation;
      nextEvaluation = ""; // Сбрасываем после вывода
      return eval;
    }
    const randomIndex = Math.floor(Math.random() * evaluations.length);
    return evaluations[randomIndex];
  }

  // Проверка, было ли касание в нижнем левом углу кнопки
  function checkIfBottomLeftCorner(touch) {
    const rect = micButton.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    console.log(x, y);
    console.log(rect.width * 0.25, rect.height * 0.75);
    // Проверяем, находится ли касание в нижнем левом углу (примерно четверть нижней части и левая часть)
    return x <= rect.width * 0.15 && y >= rect.height * 0.5;
  }

  // Начало записи при касании кнопки
  micButton.addEventListener("touchstart", (event) => {
    if (checkIfBottomLeftCorner(event.touches[0])) {
      nextEvaluation = "Найк про";
    }

    isRecording = true;
    resultText.classList.remove("show");
    micButton.classList.add("recording");
  });

  // Окончание записи при завершении касания
  micButton.addEventListener("touchend", () => {
    if (isRecording) {
      isRecording = false;
      micButton.classList.remove("recording"); // Убираем анимацию записи
      resultText.textContent = randomEvaluation(); // Выводим случайную оценку или специальную
      resultText.classList.add("show"); // Плавное появление текста
    }
  });

  // Если палец убрали за пределы кнопки, остановить запись
  micButton.addEventListener("touchcancel", () => {
    if (isRecording) {
      isRecording = false;
      micButton.classList.remove("recording");
      resultText.textContent = randomEvaluation();
      resultText.classList.add("show");
    }
  });
});
