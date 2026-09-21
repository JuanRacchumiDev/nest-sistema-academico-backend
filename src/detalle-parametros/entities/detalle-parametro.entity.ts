import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Parametro } from "../../parametros/entities/parametro.entity.js"

@Entity({ name: 'detalle_parametro', schema: 'academic' })
export class DetalleParametro {
    @PrimaryColumn()
    codigo: number

    @Column()
    nombre: string

    @Column({ name: 'nombre_url' })
    nombreUrl: string

    @Column({ nullable: false })
    descripcion: string

    @Column({ nullable: false })
    valor: string

    @Column({ nullable: false })
    abreviatura: string

    @Column({ nullable: false })
    longitud: number

    @Column({ type: 'boolean', name: 'en_persona', default: false })
    enPersona: boolean

    @Column({ type: 'boolean', name: 'en_empresa', default: false })
    enEmpresa: boolean

    @Column({ type: 'boolean', name: 'compra', default: false })
    compra: boolean

    @Column({ type: 'boolean', name: 'venta', default: false })
    venta: boolean

    @Column({ type: 'boolean', name: 'visible', default: false })
    visible: boolean

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

    @ManyToOne(() => Parametro, (parametro) => parametro.detalles, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'parametro_clase' })
    parametro: Parametro
}