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

const buildProjectSection = (projectsArr) => {
    const portfolioContainer = document.getElementById('portfolioContainer')
    projectsArr.forEach((project) => {
      const projectContainer = document.createElement('div')
      projectContainer.className = 'row'

      const container = document.createElement('div')
      container.className = 'six columns radial'
      //create title
      const title = document.createElement('h3')
      title.className = 'title radial color-emphasis'
      title.textContent = project.title
      container.appendChild(title)

      //create description
      const description = document.createElement('p')
      description.className = 'description radial'
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
      liveLink.className ='radial'
      container.appendChild(liveLink)
      //code link
      const codeLink = document.createElement('a')
      codeLink.setAttribute('href', project.code)
      codeLink.className = 'radial'
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
    })

}


buildProjectSection(projectsData)