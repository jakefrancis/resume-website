



const buildSlider = (id) => {
  
  const slider = document.getElementById(String(id))
  
  const sliderChildren = slider.children

  console.log(sliderChildren.length)


  //stores the intial value of a touch event or mouse click
  let startX;

  //the slide that is in view, the first index is one, the math was easier that way.
  let slideInView = 1;

  //Is the slider begin clicked or touched
  let heldDown = false

  //previous x position, establishes if the user is swiping right or left
  let previous = 0;

  //the x postition of the slides at the center of the slidewindow in relation to the translation of the x position
  let posX = 0
  //
  let cardWidth = sliderChildren[0].offsetWidth



  const mouseDownListener = (event) => {
	  event.preventDefault();
    //record inital X position of the mouse
	  startX = event.clientX
    //mouse is being clicked	
	  heldDown = true	
  }

  slider.addEventListener('mousedown', mouseDownListener)

  
  
  const mouseUpListener = (event) => {
	  event.preventDefault();
    //no longer clicking
	  heldDown = false 
    //resets slide to it's center at the center of the slide window
	  resetPosition(posX)
  }

document.addEventListener('mouseup', mouseUpListener)


const mouseMoveListener = (event) => {
	event.preventDefault();
  //the distance traveled since last mouseMove event trigger
	let distance = event.clientX - previous 
  if(heldDown) {
    moveSlide(distance)
  }	
	previous = event.clientX;
}

slider.addEventListener('mousemove', mouseMoveListener)

const moveSlide = (distance) => {

  
    //direction the mouse was moved
    let direction = distance > 0 ? 'right': 'left'
    
    //change posX by the distance mouse/touch has moved
		posX = posX + (distance)		
  
		if(direction === 'left'){		
    //if the slide has moved 25% of its width, then change the index of the slide that is inview to the next slide
			if(posX < (-cardWidth * slideInView) + (cardWidth * 0.75)){
				slideInView++
        //prevent moving to a slide that doesn't exist
				if(slideInView > sliderChildren.length){
					slideInView--
					posX = (-cardWidth * slideInView) + (cardWidth * 0.75)
				}
				
			}			
		}
		else if (direction === 'right'){
      //same as above but opposite
			if(posX > (-cardWidth * (slideInView - 1)) + ( cardWidth * 0.25)){
        slideInView--
        //prevent moving to a slide that doesn't exist
				if(slideInView < 1){
					slideInView++
					posX = (-cardWidth * (slideInView - 1)) + ( cardWidth * 0.25)
				}				
			}			
		}				
		
    //moves all the slides based on the distance the mouse/touch has moved
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]	
			card.style.transform = `translateX(${posX}px)`				
		}		
	}

const resetPosition = (currentPosition) => {
  //posX
  let endPos = currentPosition
  /* Hooke's law: The force needed to compress or expand a spring
    F = kx

    where F is force generate
    k is the spring constant (positive real number)
    x is the distance from the springs point of equilibrium
    
  */
  
  //spring constant
	const k = 0.1
  //equilbrium point
	const resetPos = (slideInView - 1) * sliderChildren[0].offsetWidth
  //velocity generated
	let dX = k  * (resetPos + posX)
	
  //var is used in order to recursively call request animation frame
	var moveToEquilibrium = function() {
		
    //move the slide towards the equilibrium by the velocity generated
		endPos -= dX
    //recalculate velocity based on the slides new position
		dX = k * (resetPos + endPos)
    //visually move the slides
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]
		card.style.transform = `translateX(${endPos}px)`
		//if the spring has reached the equilibrium point stop
		if(endPos < -resetPos + 2 && endPos >  -resetPos - 2){
			for(let i = 0; i < sliderChildren.length; i++){
				let card = sliderChildren[i]
			card.style.transform = `translateX(${-resetPos}px)`
			}
			posX = -resetPos
			return 
		}
		}		
		window.requestAnimationFrame(moveToEquilibrium)
}
	window.requestAnimationFrame(moveToEquilibrium)	
}

//move the slides to the center of the viewport on window resize

//this needs to be extracted at some point
const centerViewport = () => {
  posX = -sliderChildren[0].offsetWidth * (slideInView - 1
)
  for(let i = 0; i < sliderChildren.length; i++){
    let card = sliderChildren[i]    
    card.style.transform = `translateX(${posX}px)`      
  }
}
window.addEventListener('window:resize', centerViewport)  
}



export default buildSlider

