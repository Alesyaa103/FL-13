export const compare = (user, computer) => {
    if (user !== computer) {
        switch (user) {
            case 'rock':
                return computer === 'paper' ? -1 : 1;
                break;
            case 'paper':
                return computer === 'rock' ? 1 : -1;
                break;
            case 'scissors':
                return computer === 'paper' ? 1 : -1;
                break;
            default:
        }
    } else {
        return 0
    }
}

export const computerChoice = () => {
    const choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return 'paper';
            break;
        case 1:
            return 'rock';
            break;
        default:
            return 'scissors'
    }
}

export const decideResult = (res) => {
    switch (true) {
        case res === 0:
            return 'The draw'
            break;
        case res > 0:
            return 'You\'ve won'
            break;
        case res < 0:
            return 'You\'ve lost'
            break;
        default:
    }
}