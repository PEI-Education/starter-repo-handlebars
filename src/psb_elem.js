/* eslint-disable no-nested-ternary */
import './styles/psb_elem_styles.css';
import './styles/spinner.css';

const template = require('./js/psb_elem.hbs')

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

function formatComments(student) {   

  Object.keys(student).forEach(key => {
    if (key === "comment") {
      student[key] = student[key].substring(0,1048)
    }

    if (typeof student[key] === 'object' && student[key] !== null) {
      formatComments(student[key])
    }
  })
}
 

function process(students) {

  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.storecode.substr(1))

  students.forEach((student) => {
    student.courses = student.courses.filter(course => {
      if (Object.keys(course).length !== 0) {
        return true
      }  
                                                                                                                                           
      return false
    })

    formatComments(student)

    if (!student.fla.teacher) {
      delete student.fla
    }
  })
  
  console.log(students)
  const outputData = { reportconfig: reportconfig, students: students }
  const container = document.getElementById('output')
  container.innerHTML = template(outputData)
  const overlay = document.getElementById('overlay') 
  fadeOutEffect()
  overlay.remove()
}

const populate = async () => {
  try {
    const results = await Promise.all([ 
      //fetch(`./assets/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),
      fetch(`./assets/students_fake.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),

      //fetch(`./assets/psb_elem_standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`),
      fetch(`./assets/psb_elem_standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`),

    ])

    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])
  } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
  }
}


populate()
