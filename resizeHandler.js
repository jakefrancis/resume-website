
let triggerResize = new CustomEvent('window:resize')

window.onresize = () => {
  window.dispatchEvent(triggerResize)
}