var addSessMin = document.querySelector('#session-inc-min');
var subSessMin = document.querySelector('#session-dec-min');
var addSessSec = document.querySelector('#session-inc-sec');
var subSessSec = document.querySelector('#session-dec-sec');

var addBreakMin = document.querySelector('#break-inc-min');
var subBreakMin = document.querySelector('#break-dec-min');
var addBreakSec = document.querySelector('#break-inc-sec');
var subBreakSec = document.querySelector('#break-dec-sec');

var sessionTime = document.querySelector('#session');
var breakTime = document.querySelector('#break');
var sessionDisplay = document.querySelector('#session-display');
var breakDisplay = document.querySelector('#break-display');

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');

var timer = {};

addSessMin.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min < 60) {
        min = parseInt(min, 10) + 1;
        sessionTime.innerText = min + ':' + sec;
    } else {
        alert('60:59 is the maximum.')
    }
});

subSessMin.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min > 1) {
        min = parseInt(min, 10) - 1;
        sessionTime.innerText = min + ':' + sec;
    } else {
        alert('1 minute is the minimum.')
    }
});

addSessSec.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min < 60) {
        sec = parseInt(sec, 10) + 1;
        if (sec === 60) {
            sec = 0; min = parseInt(min) + 1;
        }
        sessionTime.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    } else {
        alert('60:59 is the maximum.')
    }
});

subSessSec.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min > 1) {
       sec = parseInt(sec, 10) - 1;
       if (sec === -1) {
           sec = 59; min = parseInt(min) - 1;
       }
       sessionTime.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    } else {
        alert('1 minute is the minimum.');
    }
});

addBreakMin.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min < 30) {
        min = parseInt(min, 10) + 1;
        breakTime.innerText = min + ':' + sec;
    } else {
        alert('30 minutes is the maximum.')
    }
});

subBreakMin.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min > 1) {
        min = parseInt(min, 10) - 1;
        breakTime.innerText = min + ':' + sec;
    } else {
        alert('1 minute is the minimum.')
    }
});

addBreakSec.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min < 30) {
        sec = parseInt(sec, 10) + 1;
        if (sec === 60) {
            sec = 0; min = parseInt(min) + 1;
        }
        breakTime.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    } else {
        alert('30:59 is the maximum.')
    }
});

subBreakSec.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min > 1) {
       sec = parseInt(sec, 10) - 1;
       if (sec === -1) {
           sec = 59; min = parseInt(min) - 1;
       }
       breakTime.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    } else {
        alert('1 minute is the minimum.');
    }
});

start.addEventListener('click', function() {
    timer.defaultSess = sessionTime.innerText;
    timer.defaultBreak = breakTime.innerText;

    if (!timer.countDown) {
        timer.active = sessionTime;

        timer.countDown = setInterval(stopWatch, 1000);
        breakDisplay.classList.add('hide');
        addSessMin.disabled = true; subSessMin.disabled = true; 
        addSessSec.disabled = true; subSessSec.disabled = true;

        addBreakMin.disabled = true; subBreakMin.disabled = true;
        addBreakSec.disabled = true; subBreakSec.disabled = true;
    }
});

stop.addEventListener('click', function() {
    clearInterval(timer.countDown);
    delete timer.countDown;
    addSessMin.disabled = false; subSessMin.disabled = false;
    addSessSec.disabled = false; subSessSec.disabled = false;

    addBreakMin.disabled = false; subBreakMin.disabled = false;
    addBreakSec.disabled = false; subBreakSec.disabled = false;

    sessionTime.innerText = timer.defaultSess;
    breakTime.innerText = timer.defaultBreak;
    sessionDisplay.classList.remove('hide');
    breakDisplay.classList.remove('hide');
});

function stopWatch() {
    var type = timer.active;
    var min = parseInt(type.innerText.split(':')[0]);
    var sec = parseInt(type.innerText.split(':')[1]);
    if (min > 0 && sec === 0) {
        min = min - 1;
        sec = 59;
        type.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    }  else if (sec > 0) {
        sec = sec - 1;
        type.innerText = min + ':' + ((sec < 10) ? '0' + sec: sec);
    } else {
        if (timer.active === sessionTime) {
            alert('Session is over! Beginning the break.');
            sessionDisplay.classList.add('hide');
            breakDisplay.classList.remove('hide');
            sessionTime.innerText = timer.defaultSess;
            timer.active = breakTime;
        } else {
            alert('Break is over! Beginning the next session.');
            sessionDisplay.classList.toggle('hide');
            breakDisplay.classList.toggle('hide');
            breakTime.innerText = timer.defaultBreak; 
            timer.active = sessionTime;
        }
    }
}
