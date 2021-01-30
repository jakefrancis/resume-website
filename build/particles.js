//Constants


let canvasHeight = window.innerHeight
let canvasWidth  = window.innerWidth
let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

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
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  resize()
}

const resize = () => {
    particles.forEach( (particle) => {
      particle.x = particle.x > canvasWidth ?  randomFromRange( canvasWidth - parRadius * 4,canvasWidth - parRadius * 2)  : particle.x
      particle.y = particle.y > canvasHeight ?  canvasHeight - parRadius : particle.y
    })
}

const rollParticles = () =>{
  console.log('hello')
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
    if(this.dY > 0.2 ||this.dY < -0.2){
      this.dY *= 0.999
    }
      
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
        (randomFromRange(canvasHeight/2, canvasHeight - parRadius)), //y
        ((Math.random()) - 0.5), //dX
        ((Math.random()) - 0.5) //dY
      )
      particles.push(particle)
    }
}

const clearScreen = () => {
  //ctx.fillStyle = '#858289'
  ctx.fillStyle = '#fff'

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



