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

const clearTag = course => {
  ["adaptation","iep","eal"].forEach(tag => {
    if (tag in course) {
      if (course[tag] == "0" || course[tag] == "") {
        delete course[tag]
      }
    }  
  })
}

const formatComments = (student) => {   

  Object.keys(student).forEach(key => {
    if (key === "comment") {
      student[key] = student[key].substring(0,1048)
    }

    if (typeof student[key] === 'object' && student[key] !== null) {
      formatComments(student[key])
    }
  })
}
 
function process(students, standards) {

  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.storecode.substr(1))
  
  standards.forEach(standard => {
    standard
  })

  students.forEach(student => {
    student.courses.pop()
    student.courses.forEach(course => {
      if (highestTerm <= 1) {
        delete course.r2
      }
      if (highestTerm <= 2) {
        delete course.r3
      }
      clearTag(course)
    })
    
    clearTag(student.ela)
    clearTag(student.fla)
    clearTag(student.mat)

    formatComments(student)

    if (!student.fla.teacher) {
      delete student.fla
    }


  })
  
  console.log(students, standards)
  const outputData = { reportconfig: reportconfig, students: students }
  const container = document.getElementById('output')
  container.innerHTML = template(outputData)
  const overlay = document.getElementById('overlay') 
  fadeOutEffect()
  overlay.remove()
}

const populate = async () => {

    const results = await Promise.all([ 
      //fetch(`./assets/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yeardid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),
      fetch(`./assets/elem-fake-students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yeardid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),

      //fetch(`./assets/psb_elem_standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`),
      fetch(`./assets/elem-fake-standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`)

    ])

    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])

}

populate()
