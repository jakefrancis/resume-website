const projectsData = [

  { 
    title: "Blog Cabin",
    description: `Responsive fullstack CRUD blog aggregation website. Allows the creation of users. User authentification is implemented via JSON web tokens and password hashing. Utilizes an Express and MongoDB backend, and a React and SASS frontend. Please allow 30s for application to spin up`,
    live: 'http://blogcabin.hellojake.com',
    technologies: ['React','SASS', 'NodeJS', 'Express', 'MongoDB'],
    code: 'https://github.com/jakefrancis/blogcabin-frontend',
    image: 'images/blogcabin.png',
    alt: 'screenshot of blogcabin app',
    demo: '/blogcabin/'
  },
  { 
    title: "Tetris",
    description: `The classic falling block game written in JS. Mobile and touch friendly.`,
    live: 'https://tetris.hellojake.com',
    technologies: ['Javascript','HTML','CSS'],
    code: 'https://github.com/jakefrancis/tetris-rewrite',
    image: 'images/tetris.png',
    alt: 'a game of tetris in progress',
    demo: '/tetris/'
  },

  {
    title: "NASA Astronomy Photo of the Day",
    description: `An Infinitely scrolling website that shows the NASA Astronmy Photo of the Day starting from today. This app utilizes an Express backend proxy server to hide the NASA API key, and caches NASA responses into a MongoDB`,
    live: 'https://nasa.hellojake.com',
    technologies: ['React','CSS', 'NodeJS', 'Express', 'MongoDB'],
    code: 'https://github.com/jakefrancis/nasa-apod-backend',
    image: 'images/nasa-apod.jpg',
    alt: 'screenshot of a NASA astrononmy photo of the day website',
    demo: 'filepathhere'
  },
  {
    title: "Automated Paging System",
    description: `Sends a custom message to an employee's pager at a designated time. I recommend viewing the source code first for background information`,
    live: 'https://jake-aps.netlify.app',
    technologies: ['Javascript','HTML','CSS'],
    code: 'https://github.com/jakefrancis/automated-paging-system',
    image: 'images/paging-system.png',
    alt: 'overview of my paging system',
    demo: 'filepathhere'
  },
  {
    title: "Snake",
    description: "Mobile friendly Pure JS implementation of snake. ",
    live: 'https://snake.hellojake.com',
    technologies: ['Javascript','HTML','CSS'],
    code: 'https://github.com/jakefrancis/multiplayer-snake',
    alt: 'a game of snake in progress',
    image: 'images/snake.jpg',
    demo: 'filepathhere'    
  },
  {
    title: "Slider",
    description: "A physics based slider built with javascript. You're using it right now!",
    live: 'https://jake-slider.netlify.app',
    technologies: ['Javascript','HTML','CSS'],
    code: 'https://github.com/jakefrancis/slider',
    image: 'images/slider.png',
    alt: 'mockup of the slider system',
    demo: 'filepathhere'    
  },
 
]


export default projectsData