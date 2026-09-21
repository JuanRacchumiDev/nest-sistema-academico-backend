import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Certificado } from "../../certificados/entities/certificado.entity.js"

@Entity({ name: 'modulo', schema: 'academic' })
export class Modulo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @OneToMany(() => Certificado, (certificado) => certificado.modulo)
    certificados: Certificado[]
}