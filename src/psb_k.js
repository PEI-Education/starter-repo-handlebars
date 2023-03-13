import './styles/psb_k.css';
import './styles/spinner.css';

const template = require('./js/psb_k.hbs');

const dataSource = `./json/psb_k.json?dothisfor=${reportconfig.dothisfor}&coteachers=${reportconfig.coteachers}&terms=${reportconfig.terms}&yearid=${reportconfig.yearid}&attcutoff=${reportconfig.attcutoff}`;

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
   for (const student of students) {
      console.log(student);
      if (reportconfig.terms.indexOf("3") === -1) {
         delete student.r3comment;
      }
      if (reportconfig.terms.indexOf("2") === -1) {
         delete student.r2comment;
      }
      console.log(student);
   }
   const outputData = { reportconfig: reportconfig, students: students };
   const container = document.getElementById('output');
   container.innerHTML = template(outputData);
   const overlay = document.getElementById('overlay'); 
   fadeOutEffect();
   overlay.remove();

}

const populate = async (url) => {

   const response = await fetch(url);
   const results = await response.json();
   process(results);

}

populate(dataSource);