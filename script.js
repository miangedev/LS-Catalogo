const libros = [
    {
        id: 1,
        titulo: "La Odisea",
        imagen: "Libros/La Odisea.jpeg",
        descripcionCorta: "El regreso épico de Odiseo",
        descripcionLarga: "'SEGUNDA MANO' La Odisea narra el largo y peligroso viaje de Odiseo (Ulises) de regreso a su hogar en Ítaca tras la Guerra de Troya, enfrentando criaturas míticas, dioses furiosos y tentaciones, mientras su esposa Penélope lo espera fielmente.",
        categoria: "Poesía Épica",
        precios: [
            { editorial: "Editorial Atenea", precio: 10000 },
        ],
        enlaceCompra: "https://wa.me/p/8462216173839048/573171769098"
    },
    {
        id: 2,
        titulo: "Los Miserables",
        imagen: "Libros/Los Miserables.jpeg",
        descripcionCorta: "Un hombre busca redención en un mundo cruel.",
        descripcionLarga: "'SEGUNDA MANO' Jean Valjean, exconvicto, lucha por una nueva vida mientras enfrenta la injusticia y busca proteger a Cosette.",
        categoria: "Novela",
        precios: [
            { editorial: "Editoriales Universales", precio: 10000 },
        ],
        enlaceCompra: "https://wa.me/message/BHYIJR6PB3S6O1"
    },
    {
        id: 3,
        titulo: "Mercader de Venecia",
        imagen: "Libros/Mercader de Venecia.jpeg",
        descripcionCorta: "Amor, amistad y un pacto peligroso.",
        descripcionLarga: "'SEGUNDA MANO' En Venecia, un préstamo con una terrible condición pone a prueba la amistad y el amor.",
        categoria: "Comedia",
        precios: [
            { editorial: "Editoriales Universales", precio: 10000 },
        ],
        enlaceCompra: "https://wa.me/message/BHYIJR6PB3S6O1"
    },
    {
        id: 4,
        titulo: "El Avaro",
        imagen: "Libros/El Avaro.jpeg",
        descripcionCorta: "La obsesión por el dinero y sus consecuencias.",
        descripcionLarga: "'SEGUNDA MANO' Un padre avaro y sus hijos luchan por el amor y la libertad en una comedia llena de enredos.",
        categoria: "Comedia",
        precios: [
            { editorial: "Editoriales Universales", precio: 10000 },
        ],
        enlaceCompra: "https://wa.me/message/BHYIJR6PB3S6O1"
    },
    {
        id: 5,
        titulo: "Confesiones",
        imagen: "Libros/Confesiones.jpeg",
        descripcionCorta: "Un alma desnuda ante el mundo.",
        descripcionLarga: "'SEGUNDA MANO' Jean-Jacques Rousseau relata su vida con honestidad brutal, revelando sus flaquezas y pasiones.",
        categoria: "Filosofía",
        precios: [
            { editorial: "Editorial Espasa", precio: 10000 },
        ],
        enlaceCompra: "https://wa.me/message/BHYIJR6PB3S6O1"
    },
    // Añade más libros aquí
];

function crearTarjetaLibro(libro) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'libro-card';
    tarjeta.innerHTML = `
        <img src="${libro.imagen}" alt="${libro.titulo}" class="libro-imagen">
        <div class="libro-contenido">
            <h3 class="libro-titulo">${libro.titulo}</h3>
            <p class="libro-categoria">${libro.categoria}</p>
            <p class="libro-descripcion">${libro.descripcionCorta}</p>
            <button class="libro-boton" data-id="${libro.id}">Más información...</button>
        </div>
    `;
    return tarjeta;
}

function mostrarLibros(librosAMostrar) {
    const galeriaLibros = document.getElementById('galeriaLibros');
    galeriaLibros.innerHTML = '';
    librosAMostrar.forEach(libro => {
        const tarjeta = crearTarjetaLibro(libro);
        galeriaLibros.appendChild(tarjeta);
    });
}

function mostrarModal(libro) {
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalImagen = document.getElementById('modalImagen');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalCategoria = document.getElementById('modalCategoria');
    const modalPrecios = document.getElementById('modalPrecios');
    const comprarAhoraBtn = document.getElementById('comprarAhoraBtn');

    modalTitulo.textContent = libro.titulo;
    modalImagen.src = libro.imagen;
    modalImagen.alt = libro.titulo;
    modalDescripcion.textContent = libro.descripcionLarga;
    modalCategoria.textContent = `Categoría: ${libro.categoria}`;

    modalPrecios.innerHTML = '';
    libro.precios.forEach(precio => {
        const precioElement = document.createElement('p');
        precioElement.className = 'precio-editorial';
        precioElement.innerHTML = `<strong>${precio.editorial}:</strong> Precio: $${precio.precio.toFixed(2)}`;
        modalPrecios.appendChild(precioElement);
    });

    comprarAhoraBtn.href = libro.enlaceCompra;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function filtrarLibros() {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('filtroCategoria').value;

    const librosFiltrados = libros.filter(libro => {
        const coincideNombre = libro.titulo.toLowerCase().includes(busqueda);
        const coincideCategoria = categoriaSeleccionada === '' || libro.categoria === categoriaSeleccionada;
        return coincideNombre && coincideCategoria;
    });

    mostrarLibros(librosFiltrados);
}

function inicializarFiltroCategoria() {
    const filtroCategoria = document.getElementById('filtroCategoria');
    const categorias = [...new Set(libros.map(libro => libro.categoria))];

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarLibros(libros);
    inicializarFiltroCategoria();

    document.getElementById('buscador').addEventListener('input', filtrarLibros);
    document.getElementById('filtroCategoria').addEventListener('change', filtrarLibros);

    document.getElementById('galeriaLibros').addEventListener('click', (e) => {
        if (e.target.classList.contains('libro-boton')) {
            const libroId = parseInt(e.target.dataset.id);
            const libroSeleccionado = libros.find(libro => libro.id === libroId);
            mostrarModal(libroSeleccionado);
        }
    });

    document.getElementById('cerrarModal').addEventListener('click', cerrarModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal')) {
            cerrarModal();
        }
    });

    document.getElementById('volverBtn').addEventListener('click', () => {
        window.history.back();
    });
});