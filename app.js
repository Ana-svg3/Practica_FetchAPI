function mostrarContactos() { // 1. Usa fetch() para hacer GET a la URL del API
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json()) // 2. Convierte la respuesta a JSON con .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos"); //- Obtén el tbody: document.getElementById("tablaContactos")
            tbody.innerHTML = "";     //    - Limpia su contenido: tbody.innerHTML = ""

            data.data.forEach((contacto) => { //    - Recorre data.data con forEach
                const tr = document.createElement("tr");

                tr.innerHTML = ` //    - Crea un <tr> para cada contacto y agrégalo al tbody
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    </td>
                `;

                tr.querySelector(".delete-btn").addEventListener("click", () => {
                    eliminarContacto(contacto.id);
                });

                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Error al obtener contactos:", error);
        });
}
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;

    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombre,
            telefono: telefono
        })
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        form.reset();
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al crear contacto:", error);
    });
});

function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al eliminar contacto:", error);
    });
}


// ----------------------
// INICIO
// ----------------------
mostrarContactos();