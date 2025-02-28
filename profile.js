function toggleEdit(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select');
    const saveBtn = form.querySelector('.save-btn');
    
    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });

    if (saveBtn) {
        saveBtn.classList.toggle('hidden');
    }
}

function savePersonalInfo(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;

    toggleEdit('personal-info');

    alert('Profile updated successfully!');

    return false;
}

function addGoal() {
    alert('Add goal functionality will be implemented here');
}


const ctx = document.getElementById('progressChart').getContext('2d');
