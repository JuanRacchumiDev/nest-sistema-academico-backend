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
        capacitacion_col_enfermeros_huanuco: {
            alumno: {
                color: '#191C43',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 52
            },
            programa: {
                color: '#191C43',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 20,
            },
            fechas: {
                color: '#02BFBE',
                custom_font: false,
                font: 'Archivo-Regular.ttf',
                fontSize: 15,
            },
        }
    },
    certificacion: {
        cert_col_abogados: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#0092FF',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#D5A701',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_administracion: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#0092FF',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#007A3E',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_arquitectos: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#0092FF',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#007A3E',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_contadores: {
            alumno: {
                color: '#0D377F',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#0D377F',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#B89439',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_enfermeros: {
            alumno: {
                color: '#191C43',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#191C43',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#02BFBE',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_ingenieros: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#6C0E10',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#C6A54F',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_lamas: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#1E3D8A',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#A87D26',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
        cert_col_psicologia: {
            alumno: {
                color: '#0C2468',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 56,
            },
            programa: {
                color: '#1D2C5B',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 22,
            },
            fechas: {
                color: '#A87D26',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14,
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12,
            },
        },
    },
    especializacion: {
        especializacion_col_abogados: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
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
        especializacion_col_administracion: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#000000',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#007A3E',
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
        especializacion_col_arquitectos: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#000000',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#C6A54F',
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
        especializacion_col_contadores: {
            alumno: {
                color: '#0D377F',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#0D377F',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#B89439',
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
        especializacion_col_enfermeros: {
            alumno: {
                color: '#191C43',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#191C43',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#02BFBE',
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
        especializacion_col_ingenieros: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#6C0E10',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#A87D26',
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
        especializacion_col_psicologos: {
            alumno: {
                color: '#0C2468',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#0C2468',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#A87D26',
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
        especializacion_lamas: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#1E3D8A',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30,
            },
            fechas: {
                color: '#E5231E',
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
        }
    },
    diplomado: {
        diplomado_col_abogados: {
            alumno: {
                color: '#D5A701',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 70
            },
            programa: {
                color: '#0092FF',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 28
            },
            fechas: {
                color: '#D5A701',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 14
            },
            director: {
                color: '#000000',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_administracion: {
            alumno: {
                color: '#007A3E',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#000000',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#007A3E',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_arquitectos: {
            alumno: {
                color: '#D5A701',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#000000',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#D5A701',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_contadores: {
            alumno: {
                color: '#B89439',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#0D377F',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#B89439',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_enfermeros: {
            alumno: {
                color: '#02BFBE',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#191C43',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#E09227',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_lamas: {
            alumno: {
                color: '#000000',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#191C43',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#E5231E',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_ingenieros: {
            alumno: {
                color: '#BC9550',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#6C0E10',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#BC9550',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        },
        diplomado_col_psicologos: {
            alumno: {
                color: '#A87D26',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 78
            },
            programa: {
                color: '#0C2468',
                custom_font: true,
                font: 'Anton.ttf',
                fontSize: 30
            },
            fechas: {
                color: '#A87D26',
                custom_font: true,
                font: 'Archivo-Regular.ttf',
                fontSize: 17
            },
            director: {
                color: '#1D1D1B',
                custom_font: true,
                font: 'Archivo-Medium.ttf',
                fontSize: 12
            }
        }
    }
};

/**
 * Resuelve la configuración de estilos a utilizar según tipo de programa y diseño
 */
export function resolvePdfStyle(
    disenioDefault?: string | null,
    tipoDisenio?: string | null,
): PdfDesignStyle {
    const tipoKey = (disenioDefault || 'capacitacion').toLowerCase()
    const disenioKey = tipoDisenio || 'default_uno'
    const grupoEstilos = STYLES_PDFS_CONFIG[tipoKey]

    if (grupoEstilos && grupoEstilos[disenioKey]) {
        return grupoEstilos[disenioKey]
    }

    if (grupoEstilos && grupoEstilos['default_uno']) {
        return grupoEstilos['default_uno']
    }

    return STYLES_PDFS_CONFIG.capacitacion.default_uno
}