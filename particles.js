//Constants


let canvasHeight = window.innerHeight
let canvasWidth  = window.innerWidth

let parCount = 300
const parColor = 'rgb(0, 250, 204, 0.8)'
let parRadius =  Math.floor((canvasHeight + canvasWidth) / 500)

if(canvasWidth < 450){
  parRadius = Math.floor((canvasHeight + canvasWidth) / 250)
  parCount = 150
}

const resizeCanvas = () => {
  canvasHeight = window.innerHeight
  canvasWidth  = window.innerWidth
  parCount = 300
  parRadius =  Math.floor((canvasHeight + canvasWidth) / 500)
  if(canvasWidth < 450){
    parRadius = Math.floor((canvasHeight + canvasWidth) / 250)
    parCount = 150
  }
  init()
}


window.onresize = resizeCanvas

const canvas = document.getElementById('particles')
const ctx = canvas.getContext('2d','particles')

canvas.width = canvasWidth
canvas.height = canvasHeight

let particles = []

class Particle {
  constructor(x,y,dX,dY){
    this.x = x
    this.y = y
    this.dX = dX
    this.dY = dY
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
      this.x += this.dX
      this.y += this.dY
  
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x,this.y,parRadius, 0, 2 * Math.PI, false)
    ctx.lineWidth = 1
    ctx.strokeStyle = parColor
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
        (randomFromRange(2 * parRadius, canvasHeight - parRadius)), //y
        ((Math.random()) - 0.5), //dX
        ((Math.random()) - 0.5) //dY
      )
      particles.push(particle)
    }
}

const clearScreen = () => {
  ctx.fillStyle = '#858289'
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



