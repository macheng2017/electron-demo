const { dialog, ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')

$('add-music-btn').addEventListener('click', () => {
  // console.log('object')
  ipcRenderer.send('showSelectMusicDialog', 'emit message')
  // dialog.showOpenDialog(
  //   {
  //     properties: ['openFile', 'openDirectory', 'multiSelections'],
  //     filters: [{ name: 'Music', extensions: ['mp3'] }]
  //   },
  //   files => {
  //     console.log(files)
  //   }
  // )
})
const renderListHTML = pathes => {
  const musicList = $('music-list')

  const musicItemsHTML = pathes.reduce((html, music) => {
    html += `<li class="list-group-item">${path.basename(music)}</li>`
    return html
  }, '')
  musicList.innerHTML = `<ul calss="list-group"> ${musicItemsHTML}</ul>`
}

ipcRenderer.on('selected-file', (event, paths) => {
  if (Array.isArray(paths)) {
    renderListHTML(paths)
  }
})
