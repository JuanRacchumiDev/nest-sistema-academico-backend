import dayjs from 'dayjs';
import 'dayjs/locale/es.js';

// Establecer el locale globalmente
dayjs.locale('es');

export class DateHelper {
    /**
     * Formatea una fecha individual en texto completo.
     * Ej: "2026-05-10" -> "10 de mayo de 2026"
     */
    public static fechaEnLetras(fecha?: string | Date | null): string {
        if (!fecha) return '';
        const d = dayjs(fecha).locale('es');
        if (!d.isValid()) return '';

        const dia = String(d.date()).padStart(2, '0');
        const mes = d.format('MMMM'); // En español
        const anio = d.year();

        return `${dia} de ${mes} de ${anio}`;
    }

    /**
     * Formatea el rango de fechas de un programa académico.
     */
    public static formatearRangoFechas(
        fechaInicio?: string | Date | null,
        fechaFinal?: string | Date | null,
    ): string {
        if (!fechaInicio && !fechaFinal) {
            return '';
        }

        if (!fechaInicio) {
            return `Realizado el ${this.fechaEnLetras(fechaFinal)}`;
        }

        if (!fechaFinal) {
            return `Realizado el ${this.fechaEnLetras(fechaInicio)}`;
        }

        const inicio = dayjs(fechaInicio).locale('es');
        const final = dayjs(fechaFinal).locale('es');

        if (!inicio.isValid() || !final.isValid()) {
            return '';
        }

        const diaInicio = String(inicio.date()).padStart(2, '0');
        const diaFinal = String(final.date()).padStart(2, '0');

        const mesInicio = inicio.format('MMMM');
        const mesFinal = final.format('MMMM');

        const anioInicio = inicio.year();
        const anioFinal = final.year();

        // Caso 1: Mismo Año
        if (anioInicio === anioFinal) {
            // Mismo mes
            if (inicio.month() === final.month()) {
                return `Realizado del ${diaInicio} al ${diaFinal} de ${mesFinal} del ${anioFinal}`;
            }

            // Distinto mes, mismo año
            return `Realizado del ${diaInicio} de ${mesInicio} al ${diaFinal} de ${mesFinal} del ${anioFinal}`;
        }

        // Caso 2: Años distintos
        return `Realizado del ${diaInicio} de ${mesInicio} del ${anioInicio} al ${diaFinal} de ${mesFinal} del ${anioFinal}`;
    }
}