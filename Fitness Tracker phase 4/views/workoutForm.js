function addWorkoutForm() {
    // console.log("in workoutform");
    const container = document.getElementById('workoutsContainer');
    const html = `
        <div class="workoutEntry">
            <label>Workout Type:</label>
            <input type="text" name="type[]" pattern="[A-Za-z ]+" title="Please enter valid workout name." placeholder="e.g., Bench Press" required>
            <label>Weight (lbs):</label>
            <input type="number" name="weight[]" min="1" step="1" placeholder="Weight in lbs">
            <label>Sets:</label>
            <input type="number" name="sets[]" min="1" step="1" placeholder="Number of sets">
            <label>Reps:</label>
            <input type="number" name="reps[]" min="1" step="1" placeholder="Number of reps">
            <button type="button" onclick="removeWorkoutForm(this.parentNode)">Remove</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeWorkoutForm(element) {
    element.remove();
}

function submitWorkout(event) {
    event.preventDefault();
    
    const messageContainer = document.getElementById('message-container');
    const filled = document.getElementById('error-message');
    filled.style.display = 'none';

    let allFilled = true;
    const date = document.getElementById('date').value;
    const workouts = Array.from(document.querySelectorAll('.workoutEntry')).map(entry => {
        const type = entry.querySelector('[name="type[]"]').value.trim();
        const weight = entry.querySelector('[name="weight[]"]').value.trim();
        const sets = entry.querySelector('[name="sets[]"]').value.trim();
        const reps = entry.querySelector('[name="reps[]"]').value.trim();

        if (!type || !weight || !sets || !reps) {
            allFilled = false;
        }

        return { type, weight, sets, reps };
    });

    if (!allFilled) {
        filled.textContent = "Please enter all data";
        filled.style.display = 'inline';
        return; 
    }
    
    fetch('/submit-workouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, workouts })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        messageContainer.textContent = 'Workout has been successfully logged!';
        messageContainer.style.display = 'block';

        document.getElementById('workoutsContainer').innerHTML = '';
        document.querySelector('form').reset(); 
    })
    .catch(error => console.error('Error:', error));

}