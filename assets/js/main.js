function generateInputs() {
    const num = parseInt(document.getElementById('numParticipants').value);
    const inputContainer = document.getElementById('nameInputs');
    const generateBtn = document.getElementById('generateBtn');
    const resultsDiv = document.getElementById('results');

    inputContainer.innerHTML = '';
    resultsDiv.classList.add('d-none');
    generateBtn.classList.add('d-none');

    if (isNaN(num) || num < 2) {
        alert('Please enter a valid number (at least 2).');
        return;
    }

    for (let i = 0; i < num; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'mb-2';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.placeholder = `Participant ${i + 1}`;
        input.required = true;

        inputGroup.appendChild(input);
        inputContainer.appendChild(inputGroup);
    }

    generateBtn.classList.remove('d-none');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateSecretSanta() {
    const inputFields = document.querySelectorAll('#nameInputs input');
    const names = Array.from(inputFields).map(input => input.value.trim());

    if (names.includes('') || new Set(names).size !== names.length) {
        alert('Please enter unique, non-empty names for all participants.');
        return;
    }

    let santas;
    do {
        santas = shuffleArray([...names]);
    } while (santas.some((santa, i) => santa === names[i]));

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h5>Secret Santa Pairings:</h5><ul class="list-group list-group-flush mt-3">`;
    names.forEach((name, i) => {
        resultsDiv.innerHTML += `<li class="list-group-item"><strong>${name}</strong> is Secret Santa for <strong>${santas[i]}</strong></li>`;
    });
    resultsDiv.innerHTML += '</ul>';

    resultsDiv.classList.remove('d-none');
}