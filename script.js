let countdown;//here we are declaring a global variable coz to stop an interval we need to create a variable to stop interval
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds*1000;
  dispalyTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then-Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown)//by this we stops the interval by passing the variable in it
      return;
    }
    //display it
    dispalyTimeLeft (secondsLeft);
  }, 1000);
}

function dispalyTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${mins}:${remainderSeconds < 10 ? '0' : ''}${
    remainderSeconds
  }`;
  document.title = display;
  timerDisplay.textContent = display;
  console.log({mins,remainderSeconds});
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHr = hour > 12 ? hour -12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHr}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const secs = this.dataset.time;
  timer(secs);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
