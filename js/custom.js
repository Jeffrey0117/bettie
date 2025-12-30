document.addEventListener('DOMContentLoaded', function () {

  // Scroll to top button
  const scrollBtn = document.querySelector('.scrolltotop');

  scrollBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      scrollBtn.style.display = 'block';
      scrollBtn.style.opacity = '1';
    } else {
      scrollBtn.style.opacity = '0';
      setTimeout(() => {
        scrollBtn.style.display = 'none';
      }, 300);
    }
  });
  
 //=======Sidebar-start
    const menuBtn = document.querySelector('.menu-btn');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const closeBtns = document.querySelectorAll('.close-icon');
    const overlay = document.querySelector('.overlay');

    menuBtn.addEventListener('click', function () {
      sidebarMenu.classList.add('active');
      overlay.classList.add('active');
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        sidebarMenu.classList.remove('active');
        overlay.classList.remove('active');
      });
    });

    overlay.addEventListener('click', function () {
      sidebarMenu.classList.remove('active');
      overlay.classList.remove('active');
    });


//=======Submenu-start
  const subBtns = document.querySelectorAll('.sub-btn');
  subBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const subMenu = btn.nextElementSibling;
      const icon = btn.querySelector('.dropdown');

      if (subMenu.style.maxHeight) {
        subMenu.style.maxHeight = null;
      } else {
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      }

      icon.classList.toggle('rotate');
    });
  });





// main
});