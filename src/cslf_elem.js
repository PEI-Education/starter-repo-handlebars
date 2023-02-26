import './styles/cslf_elem.css';
import './styles/spinner.css';

const template = require('./js/cslf_elem.hbs')

const dataSource = `./assets/cslf_elem.json?dothisfor=${reportconfig.dothisfor}&coteachers=${reportconfig.coteachers}&terms=${reportconfig.terms}&yearid=${reportconfig.yearid}`

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