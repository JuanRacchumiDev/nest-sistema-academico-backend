import { DateFormatterUtil } from "../utils/date-formatter.util.js";

export abstract class AuditableEntity {
    fecha_crea: string
    fecha_actualiza: string
    user_crea?: string
    user_actualiza?: string

    protected setAuditDateOnCreate(userId?: string): void {
        const diaActual = DateFormatterUtil.formatDate()
        this.fecha_crea = diaActual
        this.fecha_actualiza = diaActual
        if (userId) {
            this.user_crea = userId
            this.user_actualiza = userId
        }
    }

    protected setAuditDatesOnUpdate(userId?: string): void {
        this.fecha_actualiza = DateFormatterUtil.formatDate();
        if (userId) {
            this.user_actualiza = userId;
        }
    }
}