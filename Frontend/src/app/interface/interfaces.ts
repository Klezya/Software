export interface Service {
    id: number;
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
}

export interface Client {
    rut: string;
    nombre: string;
    apellido: string;
    correo: string;
}

export interface Reservation {
    id: number;
    pago_total: number;
    fecha: string;
    estado_pago: string;
    metodo_de_pago: string;
    idcliente: number;
    cantidad_personas: number;
    idservicio: number;
}

export interface Adicional {
    cantidad_personas: number;
    valor_adicional: number;
}
