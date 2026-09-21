import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Certificado } from "../../certificados/entities/certificado.entity.js"

@Entity({ name: 'institucion', schema: 'academic' })
export class Institucion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    sigla: string

    @Column()
    ruc: string

    @Column({ name: 'logo_path' })
    logoPath: string

    @Column({ name: 'nombre_director' })
    nombreDirector: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @OneToMany(() => Certificado, (certificado) => certificado.sucursal)
    certificados: Certificado[]
}