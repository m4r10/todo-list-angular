export class EntidadBase {
    id: number;
    descripcion: string;
}
export class Tarea extends EntidadBase {
    descripcion: string;
}

export class Alert {
    type: string;
    message: string;
}

export class Modal {
    title: string;
    message: string;
}