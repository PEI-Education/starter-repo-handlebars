/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
import './styles/psb_elem_styles.css';
import './styles/spinner.css';

const template = require('./js/psb_elem.hbs')

const dataSource = `./assets/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}&coteachers=${reportconfig.coteachers}`

// Test data at `./assets/elem-fake-students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),

function fadeOutEffect() {
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

function process(students) {
  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.storecode.substr(1))

  students.forEach(student => {
    student.courses.pop()
    student.courses.forEach(course => {
      if (highestTerm <= 1) {
        delete course.e2
      }
      if (highestTerm <= 2) {
        delete course.e3
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
    if (!student.ela.teacher) {
      delete student.ela
    }
    if (!student.mat.teacher) {
      delete student.mat
    }
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