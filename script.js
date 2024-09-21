document.addEventListener("DOMContentLoaded", () => {
  const micButton = document.getElementById("microphone");
  const resultText = document.getElementById("result");

  let isRecording = false;
  let nextEvaluation = "";

  const evaluations = ["Нормис", "Щавель", "Фары слепят", "Персик", "Ракушка"];

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
  function checkIfBottomLeftCorner(x, y) {
    const rect = micButton.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;
    // Проверяем, находится ли касание в нижнем левом углу (примерно четверть нижней части и левая часть)
    return x <= rect.width * 0.25 && y >= rect.height * 0.75;
  }

  // Начало записи при касании кнопки
  // Начало записи (для мыши и для мобильных устройств)
  function startRecording(x, y) {
    isRecording = true;
    resultText.classList.remove("show");
    micButton.classList.add("recording"); // Добавляем анимацию записи

    // Проверяем, произошло ли касание/клик в нижнем левом углу
    if (checkIfBottomLeftCorner(x, y)) {
      nextEvaluation = "Найк про!";
    }
  }

  // Окончание записи (для мыши и мобильных устройств)
  function stopRecording() {
    if (isRecording) {
      isRecording = false;
      micButton.classList.remove("recording"); // Убираем анимацию записи
      resultText.textContent = randomEvaluation(); // Выводим случайную оценку или специальную
      resultText.classList.add("show"); // Плавное появление текста
    }
  }

  // События для мыши (desktop)
  micButton.addEventListener("mousedown", (event) => {
    startRecording(event.clientX, event.clientY);
  });

  micButton.addEventListener("mouseup", () => {
    stopRecording();
  });

  micButton.addEventListener("mouseleave", () => {
    stopRecording();
  });

  // События для мобильных устройств (touch)
  micButton.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    startRecording(touch.clientX, touch.clientY);
  });

  micButton.addEventListener("touchend", () => {
    stopRecording();
  });

  micButton.addEventListener("touchcancel", () => {
    stopRecording();
  });
});
