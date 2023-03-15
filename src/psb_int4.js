/* eslint-disable no-nested-ternary */
import './styles/psb_int_styles.css';
import './styles/spinner.css';

const template = require('./js/psb_int4.hbs')

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

// Process deletes data that should not be included, rounds marks, and separates ELA, FLA and Math from other subjects.
const process = (students, courses) => {
  let highestTerm = parseInt(reportconfig.storecode.substr(1))
  courses.pop();
  courses.forEach((course) => {
    if (highestTerm <= 1) {
      delete course.i2grade
      delete course.r2effort
    }
    if (highestTerm <= 2) {
      delete course.i3grade
      delete course.r3effort
    }
    if (highestTerm <= 3) {
      delete course.i4grade
      delete course.r4effort
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
        if (course.course_number.substr(1, 3) === 'ENG') {
          student.ela = course
        } else if (course.course_number.substr(1, 3) === 'MAT') {
          student.mat = course
        } else if (
          course.course_number.substr(1, 4) === 'FREF' ||
          course.course_number.substr(1, 4) === 'FREG'
        ) {
          student.fla = course
        } else if (course.course_number.substr(1, 4) === 'RESA') {
          student.resa = course.comment          
        } else {
          student.courses.push(course)
        }
      }
    })
  })

const outputData = {reportconfig: reportconfig, students: students}
  const container = document.getElementById('output')
  container.innerHTML = template(outputData)
  const overlay = document.getElementById('overlay')
  fadeOutEffect();
  overlay.remove()
}

// Populate fetches the data and hands it off to process once both files are retrieved.
const populate = async () => {
  try {
    const results = await Promise.all([
      fetch(`./json/psb_int_4term.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),
      fetch(`./json/psb_int_courses.json?dothisfor=${reportconfig.dothisfor}&storecode=${reportconfig.storecode}&coteachers=${reportconfig.coteachers}`)
    ])
    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])
  } catch (err) {
    console.error(err)
  }
}

populate()
