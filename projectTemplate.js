import projectsData from './data/projectData.js'

import buildSlider from './slider.js'

/*
const projectsData = [
  { title: "Tetris",
    description: "The classic falling block game written entirely in JS",
    live: 'www.tetris.com',
    demo: 'filepathhere'
  }
]
*/

let currentIndex = 0

const buildProjectSection = (projectArray) => {
  let index = 0
      projectArray.forEach((project) => {
      
      const cardsContainer = document.getElementById('viewport')
      const wrapper = document.createElement('div')
        wrapper.className='card-wrapper'
        wrapper.setAttribute('id', index)
        index++
      const card = document.createElement('div')
      card.className = 'card'
      card.setAttribute('id', 'card')

      //create title
      const title = document.createElement('h2')
      title.className = 'card-title'
      title.textContent = project.title
      card.appendChild(title)

       //images card

       const imageContainer = document.createElement('div')

       imageContainer.className = 'card-image-wrapper'
 
       const image = document.createElement('img')
       image.className = 'card-image'
       image.src = project.image

       imageContainer.appendChild(image)
 
       card.appendChild(imageContainer) 


      //create description
      const description = document.createElement('p')
      description.className = 'card-description'
      description.textContent = project.description
      card.appendChild(description)

      //tech used
      const skillContainer = document.createElement('div')
      skillContainer.className = 'card-code-container'

      const skillWrapper = document.createElement('div')
      skillWrapper.className = 'card-code-wrapper'

      project.technologies.forEach((tech) => {
        const skill = document.createElement('code')
        skill.className = 'card-code'
        skill.textContent = tech
        skillWrapper.appendChild(skill)
      })

      skillContainer.appendChild(skillWrapper)

     
   
      const livePWrapper = document.createElement('p')
      //live link
      const liveLink = document.createElement('a')
      liveLink.setAttribute('href', project.live)
      liveLink.innerHTML = 'Live '
      liveLink.className ='card-link-live'
      skillContainer.appendChild(liveLink)
      //code link
      const codeLink = document.createElement('a')
      codeLink.setAttribute('href', project.code)
      codeLink.className = 'card-link-code'
      codeLink.innerHTML = 'Source Code '
  

      

      const gitHubLogo = document.createElement('img')
      gitHubLogo.className = 'code-logo'
      gitHubLogo.src = 'images/logos/github.svg'
      codeLink.appendChild(gitHubLogo)
      
       skillContainer.appendChild(codeLink)
      card.appendChild(skillContainer)
      wrapper.appendChild(card)
     
      cardsContainer.appendChild(wrapper)
    

      })
        




      
}

const clearCurrentProject = () => {
  const cardsContainer = document.getElementById('cardsContainer')
  while(cardsContainer.firstChild){
    cardsContainer.removeChild(cardsContainer.lastChild)
  }
}


buildProjectSection(projectsData)

buildSlider('viewport')

/*

/*
const rightArrow = document.getElementById('right-arrow')

const next = (event) => {
  clearCurrentProject()
  currentIndex = currentIndex + 1 === projectsData.length ? 0 : currentIndex + 1
  buildProjectSection(projectsData[currentIndex])
}
rightArrow.addEventListener('click',(next))

const leftArrow = document.getElementById('left-arrow')

const prev = (event) => {
  clearCurrentProject()
  currentIndex = currentIndex - 1 === -1 ? projectsData.length - 1 : currentIndex - 1
  buildProjectSection(projectsData[currentIndex])
}

leftArrow.addEventListener('click',(prev))

*/