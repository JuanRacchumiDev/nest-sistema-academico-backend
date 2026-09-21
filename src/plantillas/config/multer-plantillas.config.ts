import { diskStorage } from "multer"
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export const multerPlantillasOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve(process.cwd(), 'storage', 'plantillas');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        if (file.fieldname === 'path_pdf_fondo') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new BadRequestException('El campo path_pdf_fondo debe ser un archivo PDF'), false);
            }
        } else if (
            file.fieldname === 'path_imagen_fondo' ||
            file.fieldname === 'path_imagen_publica'
        ) {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            } else {
                cb(new BadRequestException(`El campo ${file.fieldname} debe ser una imagen JPG, JPEG o PNG`), false);
            }
        } else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // Máximo 10MB
    },
};