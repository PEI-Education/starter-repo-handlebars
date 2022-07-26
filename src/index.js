import './styles.css';

var template = require("./js/studentinfo.hbs");

async function populate() {

  const requestURL = './assets/data.json?dothisfor=' + reportconfig.dothisfor;
  const request = new Request(requestURL);

  const response = await fetch(request);
  const data = await response.json();

  let container = document.getElementById("output");
  container.innerHTML = template(data);
}
 
populate();