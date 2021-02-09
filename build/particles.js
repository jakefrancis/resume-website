//Constants



let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

let parCount = 300
let canvasHeight = window.innerHeight
let canvasWidth  = window.innerWidth
let mobile = false

const parColor = 'rgb(0, 250, 204, 0.8)'
let parRadius =  Math.floor((canvasHeight + canvasWidth) / 500)

if(canvasWidth < 450 || canvasHeight < 450){
  parRadius = Math.floor((canvasHeight + canvasWidth) / 250)
  parCount = 150
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


const rollParticles = () =>{

  let previous = scrollTop
  scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  for(particle of particles){
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


window.onresize = resizeCanvas
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
  constructor(x,y,dX,dY){
    this.x = x
    this.y = y
    this.dX = dX
    this.dY = dY
    this.alpha = 0
    this.topSpeed = 0.6 - (Math.random() / 3)
  }
  move(){
    //verify if out of bounds
    this.dX = (this.dX + this.x) < 0 + parRadius|| (this.dX + this.x) > canvasWidth - parRadius
      ? -this.dX
      : this.dX
    this.dY = (this.dY + this.y) < 0  + parRadius || (this.dY + this.y) > canvasHeight - parRadius
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
  draw(){
    ctx.beginPath()
    ctx.arc(this.x,this.y,parRadius, 0, 2 * Math.PI, false)
    ctx.lineWidth = 1
    if(this.alpha !== 100){
      this.alpha += randomFromRange(0,2)
      if(this.alpha > 100){
        this.alpha = 100
      }
    }
    ctx.strokeStyle = `rgb(0, 250, 204, ${this.alpha / 100})`
    ctx.stroke()
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
  //ctx.fillStyle = 'white'
  ctx.fillStyle = 'rgb(133,130,137,1)'

  ctx.fillRect(0,0,canvasWidth,canvasHeight)
}

const drawParticles = (array) => {
  for(particle of array){
    particle.draw()
    particle.move()
  }
}

const canvasLoop = () => {
  clearScreen()
  drawParticles(particles)
  window.requestAnimationFrame(canvasLoop)
}

init()

window.requestAnimationFrame(canvasLoop)

console.log('Oh looks like we have a detective!🔍')
console.log('Looking for anything in particular? contact: jake@hellojake.com')



