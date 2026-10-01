import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Certificado } from "../../certificados/entities/certificado.entity.js"
import type { Relation } from 'typeorm';
import type { Programa } from "../../programas/entities/programa.entity.js"

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

    @ManyToOne('Programa', (programa: Programa) => programa.modulos)
    @JoinColumn({ name: 'id_programa' })
    programa: Relation<Programa>;
}