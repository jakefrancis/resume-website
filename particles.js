//Constants



let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

let parCount = 200
let canvasHeight = window.innerHeight
let canvasWidth  = window.innerWidth
let mobile = false

const parColor = 'rgb(0, 250, 204, 0.8)'
let parRadius =  Math.floor((canvasHeight + canvasWidth) / 500)

if(canvasWidth < 450 || canvasHeight < 450){
  parRadius = Math.floor((canvasHeight + canvasWidth) / 250)
  parCount = 100
  mobile = true
}

let resizeTimer;

const resizeCanvas = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    let previousWidth = canvasWidth
    let previousHeight  = canvasHeight
    let wider =  window.innerWidth / canvasWidth
    let taller = window.innerHeight / canvasHeight
    canvasHeight = window.innerHeight
    canvasWidth  = window.innerWidth
    canvas.style.width = Math.floor(canvasWidth) + 'px'
    canvas.style.height = Math.floor(canvasHeight) + 'px'
    canvas.width = Math.floor(canvasWidth) * dpr
    canvas.height = Math.floor(canvasHeight) * dpr
    ctx.scale(dpr,dpr)
    resize(wider, taller, previousWidth, previousHeight)

  },10)
     
}

const resize = (wider, taller, previousWidth, previousHeight) => {
    let adjustedCenterX = Math.floor((canvasWidth / 2) - (previousWidth / 2))
    let adjustedCenterY = Math.floor((canvasHeight / 2) - (previousHeight / 2))
    particles.forEach( (particle) => {
      if (wider > 1) {
        particle.dX *= wider
        if(!mobile){
          particle.x += adjustedCenterX
        }
        
      }
      
      if (taller > 1){
        particle.dY *= taller
        if(!mobile){
          particle.y += adjustedCenterY
        }
        
      } 
      
      if(particle.x > canvasWidth || particle.y > canvasHeight){
          particle.x = randomFromRange(2 * parRadius, canvasWidth - parRadius)
          particle.y = randomFromRange(canvasHeight/2, canvasHeight - parRadius)
          particle.dX = (Math.random()) - 0.5
          particle.dY = (Math.random()) - 0.5
          particle.alpha = 0
      }
    })
}

function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

const scrollIndicatorRight = document.getElementById('scroll-indicator-right')
const scrollIndicatorLeft = document.getElementById('scroll-indicator-left')

const rollParticles = () =>{
  const percent = Math.floor(getScrollPercent)
  scrollIndicatorRight.style.height = `${getScrollPercent()}%`
  scrollIndicatorLeft.style.height = `${getScrollPercent()}%`
  let previous = scrollTop
  scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  for(let particle of particles){
    if(particle.dY <= 0.5 || particle.dY >= -0.5){

  
    if(previous < scrollTop){
      
      particle.dY -= randomFromRange(1,10) * 0.002
    }
    else{
      particle.dY += randomFromRange(1,10) * 0.002
    }
  }
  }
}


window.addEventListener('window:resize', resizeCanvas)
window.onscroll = rollParticles





const canvas = document.getElementById('particles')
const dpr = window.devicePixelRatio  || 1
const ctx = canvas.getContext('2d','particles')

canvas.style.width = Math.floor(canvasWidth) + 'px'
canvas.style.height = Math.floor(canvasHeight) + 'px'

canvas.width = Math.floor(canvasWidth) * dpr
canvas.height = Math.floor(canvasHeight) * dpr

ctx.scale(dpr, dpr)

let particles = []

class Particle {
  constructor(x,y,dX,dY,radius){
    this.x = x
    this.y = y
    this.dX = dX
    this.dY = dY
    
    this.radius = parRadius
    this.electronRadius =  this.radius / 5    
    this.alpha = 0
    this.topSpeed = 0.6 - (Math.random() / 3)
    this.angle = randomFromRange(0,360)
    this.rotation = randomFromRange(2,4) === 2 ? Math.random() * 10 : -(Math.random() * 10)
  }
  move(){
    //verify if out of bounds
    this.dX = (this.dX + this.x) < 0 + this.radius|| (this.dX + this.x) > canvasWidth - this.radius
      ? -this.dX
      : this.dX
    this.dY = (this.dY + this.y) < 0  + this.radius || (this.dY + this.y) > canvasHeight - this.radius
      ? -this.dY 
      : this.dY
    //move particle
    if(this.dY >  this.topSpeed ||this.dY < -this.topSpeed){
      this.dY *= 0.998
    }
    if(this.dX > this.topSpeed||this.dX < -this.topSpeed){
      this.dX *= 0.998
    }
      
      this.x += this.dX 
      this.y += this.dY
  
  }

