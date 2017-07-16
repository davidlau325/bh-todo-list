const { app, BrowserWindow } = require('electron');
const {ipcMain} = require('electron');

global.listData = {
    list:[
        {
            id:100,value:25
        }
    ]
};

app.on('ready', () => {


    const win = new BrowserWindow({
        width: 1200,
        height: 690,
        show: false,
    });
win.loadURL(`file://${__dirname}/dist/index.html`);
win.openDevTools();
win.show();

const win2 = new BrowserWindow({
    width: 1200,
    height: 690,
    show: false,
});
win2.loadURL(`file://${__dirname}/dist/index.html`);
win2.openDevTools();
win2.show();

ipcMain.on('data-update', (event, arg) => {
    console.log('main process get ipc');
console.log('send to all renderer');
win.webContents.send('refresh-render');
win2.webContents.send('refresh-render');
});
});
