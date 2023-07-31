const notify = document.querySelector('.notifyBell');
const dailyCanvas = document.getElementById("daily-chart");
const trafficCanvas = document.getElementById("traffic-chart");
const mobileCanvas = document.getElementById("mobile-chart");
let hourlyBtn = document.querySelector('.hourly-btn');
let dailyBtn = document.querySelector('.daily-btn');
let weeklyBtn = document.querySelector('.weekly-btn');
let monthlyBtn = document.querySelector('.monthly-btn');
let btnList = [hourlyBtn, dailyBtn, weeklyBtn, monthlyBtn];


function removeActiveClasses() {
  btnList.forEach((btn) => {
    btn.classList.remove('active');
  });
}


// data for traffic line chart
let trafficData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    data: [1102, 1397, 2007, 1988],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};

let hourlyTraffic = {
  labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am',
    '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
  datasets: [{
    data: [150, 300, 400, 200, 75, 500, 50, 450, 700, 650,
      333, 666, 1102, 980, 499, 650, 988, 100, 222, 309, 876, 777, 555, 409],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};
let dailyTraffic = {
  labels: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    data: [450, 600, 222, 345, 666, 980, 724],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};
let weeklyTraffic = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    data: [1102, 1397, 2007, 1988],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};
const monthlyTraffic = {
  labels: ['Jan', 'Feb', 'Mar', "Apr", "May", 'Jun', 'Jul', 'Sept', 'Nov', 'Dec'],
  datasets: [{
    data: [3908, 3566, 4010, 4200, 4309, 4809, 5197, 5783, 5543, 6066, 4507, 3809],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};

let trafficOptions = {
  backgroundColor: 'rgba(112, 104, 201, .5)',
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions,
});

hourlyBtn.addEventListener('click', () => {
  removeActiveClasses();
  hourlyBtn.classList.add('active');
  trafficChart.data.labels = hourlyTraffic.labels;
  trafficChart.data.datasets[0].data = hourlyTraffic.datasets[0].data;
  trafficChart.update();
});

dailyBtn.addEventListener('click', () => {
  removeActiveClasses();
  dailyBtn.classList.add('active');
  trafficChart.data.labels = dailyTraffic.labels;
  trafficChart.data.datasets[0].data = dailyTraffic.datasets[0].data;
  trafficChart.update();
});

weeklyBtn.addEventListener('click', () => {
  removeActiveClasses();
  weeklyBtn.classList.add('active');
  trafficChart.data.labels = weeklyTraffic.labels;
  trafficChart.data.datasets[0].data = weeklyTraffic.datasets[0].data;
  trafficChart.update();
});

monthlyBtn.addEventListener('click', () => {
  removeActiveClasses();
  monthlyBtn.classList.add('active');
  trafficChart.data.labels = monthlyTraffic.labels;
  trafficChart.data.datasets[0].data = monthlyTraffic.datasets[0].data;
  trafficChart.update();
});
// data for daily traffic bar chart
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1,
  }],
};

const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions,
});

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8',
    ],
  }],
};

const mobileOptions = {
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold',
      },
    },
  },
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions,
});

document.addEventListener('DOMContentLoaded', () => {
  // Get references to HTML elements
  const userField = document.getElementById('userField');
  const autocompleteDropdown = document.getElementById('autocompleteDropdown');
  const members = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver', 'victoria.chambers80@example.com', 'dale.byrd52@example.com', 'dawn.wood16@example.com', 'dan.oliver82@example.com'];

  // Load notifications from local storage or start with an empty array
  let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  const notificationsDropdown = document.getElementById('notifications');
  const notificationDot = document.querySelector('.notification-dot');
  const alertBanner = document.getElementById('alert');

  // Function to populate autocomplete dropdown based on user input
  const populateAutocompleteDropdown = matchedUsers => {
    autocompleteDropdown.innerHTML = '';
    autocompleteDropdown.style.display = matchedUsers.length === 0 ? 'none' : 'block';
    matchedUsers.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = user;
      listItem.addEventListener('click', () => {
        userField.value = user;
        autocompleteDropdown.style.display = 'none';
      });
      autocompleteDropdown.appendChild(listItem);
    });
  };

  // Function to create a new notification element
  const createNotificationElement = notification => {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    notificationElement.innerHTML = `<div class="notification-content">${notification.content}</div><div class="notification-timestamp">${notification.timestamp}</div>`;
    notificationElement.setAttribute('style', 'margin-bottom: 10px; border-bottom: 1px solid #ccc;padding: 6%;');
    return notificationElement;
  };

