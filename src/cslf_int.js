/* eslint-disable no-nested-ternary */
import './styles/cslf_int_styles.css';
import './styles/spinner.css';

const template = require('./js/cslf_int.hbs')

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

const process = (students, courses) => {
  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.terms.substr(1))
  courses.pop();
  courses.forEach((course) => {
    if (highestTerm <= 1) {
      delete course.i2grade
    }
    if (highestTerm <= 2) {
      delete course.i3grade
    }
    if (highestTerm <= 3) {
      delete course.i4grade
    }
    if (course.i1grade) {
      course.i1grade = course.i1grade == '' ? course.i1grade : isNaN(course.i1grade) ? course.i1grade : Math.round(parseFloat(course.i1grade))
    } 
    if (course.i2grade) {
      course.i2grade = course.i2grade == '' ? course.i2grade : isNaN(course.i2grade) ? course.i2grade : Math.round(parseFloat(course.i2grade))
    }
    if (course.i3grade) {
      course.i3grade = course.i3grade == '' ? course.i3grade : isNaN(course.i3grade) ? course.i3grade : Math.round(parseFloat(course.i3grade))
    }
    if (course.i4grade) {
      course.i4grade = course.i4grade == '' ? course.i4grade : isNaN(course.i4grade) ? course.i4grade : Math.round(parseFloat(course.i4grade))
    }
    if (course.comment) {
      course.comment = course.comment.substr(0,500)    
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
          student.courses.push(course)
        }
      }
    )
  })

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
      fetch(`./assets/cslf_int_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}`),
      fetch(`./assets/cslf_int_courses.json?dothisfor=${reportconfig.dothisfor}&storecode=${reportconfig.terms}`),
    ])
    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

populate()
