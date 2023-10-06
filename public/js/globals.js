
function highlightSelectedMenu(path) {
  console.warn(`[href="${path}"]`)
  document.querySelector(`[href="${path}"]`).parentElement.classList.add('menu__active')
}


window.onload = function () {
  highlightSelectedMenu(window.location.pathname)
}
