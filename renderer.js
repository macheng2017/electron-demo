// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer, remote } = require('electron')
const { BrowserWindow } = remote
const win = new BrowserWindow()

const dom = win.loadFile('index.html')
const fs = require('fs')

const root = fs.readdirSync('/')

document.documentElement.innerHTML = `${root}`
ipcRenderer.send('message', root)
