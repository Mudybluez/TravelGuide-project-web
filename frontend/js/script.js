document.addEventListener("DOMContentLoaded", async function () {
  const nav = document.querySelector('.nav');
  if (!nav) return; // Если навбар не найден, выходим

  const profileButton = document.createElement('li');
  profileButton.innerHTML = '<a href="profile.html" class="nav-link px-2 link-light" id="profile-btn" style="display: none;">Profile</a>';
  nav.appendChild(profileButton);

  try {
      const response = await fetch('/api/user/profile', { credentials: 'include' });
      if (response.ok) {
          document.getElementById('profile-btn').style.display = 'block';
      }
  } catch (error) {
      console.error('Ошибка при получении данных профиля:', error);
  }
});

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

