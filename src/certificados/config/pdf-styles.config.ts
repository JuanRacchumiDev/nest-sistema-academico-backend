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

export interface PdfMetadata {
    fecha_crea: string
    fecha_actualiza: string
    user_crea?: string
    user_actualiza?: string
}

export interface CertificadoRenderData {
    style: PdfDesignStyle
    metadata: PdfMetadata
}

// Tipo recursivo para soportar N niveles de anidación o el estilo final
export type PdfStyleTree = {
    [key: string]: PdfDesignStyle | PdfStyleTree;
};

export const STYLES_PDFS_CONFIG: PdfStyleTree = {
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
        },
        especializacion_col_profesores_lima: {
            alumno: {
                color: '#D5A701',
                custom_font: true,
                font: 'GreatVibes-Regular.ttf',
                fontSize: 60,
            },
            programa: {
                color: '#002155',
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
        }
    }
};

/**
 * Función auxiliar Type Guard para verificar si un objeto cumple con la interfaz PdfDesignStyle
 */
function isPdfDesignStyle(obj: unknown): obj is PdfDesignStyle {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'alumno' in obj &&
        'programa' in obj &&
        'fechas' in obj
    );
}

/**
 * Resuelve la configuración de estilos a utilizar según tipo de programa, subtipo o diseño
 */
export function resolvePdfStyle(
    disenioDefault?: string | null,
    tipoDisenio?: string | null,
    subtipoDisenio?: string | null,
): PdfDesignStyle {
    const tipoKey = (disenioDefault || 'capacitacion').toLowerCase();
    const disenioKey = tipoDisenio || 'default_uno';
    const subtipoKey = subtipoDisenio || null;

    const grupoTipo = STYLES_PDFS_CONFIG[tipoKey] as Record<string, unknown> | undefined;

    // 1. Buscar en nivel profundo (tipo -> diseño -> subtipo)
    if (subtipoKey && grupoTipo) {
        const grupoDisenio = grupoTipo[disenioKey] as Record<string, unknown> | undefined;
        if (grupoDisenio) {
            const target = grupoDisenio[subtipoKey];
            if (isPdfDesignStyle(target)) {
                return target;
            }
        }
    }

    // 2. Buscar en nivel intermedio (tipo -> diseño)
    if (grupoTipo) {
        const targetIntermedio = grupoTipo[disenioKey];
        if (isPdfDesignStyle(targetIntermedio)) {
            return targetIntermedio;
        }

        // Fallback al primer estilo válido dentro de esa rama
        if (typeof targetIntermedio === 'object' && targetIntermedio !== null) {
            const valores = Object.values(targetIntermedio as Record<string, unknown>);
            const primerEstilo = valores.find(isPdfDesignStyle);
            if (primerEstilo) return primerEstilo;
        }
    }

    // 3. Fallback por defecto
    const grupoCapacitacion = STYLES_PDFS_CONFIG.capacitacion as Record<string, unknown> | undefined;
    const defaultStyle = grupoCapacitacion?.default_uno;
    if (isPdfDesignStyle(defaultStyle)) {
        return defaultStyle;
    }

    throw new Error('No se pudo resolver una configuración de estilo PDF válida.');
}