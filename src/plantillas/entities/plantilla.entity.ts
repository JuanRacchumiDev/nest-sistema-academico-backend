import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Institucion } from "../../instituciones/entities/institucion.entity.js"
import { DetalleParametro } from "../../detalle-parametros/entities/detalle-parametro.entity.js"

@Entity({ name: 'plantilla', schema: 'academic' })
export class Plantilla {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    nombre: string

    @Column({ length: 150, nullable: true })
    descripcion: string

    @Column({ name: 'path_imagen_fondo', nullable: true })
    pathImagenFondo: string

    @Column({ name: 'path_imagen_publica', nullable: true })
    pathImagenPublica: string

    @Column({ name: 'path_pdf_fondo', nullable: true })
    pathPdfFondo: string

    @Column({ name: 'tipo_disenio', length: 100, nullable: true })
    tipoDisenio: string

    @Column({ name: 'disenio_default', length: 100, nullable: true })
    disenioDefault: string

    @Column({ name: 'fecha_crea', length: 10, nullable: true })
    fechaCrea: string

    @Column({ name: 'fecha_actualiza', length: 10, nullable: true })
    fechaActualiza: string

    @Column({ name: 'fecha_elimina', length: 10, nullable: true })
    fechaElimina: string

    @Column({ name: 'user_crea', length: 12, nullable: true })
    userCrea: string

    @Column({ name: 'user_actualiza', length: 12, nullable: true })
    userActualiza: string

    @Column({ name: 'user_elimina', length: 12, nullable: true })
    userElimina: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    // Relaciones
    @ManyToOne(() => Institucion, { nullable: true })
    @JoinColumn({ name: 'id_institucion' })
    institucion: Institucion

    @ManyToOne(() => DetalleParametro, { nullable: true })
    @JoinColumn({ name: 'codigo_tipoprograma', referencedColumnName: 'codigo' })
    tipoPrograma: DetalleParametro


}