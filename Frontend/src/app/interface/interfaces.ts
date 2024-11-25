export interface Service {
    idservicio: number;
    titulo: string;
    descripcion: string;
    precio: number;
    ubicacion: string;
    tipo_servicio: string;
    menu: string;
    capacidad: number;
    infraestructura: string;
    img: string;
    especialidad: string;
    fecha: string;
}

export interface Client {
    rut: string;
    nombre: string;
    apellido: string;
    correo: string;
}

export interface Reservation {
    pago_total: number;
    fecha: string;
    estado_pago: string;
    metodo_de_pago: string;
    idcliente: number;
    cantidad_personas: number;
    idservicio: number;
}

