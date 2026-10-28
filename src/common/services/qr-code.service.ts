import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QrCodeService {
    async generateAndSaveQR(
        url: string,
        outputRelativePath: string,
        disenioDefault: string
    ): Promise<string> {
        try {
            const fullPath = path.resolve(process.cwd(), 'storage', outputRelativePath)
            const dir = path.dirname(fullPath)

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }

            const colorDark = (disenioDefault && disenioDefault === 'certificado_peruagro') ? '#CB9336' : '#000000'
            const colorLight = (disenioDefault && disenioDefault === 'certificado_peruagro') ? '#00000000' : '#FFFFFF'

            // Guardar el código QR en el código local
            await QRCode.toFile(fullPath, url, {
                width: 300,
                margin: 1,
                color: { dark: colorDark, light: colorLight }
            })

            // Leer para convertir a Data URI (Base64)
            const qrBuffer = fs.readFileSync(fullPath)
            return `data:image/png;base64,${qrBuffer.toString('base64')}`
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException(
                `Error al generar el código QR: ${error}`,
            );
        }
    }
}