  rotate(){
    let radius = this.radius
    let theta = this.angle * (Math.PI/180)
    let cs = Math.cos(theta)
    let sn = Math.sin(theta)
    let px = (radius * cs) - (radius * sn) + this.x    
    let py = (radius * sn) + (radius * cs) + this.y
    let a = this.x - px < 0 ? px - this.x: this.x - px
    let b = this.y - py < 0 ? py - this.y: this.y - py
    let d = Math.sqrt((a * a) + (b * b))
    return {
     px,py,d
    }
  }

  draw(){
    let rotation = this.rotate()
    ctx.beginPath()

    //outer
    ctx.arc(this.x,this.y,this.electronRadius * 2, 0, 2 * Math.PI, false)
    ctx.lineWidth = 1
    if(this.alpha !== 100){
      this.alpha += randomFromRange(0,2)
      if(this.alpha > 100){
        this.alpha = 100
      }
    }
    ctx.fillStyle = `rgb(0, 250, 204, ${this.alpha / 100})`
    ctx.fillStyle = '#0d5d87'
    ctx.fill()
    ctx.closePath()


    ctx.beginPath()
    ctx.arc(rotation.px, rotation.py,this.electronRadius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = `rgb(0, 250, 204, ${this.alpha / 100})`
    ctx.strokeStyle = '#0d5d87'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(this.x,this.y, rotation.d, 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.closePath()
    this.angle += this.rotation
    if(this.angle > 360){
      this.angle = 0
    }
  }

  konami(){
    let ax = canvasWidth/2 - this.x;
    let by = canvasHeight/2 - this.y;
    let c = Math.sqrt(ax * ax + by * by);
    let gx = ax / c * 0.1;
    let gy = by / c * 0.1;

    this.dX += gx;
    this.dY += gy;


  }
}

const randomFromRange = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min)
}

const init = () => {
  particles = []
  let leng = parCount
    for(let i = 0; i < leng; i++){
      let particle = new Particle(
        (randomFromRange(2 * parRadius, canvasWidth - parRadius)), //x
        (randomFromRange(canvasHeight/2, canvasHeight - parRadius)), //y
        ((Math.random()) - 0.5), //dX
        ((Math.random()) - 0.5) //dY
      )
      particles.push(particle)
    }
}

const clearScreen = () => {
  ctx.clearRect(0,0,canvasWidth,canvasHeight)
}

let timeout = false

const drawParticles = (array) => {
  for(let particle of array){
    if(konami){
      particle.konami()
      if(!timeout){
        setTimeout(() => {
          konami = false
          timeout = false
        },10000)
        timeout = true
      }
    }
    particle.draw()
    particle.move()
  }
}

const canvasLoop = () => {
  clearScreen()
  drawParticles(particles)
  window.requestAnimationFrame(canvasLoop)
}

let konami = false

let codeCharacters = []
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

window.addEventListener('keyup', (event) => {
codeCharacters.push(event.key)
if(codeCharacters.length > konamiCode.length){
  codeCharacters.shift()
}
if(codeCharacters.length === konamiCode.length){
  for(let i = 0; i < codeCharacters.length; i++){
    if(codeCharacters[i] !== konamiCode[i]){
      return
    }
  }
  konami = true;
}
})

init()

window.requestAnimationFrame(canvasLoop)

const consoleFormatting = 'color: rgb(52, 54, 51) ; font-size: 1rem'

console.log('%cOh looks like we have a detective!🔍', consoleFormatting)
console.log('%c⬆⬆⬇⬇⬅➡⬅➡🅱🅰','color: rgb(52, 54, 51) ; font-size: 2rem')

