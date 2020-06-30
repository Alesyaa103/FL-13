import {
    computerChoice, compare, decideResult
} from './calculating-module';
import {
    createElem
} from './domHelper-module';

export function Entry() {
    const root = document.getElementById('container');
    const buttons = document.getElementsByTagName('input');
    const reset = document.getElementById('reset');

    reset.addEventListener('click', () => window.location.reload(true));

    let counterUser = 0;
    let counterComputer = 0;
    let currentStep = 0;
    const endOfGame = 3;
    for (let button of buttons) {
        button.addEventListener('click', (e) => game(e))
    }

    const game = (e) => {
        currentStep++;
        const user = e.target.id;
        const computer = computerChoice()
        const result = compare(user, computer);
        counterUser += result;
        counterComputer -= result;
        createElem('h3', root, null, `Round ${currentStep}, ${user} vs. ${computer}, ${decideResult(result)}`);
        if (counterUser === endOfGame || counterComputer === endOfGame) {
            createElem('h2', root, {
                id: 'gameOver'
            }, 'Game over');
            createElem('h2', root, null, `${decideResult(counterUser-counterComputer)}`)
            for (let button of buttons) {
                button.setAttribute('disabled', 'true')
            }
        }
    }
}