import { Howl, Howler } from 'howler';

let didTimeEnd = (state, timer) => {
    /* Checks if the current active timer has run out. If it has, it is hidden
    from the user and reset to its starting time while the other timer is 
    revealed and the user is alerted to the changing timers.

    Inputs: None.
    Outputs: None.
    */

    let message, i;
    const activePar = document.querySelector('.active');
    const switchObj = {
        0: 1, 
        1: 0
    };

    // Switch timer and alert user
    if (activePar.children[0].innerHTML === '0:00') {

        // Find index of timer that just ended
        const pars = document.querySelectorAll('p');
        pars.forEach(function (el, index) {
        if (el === activePar) {
            i = index;
        }
        });

        // Show paragraph of timer that is about to start
        document.querySelectorAll('p')[switchObj[i]].classList.add('active');
        document.querySelectorAll('p')[switchObj[i]].classList.remove('hide');

        // Hide paragraph of timer that just finished
        document.querySelectorAll('p')[i].classList.add('hide');
        document.querySelectorAll('p')[i].classList.remove('active');

        // Return the ended timer to its initial time and switch this.state.selected
        // so that changeTime will work with the new displayed timer.
        if (state.selected === 'session') {
            state.selected = 'break';
            state.sessionLength = timer.defaultSession;
            message = 'Session is over! Take a break.';
        } else {
            state.selected = 'session';
            state.breakLength = timer.defaultBreak;
            message = 'Break is over! Starting next session.';
        }

        // Sound an alarm and alert the user to the change in timers.
        setTimeout(function() {
        const sound = new Howl({
            src: ['./assets/Alarm.mp3', './assets/Alarm.ogg'],
            onplay: function() {
                    alert(message);
                    this.stop();
                },
        });
        sound.play();
        }, 1);
    }
}

export default didTimeEnd;