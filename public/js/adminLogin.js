const form = document.getElementById('admin-login');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const result = await fetch('/api/login/admin',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if(result.ok) {
        // If response is ok.

    } else {
        // If response is not ok.
        const data = await result.json();
        alert(data.message);
    }
});