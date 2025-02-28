function generateDietPlan(event) {
    event.preventDefault();
    
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const goal = document.getElementById('goal').value;
    const activity = document.getElementById('activity').value;
    const dietPreference = document.getElementById('diet-preference').value;

    document.getElementById('dietContent').classList.remove('hidden');

    const bmr = 10 * weight + 6.25 * height - 5 * age;
    
    const activityMultipliers = {
        'sedentary': 1.2,
        'moderate': 1.55,
        'active': 1.9
    };

    let dailyCalories = bmr * activityMultipliers[activity];

    if (goal === 'weight-loss') {
        dailyCalories *= 0.8; 
    } else if (goal === 'muscle-gain') {
        dailyCalories *= 1.1; 
    }

    document.getElementById('totalCalories').textContent = Math.round(dailyCalories) + ' kcal';
    document.getElementById('totalProtein').textContent = Math.round(weight * 2) + ' g';
    document.getElementById('totalCarbs').textContent = Math.round(dailyCalories * 0.5 / 4) + ' g';

    const meals = getMealPlan(dietPreference, goal);
    
    document.getElementById('breakfastItems').innerHTML = meals.breakfast.map(item => `<li>${item}</li>`).join('');
    document.getElementById('snack1Items').innerHTML = meals.snack1.map(item => `<li>${item}</li>`).join('');
    document.getElementById('lunchItems').innerHTML = meals.lunch.map(item => `<li>${item}</li>`).join('');
    document.getElementById('snack2Items').innerHTML = meals.snack2.map(item => `<li>${item}</li>`).join('');
    document.getElementById('dinnerItems').innerHTML = meals.dinner.map(item => `<li>${item}</li>`).join('');

    return false;
}

function getMealPlan(preference, goal) {
    const mealPlans = {
        'vegetarian': {
            breakfast: ['Oatmeal with banana and almonds', 'Greek yogurt with berries', 'Whole grain toast with avocado'],
            snack1: ['Apple slices with peanut butter', 'Handful of mixed nuts'],
            lunch: ['Quinoa bowl with roasted vegetables', 'Chickpea curry with brown rice', 'Mixed green salad'],
            snack2: ['Carrot sticks with hummus', 'Trail mix'],
            dinner: ['Lentil soup', 'Stir-fried tofu with vegetables', 'Steamed broccoli']
        },
        'non-vegetarian': {
            breakfast: ['Scrambled eggs with whole grain toast', 'Protein smoothie', 'Turkey bacon'],
            snack1: ['Greek yogurt with honey', 'Protein bar'],
            lunch: ['Grilled chicken breast', 'Sweet potato', 'Steamed vegetables'],
            snack2: ['Tuna with crackers', 'Almonds'],
            dinner: ['Baked salmon', 'Quinoa', 'Roasted vegetables']
        },
        'vegan': {
            breakfast: ['Smoothie bowl with plant-based protein', 'Overnight oats with chia seeds', 'Whole grain toast with almond butter'],
            snack1: ['Mixed berries', 'Trail mix'],
            lunch: ['Buddha bowl with tempeh', 'Quinoa salad', 'Roasted chickpeas'],
            snack2: ['Energy balls', 'Fresh fruit'],
            dinner: ['Lentil curry', 'Brown rice', 'Steamed vegetables']
        }
    };

    return mealPlans[preference];
}