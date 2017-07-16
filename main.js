const { app, BrowserWindow } = require('electron');
const {ipcMain} = require('electron');

// shared to-do list data
global.sharedData = {
    itemList: [
        {
            id: 0,
            text: "First meet up with David Lau on 5th July",
            isCompleted: true
        },
        {
            id: 1,
            text: "David Bewick meet with David Lau on Monday",
            isCompleted: true
        },
        {
            id: 2,
            text: "David Lau to speak with Kaspar on Wednesday",
            isCompleted: false
        }
    ],
    itemLatestID: 2
};

// electron main process
app.on('ready', () => {
    const numOfWindows = 3; // number of windows, can grow dynamically
    var windows = [];

    for(var i = 0; i < numOfWindows; i++){
        const win = new BrowserWindow({
            width:  800,
            height: 600,
            show: true,
        });

        win.loadURL(`file://${__dirname}/dist/index.html`);
        // win.openDevTools();
        windows.push(win);
    }

    ipcMain.on('item-list-update', () => {
        windows.forEach((win) => {
            win.webContents.send('refresh-item-data');
        });
    });
});
