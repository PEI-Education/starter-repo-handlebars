import './styles/psb_hs.css';
import './styles/spinner.css';

const template = require('./js/psb_hs.hbs')

const dataSource = `./json/psb_hs.json?dothisfor=${reportconfig.dothisfor}&coteachers=${reportconfig.coteachers}&termid=${reportconfig.termid}&storecode=${reportconfig.storecode}`

// Test data -> const dataSource = `./json/psb_hs.fake.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}&termid=${reportconfig.termid}`

const fadeOutEffect = () => {
   let fadeTarget = document.getElementById("overlay");
   let fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
         fadeTarget.style.opacity = .8;
      }
      if (fadeTarget.style.opacity > 0) {
         fadeTarget.style.opacity -= 0.1;
      } else {
         clearInterval(fadeEffect);
      }
   }, 200);
}

function process(students) {
   
   students.forEach((student) => {
      student.semCourses.pop()
      student.fyCourses.pop()
      student.transcript.pop()
   })

   const outputData = { reportconfig: reportconfig, students: students }
   const container = document.getElementById('output')
   container.innerHTML = template(outputData)
   const overlay = document.getElementById('overlay') 
   fadeOutEffect()
   overlay.remove()

}

const populate = async (url) => {

   const response = await fetch(url)
   const results = await response.json()
   process(results)

}

populate(dataSource)