// Function to update notifications in the UI
const updateNotifications = () => {
  // Check if the two fixed notifications exist in the array
  const fixedNotifications = [
    `<strong>Settings updated:</strong><br>Email notifications enabled<br>Timezone set to: Moscow Standard Time`,
    `<strong>Settings updated:</strong><br>Profile set to public<br>Timezone set to: Hawaii Standard Time`,

    // Add any other fixed notifications here, if needed
  ];

  const existingNotificationContent = notifications.map(notification => notification.content);

  // Check if fixed notifications are missing and add them
  fixedNotifications.forEach(notification => {
    if (!existingNotificationContent.includes(notification)) {
      notifications.unshift({ type: 'fixed', timestamp: '', content: notification });
    }
  });

  // Sort notifications by timestamp (excluding fixed notifications)
  const sortedNotifications = notifications.filter(notification => notification.type !== 'fixed')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Show up to 7 notifications (excluding fixed notifications)
  const numNotifications = Math.min(sortedNotifications.length, 7);
  const shownNotifications = sortedNotifications.slice(0, numNotifications);

  // Clear previous notifications from the dropdown
  notificationsDropdown.innerHTML = '';

  // Add fixed notifications first
  fixedNotifications.forEach(notification => {
    const notificationElement = createNotificationElement({ type: 'fixed', timestamp: '', content: notification });
    notificationsDropdown.appendChild(notificationElement);
  });

  // Add the rest of the notifications
  shownNotifications.forEach(notification => {
    const notificationElement = createNotificationElement(notification);
    notificationsDropdown.appendChild(notificationElement);
  });

  // Update notification dot and alert banner
  const totalNotifications = sortedNotifications.length + fixedNotifications.length;
  notificationDot.textContent = totalNotifications.toString();
  notificationDot.style.display = totalNotifications > 0 ? 'block' : 'none';

  const notificationCount = Math.min(totalNotifications, 5);
  alertBanner.innerHTML = `<div class="alert-Banner"><p><strong>Alert:</strong> You have <strong>${notificationCount}</strong> new notifications</p><button class="alertBanner-Close">X</button></div>`;
  const closeButton = alertBanner.querySelector('.alertBanner-Close');
  closeButton.addEventListener('click', () => {
    alertBanner.style.display = 'none';
  });
};


// Function to add a new notification
const addNotification = (type, content) => {
  // Initialize notifications as an empty array if it's not an array
  if (!Array.isArray(notifications)) {
    notifications = [];
  }
  // Get the current timestamp
  const selectedTimezone = document.getElementById('timezoneSelect').value;
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezone = selectedTimezone === 'Select a Timezone' ? defaultTimezone : selectedTimezone;
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  // Create the notification object
  const newNotification = { type, timestamp, content };
  // Add the new notification to the beginning of the array
  notifications.unshift(newNotification);
  // Update notifications in the UI and save to local storage
  updateNotifications();
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

  // Function to handle form submission for sending a message
  const sendMessage = event => {
    event.preventDefault();
    const userField = document.getElementById('userField');
    const messageField = document.getElementById('messageField');
    const user = userField.value.toLowerCase();
    const message = messageField.value;
    if (user && message && message.trim() !== '') {
      const content = `<strong>New message to</strong> ${user}:<br> ${message}`;
      addNotification('message', content);
      alert('Message sent');
      userField.value = '';
      messageField.value = '';
    } else {
      alert('Invalid recipient or empty message');
    }
  };

  // Function to handle settings changes
  const handleSettingsChanges = () => {
    const settingsChanged = [];
    const emailNotificationsInput = document.getElementById('emailNotificationsInput');
    const publicProfileInput = document.getElementById('publicProfileInput');
    const timezoneSelect = document.getElementById('timezoneSelect');
    if (emailNotificationsInput.checked) settingsChanged.push('Email notifications enabled');
    if (publicProfileInput.checked) settingsChanged.push('Profile set to public');
    if (timezoneSelect.value !== 'Select a Timezone') settingsChanged.push(`Timezone set to: ${timezoneSelect.options[timezoneSelect.selectedIndex].text}`);
    if (settingsChanged.length > 0) addNotification('settings', `<strong>Settings updated:</strong><br>${settingsChanged.join('<br>')}`);
  };

  // Event listener for the 'send' button click event
  document.getElementById('send').addEventListener('click', sendMessage);

  // Event listener for the 'save' button click event
  document.getElementById('save').addEventListener('click', event => {
    event.preventDefault();
    handleSettingsChanges();
    alert('Settings saved');
    localStorage.setItem('emailNotificationsInput', document.getElementById('emailNotificationsInput').checked);
    localStorage.setItem('publicProfileInput', document.getElementById('publicProfileInput').checked);
    localStorage.setItem('timezoneSelect', document.getElementById('timezoneSelect').value);
  });

  // Load settings from local storage
  document.getElementById('emailNotificationsInput').checked = localStorage.getItem('emailNotificationsInput') === 'true';
  document.getElementById('publicProfileInput').checked = localStorage.getItem('publicProfileInput') === 'true';
  document.getElementById('timezoneSelect').value = localStorage.getItem('timezoneSelect') || 'Select a Timezone';

  // Event listener for the 'cancel' button click event
  const cancelButton = document.getElementById('cancel');
  if (cancelButton) {
    cancelButton.onclick = function () {
      localStorage.clear();
      window.location.reload();
    };
  }
  
  // Event listener for the 'input' event on the userField element
  userField.addEventListener('input', () => {
    const searchText = userField.value.toLowerCase();
    const matchedUsers = members.filter(member => member.toLowerCase().includes(searchText));
    populateAutocompleteDropdown(matchedUsers);
  });

  // Event listener for the 'click' event on the document
  document.addEventListener('click', event => {
    if (!userField.contains(event.target) && !autocompleteDropdown.contains(event.target)) {
      autocompleteDropdown.style.display = 'none';
    }
  });

  // Update notifications in the UI
  updateNotifications();
});