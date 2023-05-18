    /* eslint-disable no-prototype-builtins */
    /* eslint-disable no-nested-ternary */
    import './styles/psb_elem_styles.css';
  import './styles/spinner.css';

    const template = require('./js/psb_elem.hbs')

    const dataSource = `./json/psb_elem_students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}&coteachers=${reportconfig.coteachers}`

    // Test data at `./json/elem-fake-students.json?dothisfor=${reportconfig.dothisfor}&attcutoff=${reportconfig.attcutoff}&yearid=${reportconfig.yearid}&storecode=${reportconfig.storecode}`),

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

    /*
    const clearGrade = (course, term) => {
      Object.keys(course).forEach(key => {
        console.log(course);
        key[term] = '';
      });
    }
    */
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
        
        clearTag(student.ela);
        clearTag(student.fla);
        clearTag(student.mat);

        formatComments(student);

        if (!student.fla.teacher) {
          delete student.fla
        }
        if (!student.ela.teacher) {
          delete student.ela
        }
        if (!student.mat.teacher) {
          delete student.mat
        }
        
        /* clearGrade not working yet, using old code instead
        console.log('highest term ' + highestTerm);
        if (highestTerm <= 1) {
          console.log("clearing e2")
          clearGrade(student.ela, "e2");
          clearGrade(student.fla, "e2");
          clearGrade(student.mat, "e2");
        }
        if (highestTerm <= 2) {
          console.log("clearing e3")
          clearGrade(student.ela, "e3");
          clearGrade(student.fla, "e3");
          clearGrade(student.mat, "e3");
        }
        */
        if (highestTerm <= 1) {
          if (student.ela) {
            if (student.ela.readview) delete student.ela.readview.e2;
            if (student.ela.speaklisten) delete student.ela.speaklisten.e2;
            if (student.ela.writerep) delete student.ela.writerep.e2;
            console.log(student.ela);
          }
          if (student.fla) {
            if (student.fla.readview) delete student.fla.readview.e2;
            if (student.fla.speaklisten) delete student.fla.speaklisten.e2;
            if (student.fla.speaklisten) delete student.fla.writerep.e2;
            console.log(student.fla)
          }
          if (student.mat) {
            if (student.mat.numbersense) delete student.mat.numbersense.e2;
            if (student.mat.patternsrel) delete student.mat.patternsrel.e2;
            if (student.mat.shapespace) delete student.mat.shapespace.e2;
            if (student.mat.statprob)delete student.mat.statprob.e2;
            console.log(student.mat)
          }
        }

        if (highestTerm <= 2) {
          if (student.ela) {
            if (student.ela.readview) delete student.ela.readview.e3;
            if (student.ela.speaklisten) delete student.ela.speaklisten.e3;
            if (student.ela.writerep) delete student.ela.writerep.e3;
            console.log(student.ela)
          }
          if (student.fla) {
            if (student.fla.readview) delete student.fla.readview.e3;
            if (student.fla.speaklisten) delete student.fla.speaklisten.e3;
            if (student.fla.writerep) delete student.fla.writerep.e3;
            console.log(student.fla)
          }
          if (student.mat) {
            if (student.mat.numbersense) delete student.mat.numbersense.e3;
            if (student.mat.patternsrel) delete student.mat.patternsrel.e3;
            if (student.mat.shapespace) delete student.mat.shapespace.e3;
            if (student.mat.statprob) delete student.mat.statprob.e3;          
            console.log(student.mat)
          }
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