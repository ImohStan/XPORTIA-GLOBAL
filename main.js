
// Timer functionality
function updateTimer() {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Set target date to June 28th of current year
  let targetDate = new Date(currentYear, 5, 28); // Month is 0-indexed, so 5 = June
  
  // If June 28th has already passed this year, use next year's date
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, 5, 28);
  }
  
  // Calculate the time difference in milliseconds
  const difference = targetDate.getTime() - now.getTime();
  
  // If the target date has passed, show zeros
  if (difference <= 0) {
    document.getElementById('months').textContent = "0";
    document.getElementById('weeks').textContent = "0";
    document.getElementById('days').textContent = "0";
    document.getElementById('hours').textContent = "0";
    document.getElementById('minutes').textContent = "0";
    document.getElementById('timer-progress').style.width = "100%";
    return;
  }
  
  // Calculate total time from now until target date
  const totalTime = targetDate.getTime() - now.getTime();
  
  // Calculate time elapsed since the beginning of the countdown
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6); // Assume countdown started 6 months ago
  const elapsedTime = now.getTime() - startDate.getTime();
  const totalDuration = targetDate.getTime() - startDate.getTime();
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (elapsedTime / totalDuration) * 100);
  document.getElementById('timer-progress').style.width = `${progressPercentage}%`;
  
  // Calculate time units
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(difference / 1000);
  
  // Calculate months (approximate - assuming 30 days per month)
  const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
  
  // Calculate weeks
  const weeks = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60));
  
  // Calculate remaining days
  const days = Math.floor((totalSeconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
  
  // Calculate hours, minutes, and seconds
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  // Update the DOM
  document.getElementById('months').textContent = months;
  document.getElementById('weeks').textContent = weeks;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  
  // Update today's date
  document.getElementById('today-date').textContent = formatDate(now);
}

// Format date
function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Form validation
function validateForm(event) {
  event.preventDefault();
  
  let isValid = true;
  
  // Name validation
  const name = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  if (name.value.length < 2) {
    nameError.style.display = 'block';
    isValid = false;
  } else {
    nameError.style.display = 'none';
  }
  
  // Email validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }
  
  // Phone validation
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  if (phone.value.length < 10) {
    phoneError.style.display = 'block';
    isValid = false;
  } else {
    phoneError.style.display = 'none';
  }
  
  if (isValid) {
    alert('Registration successful!');
    document.getElementById('registration-form').reset();
  }
}

// Initialize the page
function initPage() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Start timer
  updateTimer();
  setInterval(updateTimer, 1000);

 
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
