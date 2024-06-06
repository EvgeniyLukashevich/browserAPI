const scheduleData = [
    {id: 1, title: 'Йога', time: '10:00', maxParticipants: 10, currentParticipants: 5},
    {id: 2, title: 'Пилатес', time: '12:00', maxParticipants: 15, currentParticipants: 15},
    {id: 3, title: 'Бокс', time: '14:00', maxParticipants: 20, currentParticipants: 18}
];

function renderSchedule() {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    scheduleData.forEach(classData => {
        const classElement = document.createElement('div');
        classElement.classList.add('card', 'mb-3');
        classElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${classData.title}</h5>
                <p class="card-text">Время проведения: ${classData.time}</p>
                <p class="card-text">Максимальное количество участников: ${classData.maxParticipants}</p>
                <p class="card-text">Текущее количество участников: <span id="participants-${classData.id}">${classData.currentParticipants}</span></p>
                <button id="signup-${classData.id}" class="btn btn-primary" ${classData.currentParticipants >= classData.maxParticipants ? 'disabled' : ''}>Записаться</button>
                <button id="cancel-${classData.id}" class="btn btn-secondary">Отменить запись</button>
            </div>
        `;
        scheduleContainer.appendChild(classElement);

        document.getElementById(`signup-${classData.id}`).addEventListener('click', () => signUp(classData.id));
        document.getElementById(`cancel-${classData.id}`).addEventListener('click', () => cancelSignUp(classData.id));
    });
}

function signUp(classId) {
    const classData = scheduleData.find(c => c.id === classId);
    if (classData.currentParticipants < classData.maxParticipants) {
        classData.currentParticipants++;
        document.getElementById(`participants-${classId}`).innerText = classData.currentParticipants;
        if (classData.currentParticipants >= classData.maxParticipants) {
            document.getElementById(`signup-${classId}`).disabled = true;
        }
    }
}

function cancelSignUp(classId) {
    const classData = scheduleData.find(c => c.id === classId);
    if (classData.currentParticipants > 0) {
        classData.currentParticipants--;
        document.getElementById(`participants-${classId}`).innerText = classData.currentParticipants;
        if (classData.currentParticipants < classData.maxParticipants) {
            document.getElementById(`signup-${classId}`).disabled = false;
        }
    }
}


document.addEventListener('DOMContentLoaded', renderSchedule);
