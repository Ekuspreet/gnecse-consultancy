async function SignUp(form,event) {
    event.preventDefault();
    const role = form.id;
    const formData = Object.fromEntries(new FormData(form).entries());
    const result = await fetch(`/api/signup/${role}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data = await result.json();
    alert(data.message);
}