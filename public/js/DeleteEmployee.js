async function DeleteEmployee(button) {
  const role = button.getAttribute("data-role");
  const uuid = button.getAttribute("data-uuid");
  console.log(role, uuid);
  const result = await fetch(`/api/${role}/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  alert(data.message);
  if (result.ok) {
    window.location.reload();
  }
}
