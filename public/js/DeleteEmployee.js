async function DeleteEmployee(button){
    const role = button.getAttribute('data-role');
    const employeeid = button.getAttribute('data-employeeid');
    console.log(role, employeeid);
    
    const result = await fetch(`/api/${role}/${employeeid}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
            // Response.
            const data = await result.json();
            alert(data.message);
            if(result.ok) {
            window.location.reload();
            }
}