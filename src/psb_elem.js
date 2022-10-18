/* eslint-disable no-nested-ternary */
import './styles/psb_elem_styles.css';
import './styles/spinner.css';

// eslint-disable-next-line no-undef
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

const process = (students, courses, standards) => {
  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.storecode.substr(1))
  courses.pop();
  standards.pop();
  courses.forEach((course) => {
    if (highestTerm == 1) {
      delete course.e2
    }
    if (highestTerm <= 2) {
      delete course.e3
    }
    if (course.comment) {
      course.comment = course.comment.substr(0,1048)    
    }
    if (course.eal==="0") {
      delete course.eal
    }
    if (course.iep==="0") {
      delete course.iep
    }
    if (course.adaptation==="0") {
      delete course.adaptation
    }
    students.forEach((student) => {
      if (student.id === course.id) {
        if (course.course_number.substr(1, 3) === 'LAN') {
          student.ela = course
        } else if (course.course_number.substr(1, 3) === 'MAT') {
          student.mat = course
        } else if (course.course_number.substr(1, 4) === 'FREF') {
          student.fla = course     
        } else if (course.course_number === 'HRAM' || course.course_number === 'HRAMF') {
          student.hr = course 
        } else if (course.course_number === 'HRPM') {
          student.hrpm = course
        } else { 
          student.courses.push(course)
        }
      }    
    })
  })

  standards.forEach((standard) => {
    if (highestTerm == 1) {
      delete standard.e2
    }
    if (highestTerm <= 2) {
      delete standard.e3
    }
    students.forEach((student) => {
      if (student.id === standard.id) {
        student[standard.subject] = standard
      }
    })
  })

  console.log(students)
  // eslint-disable-next-line no-undef
  const outputData = {reportconfig: reportconfig, students: students}
  const container = document.getElementById('output')
  container.innerHTML = template(outputData)
  const overlay = document.getElementById('overlay')
  fadeOutEffect();
  overlay.remove()
}

const populate = async () => {
  try {
    const results = await Promise.all([
      // eslint-disable-next-line no-undef
      fetch(`./assets/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),
      //fetch(`./assets/students_fake.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),
      // eslint-disable-next-line no-undef
      fetch(`./assets/psb_elem_courses.json?dothisfor=${reportconfig.dothisfor}&storecode=${reportconfig.storecode}&yearid=${reportconfig.yearid}`),
      //fetch(`./assets/courses_fake.json?dothisfor=${reportconfig.dothisfor}&storecode=${reportconfig.storecode}`),
      fetch(`./assets/psb_elem_standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`),
    ])
    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1], finalData[2])
  } catch (err) {
    alert("Could not retrieve student data. Please close this tab and try running report cards again.")
  }
}

populate()
