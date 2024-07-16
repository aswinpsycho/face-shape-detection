function calculateBond() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    const cheerSound = document.getElementById('cheer-sound');
    const whistleSound = document.getElementById('whistle-sound');

    if (name1 === '' || name2 === '') {
        resultDiv.textContent = 'Please enter both names.';
        return;
    }

    let bondScore = calculateBondScore(name1, name2);

    resultDiv.textContent = `Bond Score: ${bondScore}`;

    if (bondScore > 250) {
        resultDiv.innerHTML += '<br>Cheers! 🎉';
        cheerSound.play();
        showAnimation('cheer-animation', '🎉');
    } else if (bondScore >= 100) {
        resultDiv.innerHTML += '<br>Not bad! 👏';
        whistleSound.play();
        showAnimation('clap-animation', '👏');
    } else if (bondScore < 50) {
        resultDiv.innerHTML += '<br>Got to shit! 😔';
    }
}

function calculateBondScore(name1, name2) {
    let score = 0;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    
    for (let char of name1 + name2) {
        score += letters.indexOf(char) + 1;
    }

    return score;
}

function showAnimation(className, symbol) {
    const animationDiv = document.createElement('div');
    animationDiv.className = className;
    animationDiv.textContent = symbol;
    document.body.appendChild(animationDiv);

    setTimeout(() => {
        animationDiv.remove();
    }, 2000);
}


