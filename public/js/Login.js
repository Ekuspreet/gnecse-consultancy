async function Login(form,event) {
    event.preventDefault();
    const role = form.id;
    const formData = Object.fromEntries(new FormData(form).entries());
    const result = await fetch(`/api/login/${role}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data = await result.json();
    if(!result.ok) {
        return alert(data.message);
    }
    alert(data.message);
    window.location.href = `/${role}/profile`;
}