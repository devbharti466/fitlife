function generateWorkoutPlan(event) {
    event.preventDefault();
    
    const fitnessLevel = document.getElementById('fitness-level').value;
    const goal = document.getElementById('workout-goal').value;
    const daysPerWeek = document.getElementById('days-per-week').value;
    const equipment = document.getElementById('equipment').value;

    // Show the workout content
    document.getElementById('workoutContent').classList.remove('hidden');

    // Generate workout based on inputs
    const workout = getWorkoutPlan(fitnessLevel, goal, equipment);
    
    // Update summary
    document.getElementById('caloriesBurn').textContent = workout.calories + ' kcal';
    document.getElementById('totalDuration').textContent = workout.duration + ' min';
    document.getElementById('totalExercises').textContent = workout.exercises.length;

    // Generate exercise cards
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';
    
    workout.exercises.forEach((exercise, index) => {
        const card = createExerciseCard(exercise, index);
        exerciseList.appendChild(card);
    });

    return false;
}

function createExerciseCard(exercise, index) {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
        <div class="exercise-info">
            <h3><i class="${exercise.icon}"></i> ${exercise.name}</h3>
            <p class="exercise-details">${exercise.description}</p>
            <p><strong>Sets:</strong> ${exercise.sets} | <strong>Reps:</strong> ${exercise.reps}</p>
        </div>
        <div class="timer-section">
            <div class="timer-display" id="timer-${index}">00:00</div>
            <div class="timer-controls">
                <button class="timer-btn start-btn" onclick="startTimer(${index}, ${exercise.duration})">
                    <i class="fas fa-play"></i>
                </button>
                <button class="timer-btn pause-btn" onclick="pauseTimer(${index})">
                    <i class="fas fa-pause"></i>
                </button>
                <button class="timer-btn reset-btn" onclick="resetTimer(${index}, ${exercise.duration})">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

let timers = {};

function startTimer(index, duration) {
    if (timers[index]) {
        clearInterval(timers[index].interval);
    }

    let timeLeft = timers[index]?.timeLeft || duration;
    const timerDisplay = document.getElementById(`timer-${index}`);
    
    timers[index] = {
        timeLeft: timeLeft,
        interval: setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timers[index].timeLeft = timeLeft;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                clearInterval(timers[index].interval);
                alert(`Exercise ${index + 1} completed!`);
            }
        }, 1000)
    };
}

function pauseTimer(index) {
    if (timers[index]) {
        clearInterval(timers[index].interval);
    }
}

function resetTimer(index, duration) {
    if (timers[index]) {
        clearInterval(timers[index].interval);
    }
    timers[index] = { timeLeft: duration };
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    document.getElementById(`timer-${index}`).textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getWorkoutPlan(fitnessLevel, goal, equipment) {
    const workouts = {
        beginner: {
            'weight-loss': {
                calories: 300,
                duration: 45,
                exercises: [
                    {
                        name: 'Bodyweight Squats',
                        icon: 'fas fa-running',
                        description: 'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair',
                        sets: 3,
                        reps: '15',
                        duration: 60
                    },
                    {
                        name: 'Push-ups',
                        icon: 'fas fa-hand-rock',
                        description: 'Start in plank position, lower chest to ground and push back up',
                        sets: 3,
                        reps: '10',
                        duration: 45
                    },
                    {
                        name: 'Mountain Climbers',
                        icon: 'fas fa-hiking',
                        description: 'In plank position, alternate bringing knees to chest',
                        sets: 3,
                        reps: '30 seconds',
                        duration: 30
                    }
                ]
            },
            'muscle-gain': {
                calories: 400,
                duration: 50,
                exercises: [
                    {
                        name: 'Dumbbell Rows',
                        icon: 'fas fa-dumbbell',
                        description: 'Bend over with dumbbell in each hand, pull weights to chest',
                        sets: 3,
                        reps: '12',
                        duration: 60
                    },
                    {
                        name: 'Lunges',
                        icon: 'fas fa-walking',
                        description: 'Step forward and lower back knee toward ground',
                        sets: 3,
                        reps: '10 each leg',
                        duration: 45
                    }
                ]
            }
        },
        intermediate: {
            'weight-loss': {
                calories: 500,
                duration: 60,
                exercises: [
                    {
                        name: 'Burpees',
                        icon: 'fas fa-running',
                        description: 'Drop to ground, perform push-up, jump back up',
                        sets: 4,
                        reps: '12',
                        duration: 60
                    },
                    {
                        name: 'Jump Squats',
                        icon: 'fas fa-running',
                        description: 'Perform squat, explode up into jump',
                        sets: 4,
                        reps: '15',
                        duration: 45
                    }
                ]
            }
        }
    };

    return workouts[fitnessLevel][goal] || workouts.beginner['weight-loss'];
}