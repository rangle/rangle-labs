const business = require('business')
const Agent = business.models.agent
const technologies = require('./technologies')

const agents = []

const marian = new Agent({
  firstName: 'Marian',
  lastName: 'Halcombe',
  position: 'Developer',
  image:
    'http://www.greengaragedetroit.com/site/wp-content/uploads/2017/10/Gracie-Headshot-square-1.png',
  currentTechnologies: [technologies[0], technologies[1], technologies[3]],
  aspirationalTechnologies: [technologies[4], technologies[5]],
  available: true,
})

const walter = new Agent({
  firstName: 'Walter ',
  lastName: 'Hartright',
  position: 'Designer',
  image: 'https://jebbeach.com/wp-content/uploads/2015/01/MKA-Square-Headshot-350x350.jpg',
  currentTechnologies: [technologies[0], technologies[3], technologies[4]],
  aspirationalTechnologies: [technologies[6], technologies[7]],
  available: true,
})

const laura = new Agent({
  firstName: 'Laura',
  lastName: 'Fairlie',
  position: 'Developer',
  image: 'http://angietolpin.com/wp-content/uploads/2015/01/Angie-headshot-square.jpg',
  currentTechnologies: [technologies[0], technologies[1], technologies[2]],
  aspirationalTechnologies: [technologies[4]],
  available: false,
})

const percival = new Agent({
  firstName: 'Percival',
  lastName: 'Glyde',
  position: 'Scrum Master',
  image:
    'https://www.wealthclinic.com/wp-content/uploads/2016/06/re-perez-branding-for-the-people-square-headshot.jpg',
  currentTechnologies: [technologies[1], technologies[2]],
  aspirationalTechnologies: [technologies[4], technologies[6]],
  available: true,
})

const fosco = new Agent({
  firstName: 'Isidor',
  lastName: 'Fosco',
  position: 'Designer',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqe4GNsG5yGTAdudEaK_u-jh4IlT6F7CnRqUkkiaERdg7uexoK',
  currentTechnologies: [technologies[1], technologies[3], technologies[5]],
  aspirationalTechnologies: [technologies[2], technologies[4]],
  available: false,
})

const anne = new Agent({
  firstName: 'Anne',
  lastName: 'Catherick',
  position: 'Developer',
  image:
    'http://robtrendiak.com/files/uploads/2018/04/corporate_linkedin_headshot_vancovuer-9825.jpg',
  currentTechnologies: [technologies[6], technologies[7], technologies[2]],
  aspirationalTechnologies: [technologies[1], technologies[3]],
  available: true,
})

agents.push(marian, walter, laura, percival, fosco, anne)

module.exports = agents
