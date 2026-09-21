import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Certificado } from "../../certificados/entities/certificado.entity.js"
import { DetalleParametro } from "../../detalle-parametros/entities/detalle-parametro.entity.js"
import { Institucion } from "../../instituciones/entities/institucion.entity.js"

@Entity({ name: 'programa', schema: 'academic' })
export class Programa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'codigo_old', nullable: true })
    codigoOld: true

    @Column({ nullable: true })
    sigla: string

    @Column()
    titulo: string

    @Column({ name: 'titulo_url' })
    tituloUrl: string

    @Column({ nullable: true })
    temario: string

    @Column({ nullable: true })
    descripcion: string

    @Column({ nullable: true })
    contenido: string

    @Column({ name: 'fecha_inicio', nullable: true })
    fechaInicio: string

    @Column({ name: 'fecha_final', nullable: true })
    fechaFinal: string

    @Column({ nullable: true })
    duracion: string

    @Column({ name: 'horas_academicas', nullable: true })
    horasAcademicas: number

    @Column({ name: 'numero_modulos', nullable: true })
    numeroModulos: number

    @Column({ nullable: true })
    creditos: number

    @Column({ nullable: true })
    plan: string

    @Column({ nullable: true, default: 'VIRTUAL' })
    modalidad: string

    @Column({ name: 'capacidad_minima', nullable: true })
    capacidadMinima: number

    @Column({ name: 'capacidad_maxima', nullable: true })
    capacidadMaxima: number

    @Column({ name: 'cantidad_inscritos', nullable: true })
    cantidadInscritos: number

    @Column({ name: 'precio_modulo', nullable: true })
    precioModulo: number

    @Column({ name: 'banner_url', nullable: true })
    bannerUrl: string

    @Column({ name: 'is_vigente', type: 'boolean', default: true })
    isVigente: boolean

    @Column({ name: 'show_web', type: 'boolean', default: true })
    showWeb: boolean

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

    @ManyToOne(() => DetalleParametro, { nullable: true })
    @JoinColumn({ name: 'codigo_segmento', referencedColumnName: 'codigo' })
    segmento: DetalleParametro

    @ManyToOne(() => DetalleParametro, { nullable: true })
    @JoinColumn({ name: 'codigo_tipoprograma', referencedColumnName: 'codigo' })
    tipoPrograma: DetalleParametro

    @ManyToOne(() => DetalleParametro, { nullable: true })
    @JoinColumn({ name: 'codigo_categoriaprograma', referencedColumnName: 'codigo' })
    categoriaPrograma: DetalleParametro

    @ManyToOne(() => Institucion, { nullable: true })
    @JoinColumn({ name: 'id_sucursal' })
    sucursal: Institucion

    @OneToMany(() => Certificado, (certificado) => certificado.programa)
    certificados: Certificado[]
}