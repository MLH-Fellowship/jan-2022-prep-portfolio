let logo = document.getElementsByClassName('nav-logo');
let nc1 = document.getElementById('nc2');
let nc2 = document.getElementById('nc2');

nc2.style.display = 'none';
let lastScrollTop = 0;

document.addEventListener("scroll", function () {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {

    nc.classList.add("nav-container");
    nc1.classList.add("nav-column");
    logo[0].style.justifyContent = 'left';
    nc2.style.display = 'block';


  } else if (st == 0) {
    nc.classList.remove("nav-container");
    logo[0].style.justifyContent = 'center';
    nc2.style.display = 'none';
  }

  lastScrollTop = st <= 0 ? 0 : st; 
}, false);


