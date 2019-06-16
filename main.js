// Modules to control application life and create native browser window
const { ipcMain, app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = { ...baseConfig, ...config }
    super(finalConfig) // 调用父类
    this.loadFile(fileLocation) // 调用自己的实例?
  }
}

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new AppWindow({}, './renderer/index.html')

  // and load the index.html of the app.
  // mainWindow.loadFile('./renderer/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('clickAddMusicBtn', (event, arg) => {
  createAddMusicWindow()
})

let addMusicWindow
function createAddMusicWindow() {
  addMusicWindow = new AppWindow(
    {
      width: 600,
      height: 600
    },
    './renderer/add.html'
  )
}
