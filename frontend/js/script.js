window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

signUpBtnLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent page reload
  wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent page reload
  wrapper.classList.toggle('active');
});
