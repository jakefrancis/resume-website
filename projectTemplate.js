import projectsData from './data/projectData.js'

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

const buildProjectSection = (project) => {

      const portfolioContainer = document.getElementById('portfolioContainer')
      const projectContainer = document.createElement('div')
      projectContainer.className = 'project row border'
      projectContainer.setAttribute('id', 'projectContainer')

      const container = document.createElement('div')
      container.className = 'six columns'
      //create title
      const title = document.createElement('h3')
      title.className = 'title color-emphasis'
      title.textContent = project.title
      container.appendChild(title)

      //create description
      const description = document.createElement('p')
      description.className = 'description'
      description.textContent = project.description
      container.appendChild(description)

      //tech used

      project.technologies.forEach((tech) => {
        const skill = document.createElement('code')
        skill.textContent = tech
        container.appendChild(skill)
      })

      //live link
      const liveLink = document.createElement('a')
      liveLink.setAttribute('href', project.live)
      liveLink.innerHTML = 'Live '
      liveLink.className =''
      container.appendChild(liveLink)
      //code link
      const codeLink = document.createElement('a')
      codeLink.setAttribute('href', project.code)
      codeLink.className = ''
      codeLink.innerHTML = 'Source Code '

      const gitHubLogo = document.createElement('img')
      gitHubLogo.className = 'code-logo'
      gitHubLogo.src = 'images/logos/github.svg'
      codeLink.appendChild(gitHubLogo)
      container.appendChild(codeLink)

      //images container

      const imageContainer = document.createElement('div')

      imageContainer.className = 'six columns'

      const image = document.createElement('img')
      image.className = 'value-img'
      image.src = project.image
      image.setAttribute('href', liveLink)

      imageContainer.appendChild(image)

      
      projectContainer.appendChild(container)
      projectContainer.appendChild(imageContainer)
      portfolioContainer.appendChild(projectContainer)
    

}

const clearCurrentProject = () => {
  const portfolioContainer = document.getElementById('portfolioContainer')
  while(portfolioContainer.firstChild){
    portfolioContainer.removeChild(portfolioContainer.lastChild)
  }
}


buildProjectSection(projectsData[0])

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

