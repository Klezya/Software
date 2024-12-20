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

export interface Personal {
    usuario: string;
    password: string;
}

export interface Reporte {
    mes_ano: string;
    total_recaudado: number;
    cantidad_salones: number;
    cantidad_banquetes: number;
    cantidad_eventos: number;
    cantidad_reservas: number;
    servicios: Service[]; 
}

