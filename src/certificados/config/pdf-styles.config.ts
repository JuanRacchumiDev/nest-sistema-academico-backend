export interface TextStyleConfig {
    color: string
    custom_font: boolean
    font: string
    fontSize: number
}

export interface PdfDesignStyle {
    alumno: TextStyleConfig
    programa: TextStyleConfig
    fechas: TextStyleConfig
    director?: TextStyleConfig
}

export const STYLES_PDFS_CONFIG: Record<string, Record<string, PdfDesignStyle>> = {
    capacitacion: {
        default_uno: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 52,
            },
            programa: {
                color: '#000000',
                custom_font: true,
                font: 'Calibri Bold.ttf',
                fontSize: 20,
            },
            fechas: {
                color: '#589AFC',
                custom_font: false,
                font: 'Calibri.ttf',
                fontSize: 15,
            },
        },
    },
    certificacion: {
        cert_col_abogados: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78,
            },
            programa: {
                color: '#0092FF',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#D5A701',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
    },
};

/**
 * Resuelve la configuración de estilos a utilizar según tipo de programa y diseño
 */
export function resolvePdfStyle(
    tipoProgramaUrl?: string | null,
    tipoDisenio?: string | null,
    disenioDefault?: string | null
): PdfDesignStyle {
    const tipoKey = (tipoProgramaUrl || 'capacitacion').toLowerCase()
    const disenioKey = tipoDisenio || disenioDefault || 'default_uno'
    const grupoEstilos = STYLES_PDFS_CONFIG[tipoKey]

    if (grupoEstilos && grupoEstilos[disenioKey]) {
        return grupoEstilos[disenioKey]
    }

    if (grupoEstilos && grupoEstilos['default_uno']) {
        return grupoEstilos['default_uno']
    }

    return STYLES_PDFS_CONFIG.capacitacion.default_uno
}