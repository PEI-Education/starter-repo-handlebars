import './styles.css'

const template = require('./js/studentinfo.hbs')

const process = (students, courses) => {
  let highestTerm = reportconfig.terms.substr(-2,1);
  console.log(highestTerm);
  courses.pop();
  courses.forEach((course) => {
    if (highestTerm <= "1") {
      delete course.i2grade
      delete course.r2effort
    }
    if (highestTerm <= "2") {
      delete course.i3grade
      delete course.r3effort
    }
    if (highestTerm <= "3") {
      delete course.i4grade
      delete course.r4effort
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
  console.log(outputData)
  const container = document.getElementById('output')
  container.innerHTML = template(outputData)
}

const populate = async () => {
  try {
    const results = await Promise.all([
      fetch('./assets/students.json?dothisfor=' + reportconfig.dothisfor + '&attcutoff=' + reportconfig.attcutoff),
      fetch('./assets/courses.json?dothisfor=' + reportconfig.dothisfor + '&storecode=' + reportconfig.storecode),
    ])
    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])
  } catch (err) {
    console.error(err)
  }
}

populate()
