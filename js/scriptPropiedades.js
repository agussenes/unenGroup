
const propiedades = [
    {
        id: 1,
        tipo: "alquiler",
        titulo: "Casa en Alquiler La Deseada",
        precio: "$2300 Alquiler mensual",
        localidad: "La Deseada",
        metrosCuadrados: 120,
        habitaciones: 3,
        banos: 2,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/subidaCochera.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/frente.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/galeria.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/estar.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/cocina.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/pieza1.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/pieza2.jpg",
            "./images/propiedades/viviendas/casa-La-Deseada-Alquiler/patio.jpg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 3 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 2 Baños completos</li>
            <li><i class="fas fa-toilet"></i> 1 Toilette</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-utensils"></i> Cocina integrada</li>
            <li><i class="fas fa-car"></i> Cochera para 2 autos</li>
            <li><i class="fas fa-fire"></i> Asador</li>
            <li><i class="fas fa-umbrella-beach"></i> Galería</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
        </ul>`
    },
    {
        id: 2,
        tipo: "alquiler",
        titulo: "Semi Piso en Alquiler Marcelo T. de Alvear al 100",
        precio: "$800.000 + $260.000 expensas",
        localidad: "Córdoba",
        metrosCuadrados: 173,
        habitaciones: 3,
        banos: 3,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/frente.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/estar.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/estar2.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/bano.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/bano2.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/habitacion.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/habitacion2.jpg",
            "./images/propiedades/viviendas/alquiler-Semi pisoMarcelo-T-de-alvear-al-100/interior.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-building"></i> Departamento en alquiler</li>
            <li><i class="fas fa-expand"></i> 173 m² cubiertos</li>
            <li><i class="fas fa-bed"></i> 3 dormitorios</li>
            <li><i class="fas fa-bath"></i> 3 baños</li>
            <li><i class="fas fa-car"></i> Cochera</li>
            <li><i class="fas fa-clock"></i> 40 años de antigüedad</li>
            <li><i class="fas fa-th-large"></i> 4 ambientes</li>
            <li><i class="fas fa-map-marker-alt"></i> Ubicación interna</li>
        </ul>`
    },
    {
        id: 3,
        tipo: "alquiler-temporario",
        titulo: "Alquiler Casa La Carolina Temporario",
        precio: "U$D 2000 por quincena / U$D 3500 mensual",
        localidad: "La Carolina",
        metrosCuadrados: 220,
        habitaciones: 3,
        banos: 2,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/frente.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/escritorioVista.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/galeriaAsador.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/habitaciojnVentana.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/habitacion3CamaDoble.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/habitacionCamaDoble.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/livingComedor.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/livinHogar.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/masPatio.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/patio.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/patioPileta.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-La-Carolina/sillonVistaPatio.jpg",

        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 220 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie del terreno: 1000 m²</li>
            <li><i class="fas fa-bed"></i> 3 dormitorios</li>
            <li><i class="fas fa-bath"></i> 2 baños completos</li>
            <li><i class="fas fa-couch"></i> Living / Comedor / Cocina integrada</li>
            <li><i class="fas fa-sun"></i> Terraza</li>
            <li><i class="fas fa-glass-whiskey"></i> Galería con cerramientos de vidrio</li>
            <li><i class="fas fa-car"></i> Cochera</li>
            <li><i class="fas fa-fire"></i> Asador</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
            <li><i class="fas fa-shield-alt"></i> Guardia 24 hs, cámaras y alarma</li>
        </ul>`
    },
    {
        id: 4,
        tipo: "alquiler-temporario",
        titulo: "Alquiler Casa Villa Warcalde Temporario",
        precio: "Consultar disponibilidad y precio",
        localidad: "Villa Warcalde",
        metrosCuadrados: 250,
        habitaciones: 2,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/frente.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/mesa.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/cocina.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/bano.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/patioPileta.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/patioo.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/quincho-galeriaAsador.jpg",
            "./images/propiedades/viviendas/alquilerTemporario-Casa-Villa-Warcald/sillones.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 250 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie del terreno: 3000 m²</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-utensils"></i> Cocina integrada con desayunador</li>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 4 Baños</li>
            <li><i class="fas fa-fire"></i> Quincho amplio para 12 personas con asador</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
        </ul>`
    },
    {
        id: 5,
        tipo: "terreno",
        titulo: "Lote en Venta Alta Córdoba - Apto Desarrollo",
        precio: "USD 225.000",
        localidad: "Córdoba",
        metrosCuadrados: 288,
        habitaciones: 0,
        banos: 0,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/terrenos/terreno-Lote-en-venta-Alta-Cordoba-apto-Desarrollo/frente.jpg",
            "./images/propiedades/terrenos/terreno-Lote-en-venta-Alta-Cordoba-apto-Desarrollo/frenteCerca.jpg",
            "./images/propiedades/terrenos/terreno-Lote-en-venta-Alta-Cordoba-apto-Desarrollo/vistaLocationPointMap.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-map-marker-alt"></i> Dirección: Isabel la Católica 1448, esquina Avellaneda</li>
            <li><i class="fas fa-expand"></i> Superficie total: 288 m²</li>
            <li><i class="fas fa-ruler-horizontal"></i> Frente: 8 mts</li>
            <li><i class="fas fa-ruler-vertical"></i> Fondo: 9,35 mts</li>
            <li><i class="fas fa-building"></i> Apto desarrollo</li>
        </ul>`
    },
    {
        id: 6,
        tipo: "venta",
        titulo: "Casa Paso de los Andes",
        precio: "USD 155.000 con escritura",
        localidad: "Paso de los Andes",
        metrosCuadrados: 232,
        habitaciones: 4,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/frente.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/dentroPatioFrente.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/living.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/comedor.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/cocina.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/bano.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/banio2.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/camaHabitacion.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/escaoleras.jpg",
            "./images/propiedades/viviendas/venta-Casa-Paso-de-los-Andes/piesaCamaIndividiales.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 232 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie de terreno: 196 m²</li>
            <li><i class="fas fa-bed"></i> 4 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 4 Baños (1 toilette)</li>
            <li><i class="fas fa-car"></i> Cochera cubierta pasante para 2 autos con doble portón automático</li>
            <li><i class="fas fa-utensils"></i> Cocina separada</li>
            <li><i class="fas fa-chair"></i> Comedor independiente</li>
            <li><i class="fas fa-couch"></i> Living</li>
            <li><i class="fas fa-water"></i> Lavadero y pieza de servicio</li>
            <li><i class="fas fa-fire"></i> Patio con asador</li>
            <li><i class="fas fa-play"></i> Espacio tipo playroom con salida directa al patio y a la calle</li>
        </ul>`
    },
    {
        id: 7,
        tipo: "venta",
        titulo: "Casa en Venta Potrerillo de Larreta",
        precio: "USD 450.000",
        localidad: "Potrerillo de Larreta",
        metrosCuadrados: 420,
        habitaciones: 4,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/frente.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/frenteDelejos.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/ghaleriaAsador.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/pileta.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/cocinaComedor.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/escaleras.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/habitacion.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/habitacionConBestidor.jpg",
            "./images/propiedades/viviendas/venta-Casa-venta-Potrerillo-de-Larreta/bestidor.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 420 m²</li>
            <li><i class="fas fa-ruler-combined"></i> Superficie de terreno: 1800 m²</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-bed"></i> 4 Dormitorios (1 en suite)</li>
            <li><i class="fas fa-bath"></i> 4 Baños</li>
            <li><i class="fas fa-user-tie"></i> Dependencia de servicio</li>
            <li><i class="fas fa-car"></i> Cochera para 2 autos</li>
            <li><i class="fas fa-umbrella-beach"></i> Galería</li>
            <li><i class="fas fa-swimming-pool"></i> Piscina</li>
        </ul>`
    },
    {
        id: 8,
        tipo: "local-oficina-cochera",
        titulo: "Cochera en Venta - Edificio San Cristóbal",
        precio: "USD 10.000",
        localidad: "Córdoba",
        metrosCuadrados: 12,
        habitaciones: 0,
        banos: 0,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/oficinas/cochera-VentaEdificioSanCristobal/cochera1920-1280.jpg",
            "./images/propiedades/oficinas/cochera-VentaEdificioSanCristobal/fotoDubsuelo.jpg",
            "./images/propiedades/oficinas/cochera-VentaEdificioSanCristobal/salidaDesdeAdentro.jpg",
            "./images/propiedades/oficinas/cochera-VentaEdificioSanCristobal/salidaCochera.jpg",
           
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-map-marker-alt"></i> Pleno Centro</li>
            <li><i class="fas fa-expand"></i> Superficie: 12 m²</li>
            <li><i class="fas fa-shield-alt"></i> Seguridad 24 hs</li>
            <li><i class="fas fa-level-down-alt"></i> Ubicación: Subsuelo</li>
        </ul>`
    },
    {
        id: 9,
        tipo: "local-oficina-cochera",
        titulo: "Departamento en Venta Nueva Córdoba - Uso Comercial",
        precio: "USD 85.000",
        localidad: "Nueva Córdoba",
        metrosCuadrados: 56.06,
        habitaciones: 2,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/frente.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/espera.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/espera2.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/livinEspera.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/bano.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentro.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtravista.jpg",
            "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtravista2.jpg",
           "./images/propiedades/oficinas/oficina-usoComercial-Depa-Nva-Cba/desdeAdentroOtravista3.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-map-marker-alt"></i> Ubicación: Buenos Aires esq. Rondeau</li>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 56.06 m²</li>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 1 Baño</li>
            <li><i class="fas fa-chair"></i> Living</li>
            <li><i class="fas fa-utensils"></i> Cocina</li>
            <li><i class="fas fa-money-bill"></i> Expensas: $78.000</li>
            <li><i class="fas fa-shield-alt"></i> Seguridad y cámaras en ingreso</li>
        </ul>`
    },
    {
        id: 10,
        tipo: "venta",
        titulo: "Departamento en Venta - Independencia a mts. Bv. San Juan",
        precio: "USD 68.000",
        localidad: "Córdoba",
        metrosCuadrados: 63,
        habitaciones: 1,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/ffrente.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/hold.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/living.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/mesaComedor.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/cocina.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/balcon.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/habitacion.jpg",
            "./images/propiedades/viviendas/venta-Departamento-Independencia-a-mts-boulevar-san-juan/banio2.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 63 m²</li>
            <li><i class="fas fa-couch"></i> Living / Comedor</li>
            <li><i class="fas fa-map-marker-alt"></i> Balcón</li>
            <li><i class="fas fa-utensils"></i> Cocina separada</li>
            <li><i class="fas fa-bed"></i> 1 Dormitorio</li>
            <li><i class="fas fa-bath"></i> 1 Baño completo</li>
        </ul>`
    },
    {
        id: 11,
        tipo: "venta",
        titulo: "Piso en Venta - Edificio Roggio, Cofico",
        precio: "USD 220.000",
        localidad: "Cofico",
        metrosCuadrados: 273,
        habitaciones: 4,
        banos: 4,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/comedoor.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/cocina.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/banio.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/banio2.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/habitacion.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/habitacion2.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/habitacion3.jpg",
            "./images/propiedades/viviendas/venta-Piso-edificio-roggio-cofico/galeria.jpg",
            
            
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-expand"></i> Superficie cubierta: 273 m²</li>
            <li><i class="fas fa-couch"></i> Living / comedor amplio con salida al balcón</li>
            <li><i class="fas fa-chair"></i> Comedor</li>
            <li><i class="fas fa-utensils"></i> Cocina con despensa</li>
            <li><i class="fas fa-laptop-house"></i> Escritorio</li>
            <li><i class="fas fa-bed"></i> 4 Dormitorios (principal en suite con vestidor)</li>
            <li><i class="fas fa-sun"></i> Terraza con cerramiento de aluminio</li>
            <li><i class="fas fa-bath"></i> 4 Baños completos</li>
            <li><i class="fas fa-car"></i> Cochera cubierta para 1 auto</li>
            <li><i class="fas fa-tree"></i> Jardín común</li>
            <li><i class="fas fa-temperature-high"></i> Calefacción central y 4 aires acondicionados</li>
        </ul>`
    },
    {
        id: 12,
        tipo: "venta",
        titulo: "Dúplex 1 en Venta - Docta Urbanización Inteligente",
        precio: "USD 98.000",
        localidad: "Docta",
        metrosCuadrados: 0,
        habitaciones: 2,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/entrada.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/living.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/livinggg.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/mesayliving.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/cocina.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/banmoio.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/habitacion.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/patioAsador.jpg",
            "./images/propiedades/viviendas/venta-Duplex-a-estrenar-Docta-Urbanizacion-Inteligente/patioInterno.jpg",
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 1 Baño completo</li>
            <li><i class="fas fa-couch"></i> Living</li>
            <li><i class="fas fa-utensils"></i> Cocina / Comedor</li>
            <li><i class="fas fa-tree"></i> Patio de iluminación</li>
            <li><i class="fas fa-fire"></i> Galería con asador</li>
            <li><i class="fas fa-car"></i> Cochera para 1 auto</li>
            <li><i class="fas fa-leaf"></i> Jardín</li>
             <li><a href="https://drive.google.com/file/d/1hNeJq77WFC_G9xfZJKOizNiZyzH-KfqW/view?usp=sharing" style="text-decoration: none;" class="fw-bold">Proyecto arquitectura PDF</a></li>
        </ul>`
    },
    {
        id: 13,
        tipo: "venta",
        titulo: "Dúplex 2 en Venta a Estrenar - Docta Urbanización Inteligente",
        precio: "USD 98.000",
        localidad: "Docta",
        metrosCuadrados: 0,
        habitaciones: 2,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/frente.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/living.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/livingComedor.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/patio.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/patioInterno.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/patiointernoo.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/cocina.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/habityacion.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/bano2.jpg",
            "./images/propiedades/viviendas/venta-Duplex-2-a-estrenar-Docta-Urbanizacion-Inteligente/interior.jpg",

        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-bed"></i> 2 Dormitorios</li>
            <li><i class="fas fa-bath"></i> 1 Baño completo</li>
            <li><i class="fas fa-couch"></i> Living</li>
            <li><i class="fas fa-utensils"></i> Cocina / Comedor</li>
            <li><i class="fas fa-tree"></i> Patio de iluminación</li>
            <li><i class="fas fa-fire"></i> Galería con asador</li>
            <li><i class="fas fa-car"></i> Cochera para 1 auto</li>
            <li><i class="fas fa-leaf"></i> Jardín</li>
            <li><a href="https://drive.google.com/file/d/1GLQX7XP7AXcBMkyTgDxvWx2stwQYGcR-/view?usp=sharing" style="text-decoration: none;" class="fw-bold">Proyecto arquitectura PDF</a></li>
        </ul>`
    },
    {
        id: 14,
        tipo: "alquiler-temporario",
        titulo: "Casa en Villa Belgrano",
        precio: 1200,
        localidad: "Villa Belgrano",
        metrosCuadrados: 100,
        habitaciones: 2,
        banos: 1,
        petFriendly: true,
        imagenes: [
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/frente.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/estar.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/cocina.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/bano.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/frentedoscamas.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/habitaciondoscamas.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/camamatrimonial.jpg",
            "./images/propiedades/viviendas/casa-Housing-Jardines-Villa-Belgrano-Alq-Temp/patio.jpg"
        ],
        descripcion: `
        <ul>
            <li><i class="fas fa-home"></i> Servicios y expensas. (90.000 arg)</li>
            <li><i class="fas fa-paint-brush"></i>Living, comedor y cocina/comedor</li>
            <li><i class="fas fa-expand-arrows-alt"></i> Lavadero y escritorio pequeÃ±o</li>
            <li><i class="fas fa-bed"></i> Dormitorio principal en suite con vestidor y baÃ±o</li>
            <li><i class="fas fa-swimming-pool"></i> Amplio jardÃ­n con piscina apta para mascotas</li>
        </ul>`
    },
];

//Dropdown list
function populateLocalitiesDropdown() {
    const localidadSelect = document.getElementById("localidad");
    localidadSelect.innerHTML = `<option value="">Todas las localidades</option>`; // Reset

    const localidadesUnicas = [...new Set(propiedades.map(prop => prop.localidad))];
    
    localidadesUnicas.forEach(localidad => {
        const option = document.createElement("option");
        option.value = localidad.toLowerCase();
        option.textContent = localidad;
        localidadSelect.appendChild(option);
    });
}

function populatePropertiesDropdown() {
    const selectPropiedad = document.getElementById("propiedadInteres");
    selectPropiedad.innerHTML = `<option value="">Selecciona una propiedad...</option>`; // Reset

    propiedades.forEach(prop => {
        const option = document.createElement("option");
        option.value = prop.titulo;
        option.textContent = prop.titulo;
        selectPropiedad.appendChild(option);
    });
}


// Función para inicializar Swiper
function initializeSwiper(id) {
    new Swiper(`#${id}`, {
        loop: true,
        pagination: {
            el: `.swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
}

// Renderizar Propiedades
function renderProperties(data) {
    const container = document.getElementById("propiedadesContainer");
    container.innerHTML = data.map((prop) => `
        <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap">
            <div class="card shadow">
                <div class="swiper-container" id="swiper-${prop.id}">
                    <div class="swiper-wrapper">
                        ${prop.imagenes
            .map((img) => `<div class="swiper-slide"><img src="${img}" class="img-fluid" alt="${prop.titulo}"></div>`)
            .join("")}
                    </div>
                    <div class="botonesSwiperDes">
                        <div id="botonNextP" class="swiper-button-next"></div>
                        <div id="botonPrevP" class="swiper-button-prev"></div>
                    </div>
                    <div class="swiper-pagination visores"></div>
                </div>
                <div class="card-body">
                    <div class="card-icons d-flex justify-content-between py-2">
                        <span><i class="fas fa-expand"></i> ${prop.metrosCuadrados} m²</span>
                        ${prop.habitaciones > 0 ? `<span><i class="fas fa-bed"></i> ${prop.habitaciones}</span>` : ""}
                        ${prop.banos > 0 ? `<span><i class="fas fa-bath"></i> ${prop.banos}</span>` : ""}
                        ${prop.petFriendly ? `<span><i class="fas fa-paw" style="color: #71C6D4;"></i> Pet-Friendly</span>` : ""}
                    </div>
                    <h5 class="card-title py-2">${prop.titulo}</h5>
                    <p class="card-text"><strong>Categoria:</strong> ${prop.tipo}</p>
                    <p class="card-text"><strong>Precio:</strong> ${prop.precio.toLocaleString()}</p>
                    <p class="card-text"><i class="fas fa-map-marker-alt"></i> Localidad: ${prop.localidad}</p>
                    <button class="btn btn-info mb-2" onclick="viewPropertyDetails(${prop.id})">Ver más</button>
                    <button class="btn btn-secondary" onclick="goToContact('${prop.titulo}')">Me interesa</button>
                </div>
            </div>
        </div>
    `).join("");

    data.forEach((prop) => initializeSwiper(`swiper-${prop.id}`));
}

// Ver detalles de la propiedad
function viewPropertyDetails(id) {
    const property = propiedades.find((prop) => prop.id === id);
    if (property) {
        const content = `
            <div class="swiper-container mb-4" id="modal-swiper-${property.id}">
                <div class="swiper-wrapper">
                    ${property.imagenes
                .map((img) => `<div class="swiper-slide"><img src="${img}" class="img-fluid" alt="${property.titulo}"></div>`)
                .join("")}
                </div>
                 <div class="botonesSwiperDes">
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                 </div>
                <div class="pagination">
                 <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="row text-center text-xl-start">
            <h3 class="text-center">${property.titulo}</h3>
                <div class="col-xl-6">
                    
                    <p><strong>Precio:</strong> $${property.precio.toLocaleString()}</p>
                    <p><strong>Categoría:</strong> ${property.tipo}</p>
                    <p><strong>Localidad:</strong> ${property.localidad}</p>
                </div>
                <div class="col-xl-6">
                    
                    <p id="descripcionDetalle">${property.descripcion}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <button class="btn btn-secondary" onclick="goToContact('${property.titulo}')" data-bs-dismiss="modal">Me interesa</button>
            </div>
        `;
        document.getElementById("propertyDetailsContent").innerHTML = content;
        initializeSwiper(`modal-swiper-${property.id}`);
        new bootstrap.Modal(document.getElementById("propertyDetailsModal")).show();
    }
}


// Redirigir al Formulario de Contacto
function goToContact(propiedad) {
    const selectPropiedad = document.getElementById("propiedadInteres");
    const opciones = Array.from(selectPropiedad.options);

    // Buscar si la propiedad ya existe en el select, si no, agregarla
    let opcionExistente = opciones.find(opt => opt.value === propiedad);
    if (!opcionExistente) {
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = propiedad;
        nuevaOpcion.textContent = propiedad;
        nuevaOpcion.selected = true;
        selectPropiedad.appendChild(nuevaOpcion);
    } else {
        selectPropiedad.value = propiedad;
    }

    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
}

// Función para aplicar filtros
function applyFilters() {
    console.log("🔍 applyFilters ejecutado"); // Ver si la función se ejecuta

    const tipo = document.getElementById("tipoPropiedad").value;
    const localidad = document.getElementById("localidad").value.toLowerCase();

    console.log("📌 Tipo seleccionado:", tipo);
    console.log("📌 Localidad seleccionada:", localidad);

    const filtered = propiedades.filter((prop) => {
        return (
            (tipo === "all" || prop.tipo === tipo) &&
            (!localidad || prop.localidad.toLowerCase().includes(localidad))
        );
    });

    console.log("✅ Propiedades filtradas:", filtered);

    if (filtered.length === 0) {
        document.getElementById("propiedadesContainer").innerHTML = `
            <div class="alert alert-warning text-center">
                No se encontraron propiedades. Intenta con otros filtros.
            </div>
        `;
    } else {
        renderProperties(filtered);
    }
}


// Obtén los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return { tipo: params.get('tipo') || 'all' };
}

// Aplica los filtros iniciales según los parámetros de la URL
function applyInitialFilters() {
    const { tipo } = getQueryParams();
    const tipoDropdown = document.getElementById('tipoPropiedad');
    if (tipoDropdown && tipo !== 'all') {
        tipoDropdown.value = tipo;
    }

    const filtered = propiedades.filter((prop) => tipo === 'all' || prop.tipo === tipo);
    renderProperties(filtered);
}

// Ejecuta los filtros iniciales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    applyInitialFilters();
    populateLocalitiesDropdown();  // Cargar localidades en el filtro
    populatePropertiesDropdown(); // Cargar propiedades en el formulario de contacto

    // Configurar filtros en tiempo real
    document.querySelectorAll("#filtros input, #filtros select").forEach((input) =>
        input.addEventListener("input", applyFilters)
    );
});


