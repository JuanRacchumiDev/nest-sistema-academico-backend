import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Persona } from "../../personas/entities/persona.entity.js"
import { DetalleParametro } from "../../detalle-parametros/entities/detalle-parametro.entity.js"
import { Institucion } from "../../instituciones/entities/institucion.entity.js"
import { Plantilla } from "../../plantillas/entities/plantilla.entity.js"
import { Programa } from "../../programas/entities/programa.entity.js"
import { Modulo } from "../../modulos/entities/modulo.entity.js"

@Entity({ name: 'certificado', schema: 'academic' })
export class Certificado {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'codigo_verificacion', nullable: true })
    codigoVerificacion: string

    @Column({ name: 'codigo_qr_path', nullable: true })
    codigoQrPath: string

    @Column({ name: 'path_file', nullable: true })
    pathFile: string

    @Column({ name: 'filename', nullable: true })
    filename: string

    @Column({ name: 'nombre_impresion', nullable: true })
    nombreImpresion: string

    @Column({ name: 'fecha_crea', nullable: true })
    fechaCrea: string

    @Column({ name: 'fecha_actualiza', nullable: true })
    fechaActualiza: string

    @Column({ name: 'fecha_elimina', nullable: true })
    fechaElimina: string

    @Column({ name: 'user_crea', nullable: true })
    userCrea: string

    @Column({ name: 'user_actualiza', nullable: true })
    userActualiza: string

    @Column({ name: 'user_elimina', nullable: true })
    userElimina: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @ManyToOne(() => Persona, (persona) => persona.certificados, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'id_persona' })
    persona: Persona

    @ManyToOne(() => DetalleParametro, { nullable: true })
    @JoinColumn({ name: 'codigo_tipocertificado', referencedColumnName: 'codigo' })
    tipoCertificado: DetalleParametro

    @ManyToOne(() => Institucion, { nullable: true })
    @JoinColumn({ name: 'id_sucursal' })
    sucursal: Institucion

    @ManyToOne(() => Plantilla, { nullable: true })
    @JoinColumn({ name: 'id_plantilla' })
    plantilla: Plantilla

    @ManyToOne(() => Programa, (programa) => programa.certificados, {
        nullable: true
    })
    @JoinColumn({ name: 'id_programa' })
    programa: Programa

    @ManyToOne(() => Modulo, (modulo) => modulo.certificados, {
        nullable: true
    })
    @JoinColumn({ name: 'id_modulo' })
    modulo: Modulo
}