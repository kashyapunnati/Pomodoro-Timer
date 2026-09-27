# 🍅 Pomodoro Timer

A simple web-based Pomodoro Timer that helps users manage work and break sessions using configurable time intervals.

## ✨ Features

- Configurable work duration
- Configurable break duration
- Start timer
- Pause timer
- Reset timer
- Automatic switch between work and break
- Completed session counter
- Browser notifications
- Save timer settings using LocalStorage
- Responsive design

## ⏱️ How It Works

The timer follows a simple Pomodoro-style cycle:

1. Start a work session.
2. When the work session ends, the timer automatically switches to a break.
3. When the break ends, the timer automatically switches back to work.
4. Each completed work session increases the session counter.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Browser Notifications API

## ⚙️ Settings

Users can configure:

- Work Duration
- Break Duration

The saved settings are stored in LocalStorage and remain available after refreshing the page.

## 🔔 Notifications

The application uses the browser Notifications API to notify the user when a work or break session ends.

## 🚀 How to Use

1. Open `index.html` in a web browser.
2. Set the work and break durations.
3. Click **Save Settings**.
4. Click **Start** to begin the timer.
5. Use **Pause** when needed.
6. Use **Reset** to restart the current work session.
7. Allow browser notifications when requested.

## 📁 Project Structure

Pomodoro-Timer

├── index.html
├── style.css
├── script.js
└── README.md
