import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { DetalleParametro } from "../../detalle-parametros/entities/detalle-parametro.entity.js"

@Entity({ name: 'parametro', schema: 'academic' })
export class Parametro {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ name: 'nombre_url' })
    nombreUrl: string

    @Column({ nullable: true })
    descripcion: string

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

    @OneToMany(() => DetalleParametro, (detalle) => detalle.parametro, {
        cascade: true
    })
    detalles: DetalleParametro[]
}