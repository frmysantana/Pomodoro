var addSessTime = document.querySelector('#session-inc');
var subSessTime = document.querySelector('#session-dec');
var addBreakTime = document.querySelector('#break-inc');
var subBreakTime = document.querySelector('#break-dec');

var sessionTime = document.querySelector('#session');
var breakTime = document.querySelector('#break');

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');

addSessTime.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min < 60) {
        min = parseInt(min, 10) + 1;
        sessionTime.innerText = min + ':' + sec;
    } else {
        alert('1 hour is the maximum.')
    }
});

subSessTime.addEventListener('click', function() {
    var min = sessionTime.innerText.split(':')[0];
    var sec = sessionTime.innerText.split(':')[1];
    if (min > 1) {
        min = parseInt(min, 10) - 1;
        sessionTime.innerText = min + ':' + sec;
    } else {
        alert('1 minute is the minimum.')
    }
});

addBreakTime.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min < 30) {
        min = parseInt(min, 10) + 1;
        breakTime.innerText = min + ':' + sec;
    } else {
        alert('30 minutes is the maximum.')
    }
});

subBreakTime.addEventListener('click', function() {
    var min = breakTime.innerText.split(':')[0];
    var sec = breakTime.innerText.split(':')[1];
    if (min > 1) {
        min = parseInt(min, 10) - 1;
        breakTime.innerText = min + ':' + sec;
    } else {
        alert('1 minute is the minimum.')
    }
});

start.addEventListener('click', function() {
    var countDown = setInterval(stopWatch, 1000);
});

// Doesn't work
stop.addEventListener('click', function() {
    clearInterval(countDown);
});

function stopWatch() {
    var time = Number(sessionTime.innerText);
    sessionTime.innerText = time - .01;
}
