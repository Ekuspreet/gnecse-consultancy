async function AddEmployee (form, event){
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const role = form.getAttribute('data-role');
    const result = await fetch(`/api/${role}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
        // Response.
        const data = await result.json();
        alert(data.message);
        if(result.ok) {
        window.location.reload();
        }
    }
