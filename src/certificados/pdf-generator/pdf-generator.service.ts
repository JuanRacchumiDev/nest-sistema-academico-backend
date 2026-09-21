import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PDFDocument, PDFFont, PDFPage, RGB, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import * as fs from 'fs';
import * as path from 'path';
import { StringHelper } from '../../common/helpers/string.helper.js';
import { PdfDesignStyle, TextStyleConfig } from '../config/pdf-styles.config.js'

export interface RenderCertificadoOptions {
    nombreAlumno: string;
    tituloPrograma: string;
    fechasProgramaText: string
    nombreDirector?: string | null
    codigoVerificacion: string;
    qrBase64: string;
    pathPdfFondo?: string | null;
    outputPath: string;
    temario?: string | string[] | null;
    logoPath?: string | null;
    styles: PdfDesignStyle
}

@Injectable()
export class PdfGeneratorService {
    private readonly logger = new Logger(PdfGeneratorService.name);

    async generarCertificadoPdf(options: RenderCertificadoOptions): Promise<string> {
        try {
            const fullOutputPath = path.resolve(process.cwd(), 'storage', options.outputPath);
            const outputDir = path.dirname(fullOutputPath);

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const backgroundPdfPath = this.resolveTemplatePath(options.pathPdfFondo);

            let pdfDoc: PDFDocument;

            // Cargar el PDF Plantilla como Fondo o Crear un PDF en blanco A4 Landscape
            if (backgroundPdfPath && fs.existsSync(backgroundPdfPath)) {
                const backgroundBuffer = fs.readFileSync(backgroundPdfPath);
                pdfDoc = await PDFDocument.load(backgroundBuffer);
            } else {
                pdfDoc = await PDFDocument.create();
                pdfDoc.addPage([841.89, 595.28]); // Tamaño A4 Horizontal en puntos
            }

            // Registrar fontkit para usar fuentes TTF personalizadas
            pdfDoc.registerFontkit(fontkit);

            // -------------
            // HOJA 1
            // -------------
            const page1 = pdfDoc.getPages()[0];
            const { width, height } = page1.getSize();

            console.log('---- width page ----')
            console.log({ width })

            console.log('---- height page ----')
            console.log({ height })

            // Renderizado de Nombre de Alumno
            const nombreAlumnoFormatted = StringHelper.capitalize(options.nombreAlumno, true);
            const fontAlumno = await this.resolveFont(pdfDoc, options.styles.alumno);
            const colorAlumno = this.hexToRgb(options.styles.alumno.color);
            const baseFontSizeAlumno = options.styles.alumno.fontSize;

            this.renderNombreAlumnoMultiline({
                page: page1,
                text: nombreAlumnoFormatted,
                font: fontAlumno,
                color: colorAlumno,
                baseFontSize: baseFontSizeAlumno,
                pageWidth: width,
                baseY: 305, // Coordenada Y por defecto para 1 sola línea
                maxWidth: width * 0.86, // Ancho máximo (~723 pt en A4)
                // maxWidth: width * 0.82, // Ancho máximo (~690 pt en A4)
            });

            // Renderizado de Título de Programa
            const tituloProgramaUpper = options.tituloPrograma.toUpperCase();
            const fontPrograma = await this.resolveFont(pdfDoc, options.styles.programa);
            const colorPrograma = this.hexToRgb(options.styles.programa.color);
            const fontSizePrograma = options.styles.programa.fontSize;
            const widthPrograma = fontPrograma.widthOfTextAtSize(tituloProgramaUpper, fontSizePrograma);

            page1.drawText(tituloProgramaUpper, {
                x: (width - widthPrograma) / 2,
                y: 240,
                size: fontSizePrograma,
                font: fontPrograma,
                color: colorPrograma,
            });

            // Renderizado de Fechas
            if (options.fechasProgramaText) {
                const fontFechas = await this.resolveFont(pdfDoc, options.styles.fechas);
                const colorFechas = this.hexToRgb(options.styles.fechas.color);
                const fontSizeFechas = options.styles.fechas.fontSize;
                const widthFechas = fontFechas.widthOfTextAtSize(options.fechasProgramaText, fontSizeFechas);

                page1.drawText(options.fechasProgramaText, {
                    x: (width - widthFechas) / 2,
                    y: 215,
                    size: fontSizeFechas,
                    font: fontFechas,
                    color: colorFechas,
                });
            }

            // Renderizado de Firma Director (Si aplica el diseño)
            if (options.styles.director && options.nombreDirector) {
                const fontDirector = await this.resolveFont(pdfDoc, options.styles.director);
                const colorDirector = this.hexToRgb(options.styles.director.color);
                const fontSizeDirector = options.styles.director.fontSize;
                const widthDirector = fontDirector.widthOfTextAtSize(options.nombreDirector, fontSizeDirector);

                page1.drawText(options.nombreDirector, {
                    x: (width - widthDirector) / 2,
                    y: 95,
                    size: fontSizeDirector,
                    font: fontDirector,
                    color: colorDirector,
                });
            }

            // --------
            // Hoja 2
            // --------
            const page2 = pdfDoc.addPage([841.89, 595.28]);
            const fontHelv = await pdfDoc.embedFont('Helvetica');
            const fontHelvBold = await pdfDoc.embedFont('Helvetica-Bold');

            // Columna Izquierda: Texto Legal + Título + Temario
            const leftColX = 50;
            let startY = height - 60;

            // Texto legal
            const legalText =
                'Esta es una copia auténtica imprimible de un documento electrónico archivado por INNOVAPERU,\naplicando lo dispuesto por el Art. 25 de D.S. 070-2013-PCM\ny la Tercera Disposición Complementaria Final del D.S. 026-2016-PCM.';

            page2.drawText(legalText, {
                x: leftColX,
                y: startY,
                size: 10,
                font: fontHelv,
                color: rgb(0.1, 0.1, 0.1),
                lineHeight: 14,
            });

            startY -= 60;

            // Título del Curso
            page2.drawText(options.tituloPrograma, {
                x: leftColX,
                y: startY,
                size: 15,
                font: fontHelvBold,
                color: rgb(0.04, 0.13, 0.22),
            });

            startY -= 30;

            // Contenedor "Temario"
            page2.drawRectangle({
                x: leftColX,
                y: startY,
                width: 400,
                height: 22,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            page2.drawText('TEMARIO', {
                x: leftColX + 10,
                y: startY + 6,
                size: 11,
                font: fontHelvBold,
                color: rgb(0, 0, 0),
            });

            startY -= 10;

            // Renderizado de lista de Items del Temario
            if (options.temario) {
                const temarioItems = Array.isArray(options.temario)
                    ? options.temario
                    : options.temario.split('\n');

                let itemY = startY - 10;
                for (const item of temarioItems) {
                    if (!item.trim()) continue;
                    page2.drawText(`${item.trim()}`, {
                        x: leftColX + 5,
                        y: itemY,
                        size: 10,
                        font: fontHelv,
                        color: rgb(0.1, 0.1, 0.1),
                    });
                    itemY -= 16;
                }
            }

            // Columna Derecha: Logo e Inserción de Tabla de Registro Electrónico con QR
            const rightColX = 560;

            // Logo Institucional
            if (options.logoPath && fs.existsSync(options.logoPath)) {
                const logoBuffer = fs.readFileSync(options.logoPath);
                const isPng = options.logoPath.endsWith('.png');
                const logoImg = isPng
                    ? await pdfDoc.embedPng(logoBuffer)
                    : await pdfDoc.embedJpg(logoBuffer);

                page2.drawImage(logoImg, {
                    x: rightColX + 40,
                    y: height - 120,
                    width: 180,
                    height: 65,
                });
            }

            // Tabla Registro Electrónico
            const tableX = rightColX;
            const tableY = height - 240;
            const tableWidth = 230;

            // Encabezado Tabla 1
            page2.drawRectangle({
                x: tableX,
                y: tableY,
                width: tableWidth,
                height: 20,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            page2.drawText('REGISTRO ELECTRÓNICO', {
                x: tableX + 45,
                y: tableY + 5,
                size: 10,
                font: fontHelvBold,
            });

            // Fila Código Validación
            page2.drawRectangle({
                x: tableX,
                y: tableY - 22,
                width: tableWidth,
                height: 22,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            page2.drawText('Código Validación:', {
                x: tableX + 8,
                y: tableY - 16,
                size: 9,
                font: fontHelvBold,
            });

            page2.drawText(options.codigoVerificacion, {
                x: tableX + 125,
                y: tableY - 16,
                size: 9,
                font: fontHelv,
            });

            page2.drawRectangle({
                x: tableX,
                y: tableY - 44,
                width: tableWidth,
                height: 20,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            page2.drawText('VERIFICACIÓN EN LÍNEA', {
                x: tableX + 45,
                y: tableY - 39,
                size: 10,
                font: fontHelvBold,
            });

            // Celda para el Código QR
            const qrBoxHeight = 150;
            page2.drawRectangle({
                x: tableX,
                y: tableY - 44 - qrBoxHeight,
                width: tableWidth,
                height: qrBoxHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            if (options.qrBase64) {
                const qrBuffer = Buffer.from(
                    options.qrBase64.replace(/^data:image\/png;base64,/, ''),
                    'base64',
                );
                const qrImg = await pdfDoc.embedPng(qrBuffer);
                page2.drawImage(qrImg, {
                    x: tableX + 50,
                    y: tableY - 34 - qrBoxHeight,
                    width: 130,
                    height: 130,
                });
            }

            // Guardar y Escribir el Archivo Compilado en Disco
            const pdfBytes = await pdfDoc.save();
            fs.writeFileSync(fullOutputPath, pdfBytes);

            return fullOutputPath;
        } catch (error) {
            this.logger.error(`Error al construir el PDF con plantilla: ${error}`);
            throw new InternalServerErrorException(
                `Error al construir el documento PDF: ${error}`,
            );
        }
    }

    /**
     * Divide el nombre del alumno en 1 o 2 líneas si excede el ancho máximo,
     * ajustando dinámicamente la fuente y la posición en el eje Y.
     */
    private renderNombreAlumnoMultiline(params: {
        page: PDFPage;
        text: string;
        font: PDFFont;
        color: RGB;
        baseFontSize: number;
        pageWidth: number;
        baseY: number;
        maxWidth: number;
    }): void {
        const { page, text, font, color, baseFontSize, pageWidth, baseY } = params;

        // 1. RESTRICCIÓN DE MARGEN: Definimos un maxWidth más conservador (70% del ancho A4)
        // para no sobreponerse a las líneas verticales del diseño.
        const effectiveMaxWidth = params.maxWidth ? Math.min(params.maxWidth, pageWidth * 0.70) : pageWidth * 0.70;

        // Medir ancho original con el tamaño base configurado
        const originalWidth = font.widthOfTextAtSize(text, baseFontSize);

        // CASO 1: El texto cabe perfectamente en 1 línea con el tamaño base
        if (originalWidth <= effectiveMaxWidth) {
            console.log('caso 1');
            page.drawText(text, {
                x: (pageWidth - originalWidth) / 2,
                y: baseY,
                size: baseFontSize,
                font,
                color,
            });
            return;
        }

        // INTENTO DE ESCALADO EN 1 LÍNEA:
        // Si se excede ligeramente (hasta un 15%), reducemos levemente la fuente para mantener 1 sola línea
        const scaledFontSize = Math.round(baseFontSize * (effectiveMaxWidth / originalWidth));
        if (scaledFontSize >= Math.round(baseFontSize * 0.8)) {
            console.log('INTENTO DE ESCALADO EN 1 LÍNEA');
            const scaledWidth = font.widthOfTextAtSize(text, scaledFontSize);
            page.drawText(text, {
                x: (pageWidth - scaledWidth) / 2,
                y: baseY,
                size: scaledFontSize,
                font,
                color,
            });
            return;
        }

        // CASO 2: El texto requiere envolverse en múltiples líneas
        // Primero dividimos preliminarmente las palabras
        const words = text.split(/\s+/);

        // 2. ESCALADO ADAPTATIVO DE FUENTE SEGÚN CANTIDAD ESTIMADA DE PALABRAS/LÍNEAS
        // Para 2 líneas usamos 65% del tamaño base. Si el nombre es muy largo (>5 palabras), usamos 52%
        let fontScaleRatio = words.length > 5 ? 0.52 : 0.65;
        let adjustedFontSize = Math.round(baseFontSize * fontScaleRatio);

        let lines: string[] = this.splitTextIntoLines(words, font, adjustedFontSize, effectiveMaxWidth);

        // Si con la primera reducción aún salen más de 2 líneas, ajustamos a un escalado más pequeño (50%)
        if (lines.length > 2) {
            fontScaleRatio = 0.50;
            adjustedFontSize = Math.round(baseFontSize * fontScaleRatio);
            lines = this.splitTextIntoLines(words, font, adjustedFontSize, effectiveMaxWidth);
        }

        // CASO BORDE: Si tras la división resulta 1 sola línea
        if (lines.length === 1) {
            console.log('CASO BORDE: Si tras la división resulta 1 sola línea');

            // 1. Recalcular la fuente ideal para 1 sola línea:
            // Calculamos el tamaño exacto para llenar el ancho disponible, limitándolo a un máximo
            // de 78% del baseFontSize (para no igualar el Caso 1 o el Escrito con escalado inicial)
            const singleLineCalculatedSize = Math.floor(baseFontSize * (effectiveMaxWidth / originalWidth));
            const maxAllowedSingleLineSize = Math.round(baseFontSize * 0.78);

            // Asignamos el mayor valor posible entre el ajustado actual y el calculado
            const borderCaseFontSize = Math.min(
                Math.max(adjustedFontSize, singleLineCalculatedSize),
                maxAllowedSingleLineSize
            );

            // 2. Medir el ancho exacto con la nueva fuente ajustada
            const singleLineWidth = font.widthOfTextAtSize(lines[0], borderCaseFontSize);

            // 3. Desplazar ligeramente hacia arriba el eje Y (ej: +6pt)
            const offsetY = 6;
            const singleLineY = baseY + offsetY;

            page.drawText(lines[0], {
                x: (pageWidth - singleLineWidth) / 2,
                y: singleLineY,
                size: borderCaseFontSize,
                font,
                color,
            });
            return;
        }

        // 3. AJUSTE DINÁMICO DE LINEHEIGHT SEGÚN EL NÚMERO DE LÍNEAS
        // A mayor número de líneas, se ajusta un interlineado más compacto para cuidar la proporción vertical
        const lineHeightFactor = lines.length > 2 ? 1.05 : 1.15;
        const lineHeight = adjustedFontSize * lineHeightFactor;
        const totalBlockHeight = (lines.length - 1) * lineHeight;

        // Reposicionar Y para que el centro visual del bloque coincida con baseY
        let currentY = baseY + totalBlockHeight / 2;

        console.log('más de dos líneas');
        for (const line of lines) {
            const lineWidth = font.widthOfTextAtSize(line, adjustedFontSize);

            page.drawText(line, {
                x: (pageWidth - lineWidth) / 2,
                y: currentY,
                size: adjustedFontSize,
                font,
                color,
            });

            currentY -= lineHeight; // Avanzar a la siguiente línea
        }
    }

    /**
    * Función auxiliar para agrupar palabras en líneas respetando un ancho máximo.
    */
    private splitTextIntoLines(
        words: string[],
        font: PDFFont,
        fontSize: number,
        maxWidth: number,
    ): string[] {
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth <= maxWidth || !currentLine) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    /**
     * Resuelve e incrusta la fuente configurada (TTF personalizada o Estándar)
     */
    private async resolveFont(pdfDoc: PDFDocument, style: TextStyleConfig): Promise<PDFFont> {
        if (style.custom_font) {
            const fontPath = path.resolve(process.cwd(), 'assets/fonts', style.font);
            if (fs.existsSync(fontPath)) {
                return await pdfDoc.embedFont(fs.readFileSync(fontPath));
            }
        }
        return await pdfDoc.embedFont('Helvetica');
    }

    /**
   * Convierte un código Hexadecimal (#000000) a RGB normalizado (0.0 - 1.0) para pdf-lib
   */
    private hexToRgb(hexColor: string): RGB {
        const cleanHex = hexColor.replace('#', '');
        const bigint = parseInt(cleanHex, 16);
        const r = ((bigint >> 16) & 255) / 255;
        const g = ((bigint >> 8) & 255) / 255;
        const b = (bigint & 255) / 255;
        return rgb(r, g, b);
    }

    /**
     * Resuelve la ruta física absoluta de la plantilla de fondo dentro de /storage/
     */
    private resolveTemplatePath(relativePath?: string | null): string | null {
        if (!relativePath) return null;

        const absolutePath = path.isAbsolute(relativePath)
            ? relativePath
            : path.resolve(process.cwd(), 'storage', relativePath);

        if (fs.existsSync(absolutePath)) {
            return absolutePath;
        }

        this.logger.warn(`Plantilla de fondo en PDF no encontrada en: ${absolutePath}`);
        return null;
    }
}