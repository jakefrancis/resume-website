const headerLinks = document.querySelectorAll(".header a")

for (const link of headerLinks){
  if(link.getAttribute('href')){
    link.addEventListener('click', clickHandler)
  }
}

function clickHandler (event) {
  event.preventDefault()
  const href = this.getAttribute('href')
  const offsetTop = document.querySelector(href).offsetTop
  scroll({
    top: offsetTop,
    behavior: "smooth"
  })
}