
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar ul');
const navbarLinks = document.querySelectorAll('.navbar a');
navbarToggler.addEventListener('click', navbarTogglerClick);
function navbarTogglerClick() {
  navbarToggler.classList.toggle('open-navbar-toggler');
  navbarMenu.classList.toggle('open');
}
navbarLinks.forEach(elem => elem.addEventListener('click', navbarLinkClick));
function navbarLinkClick() {
  if (navbarMenu.classList.contains('open')) {
    navbarToggler.click();
  }
}

function sehirlerigetir() {


  var hhtpistegi = new XMLHttpRequest();
  var adres = "https://raw.githubusercontent.com/enisbt/turkey-cities/master/cities.json";


  hhtpistegi.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      var ulkeSlc = document.getElementById('sehirler');
      myArr.forEach(myArr => {
        ulkeSlc.innerHTML += '<option>' + myArr.name
      });
    }
  };
  hhtpistegi.open("GET", adres, true);
  hhtpistegi.send();


}

