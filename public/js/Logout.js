const logout = document.getElementById('logout');
logout.addEventListener('click', function() {
    const validation = confirm('Are you sure you want to logout?');
    if (!validation) return;
    const role = logout.getAttribute('data-role');
    window.location.href = `/${role}/logout`;
});