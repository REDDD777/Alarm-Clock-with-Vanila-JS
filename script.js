let display = document.getElementById("clock");
const audio= new Audio("assets/alarm-sound.mp3");

audio.loop=true;// will play until loop is not ended by us

let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
    const now = new Date();
  
    const hours =now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
  
    document.getElementById('clock').textContent = currentTime;
    checkAlarms(currentTime);
  }
  
  
  
  // Step 3 - Set the Alarm  
  function setAlarm() {

    const alarmTime = document.getElementById('alarmTime').value;
    if (!alarmTime) {
      alert('Please set a valid alarm time.');
      return;
    }

    const current = new Date();
    const timeToAlarm = new Date(alarmTime);
    if (alarmTime) {
      
  
      if (timeToAlarm > current) {
        const timeout = timeToAlarm.getTime() - current.getTime();
        alarmTimeout = setTimeout(function() {
          audio.play();
        }, timeout);
        alert("Alarm set");
      }
    }
    const alarmList = document.getElementById('alarmList');
      const alarmItem = document.createElement('div');
      alarmItem.className = 'alarm';

      const timeDisplay = document.createElement('div');
      timeDisplay.textContent = `Alarm: ${timeToAlarm.getHours()+ ':' +timeToAlarm.getMinutes()}`;
      alarmItem.appendChild(timeDisplay);

      const deleteButton = document.createElement('div');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';
      deleteButton.addEventListener('click', function () {
        alarmList.removeChild(alarmItem);
      });
      alarmItem.appendChild(deleteButton);

      alarmList.appendChild(alarmItem);
  }

  function checkAlarms(currentTime) {
    const alarmList = document.getElementById('alarmList');
    const alarms = alarmList.getElementsByClassName('alarm');

    for (let i = 0; i < alarms.length; i++) {
      const alarm = alarms[i];
      const alarmTime = alarm.querySelector('div').textContent.replace('Alarm: ', '');

      if (alarmTime === currentTime) {
        alarmList.removeChild(alarm);
      }

    }
  }
  
  // Step 4 - Clear the Alarm
  function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
      
      alert("Alarm cleared");
    }
  }

  setInterval(updateTime, 1000);

  updateTime();