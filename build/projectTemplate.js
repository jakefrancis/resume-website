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
      container.className = 'six columns'
      //create title
      const title = document.createElement('h3')
      title.className = 'title radial'
      title.textContent = project.title
      container.appendChild(title)

      //create description
      const description = document.createElement('p')
      description.className = 'description radial'
      description.textContent = project.description
      container.appendChild(description)

      //images container

      const imageContainer = document.createElement('div')

      imageContainer.className = 'six columns'

      const image = document.createElement('img')
      image.src = project.image

      imageContainer.appendChild(image)

      
      projectContainer.appendChild(container)
      projectContainer.appendChild(imageContainer)
      portfolioContainer.appendChild(projectContainer)
    })

}


buildProjectSection(projectsData)