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
 
function assignStandards(rawStandards, highestTerm) {
  rawStandards.pop()
  let grid = {}
  rawStandards.forEach(standard => {
      let sid = standard.id
      if (sid in grid === false) {
        grid[sid] = {}
      }
      
      let subject = standard.subject
      if (subject in grid[sid] === false) {
        grid[sid][subject] = {}
      }

      let identifier = standard.identifier
      if (identifier in grid[sid][subject] === false) {
        grid[sid][subject][identifier] =  {}
      }
      let storecode = standard.storecode
      if (parseInt(standard.storecode.substring(1)) <= highestTerm) {
        grid[sid][subject][identifier][storecode] = standard.grade
      }
  })  
  return grid
} 

function process(students, standards) {
  // eslint-disable-next-line no-undef
  let highestTerm = parseInt(reportconfig.storecode.substr(1))

  const standardsGrid = assignStandards(standards, highestTerm)

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

    let stuStand = standardsGrid[student.id]
    if (stuStand.lan) {
      if (stuStand.lan.readview) { student.ela.readview = stuStand.lan.readview }
      if (stuStand.lan.speaklisten) { student.ela.speaklisten = stuStand.lan.speaklisten }
      if (stuStand.lan.writerep) { student.ela.writerep = stuStand.lan.writerep }
    }

    if (student.fla && stuStand.fre) {
      if (stuStand.fre.readview) { student.fla.readview = stuStand.fre.readview }
      if (stuStand.fre.speaklisten) { student.fla.speaklisten = stuStand.fre.speaklisten }
      if (stuStand.fre.writerep) { student.fla.writerep = stuStand.fre.writerep }
    }
    
    if (stuStand.mat) {
      if (stuStand.mat.numbersense) { student.mat.numbersense = stuStand.mat.numbersense }
      if (stuStand.mat.patternsrel) { student.mat.patternsrel = stuStand.mat.patternsrel }
      if (stuStand.mat.shapespace) { student.mat.shapespace = stuStand.mat.shapespace }
      if (stuStand.mat.statprob) { student.mat.statprob = stuStand.mat.statprob }
    }

    if (stuStand.hr) {
      if (stuStand.hr.organization) { student.hr.organization = stuStand.hr.organization }
      if (stuStand.hr.collaboration) { student.hr.collaboration = stuStand.hr.collaboration }
      if (stuStand.hr.independence) { student.hr.independence = stuStand.hr.independence }
      if (stuStand.hr.responsibility) { student.hr.responsibility = stuStand.hr.responsibility }
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

    const results = await Promise.all([ 
      fetch(`./assets/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),
      //fetch(`./assets/elem-fake-students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),
      
      fetch(`./assets/psb_elem_standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`),
      //fetch(`./assets/elem-fake-standards.json?dothisfor=${reportconfig.dothisfor}&yearid=${reportconfig.yearid}`)

    ])

    const finalData = await Promise.all(results.map((result) => result.json()))

    process(finalData[0], finalData[1])

}

populate()