import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Certificado } from "../../certificados/entities/certificado.entity.js"

@Entity({ name: 'persona', schema: 'academic' })
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'codigo_tipodocumento' })
    codigoTipoDocumento: string

    @Column({ name: 'numero_documento' })
    numeroDocumento: string

    @Column()
    nombres: string

    @Column({ name: 'apellido_paterno' })
    apellidoPaterno: string

    @Column({ name: 'apellido_materno' })
    apellidoMaterno: string

    @Column({ name: 'nombre_completo' })
    nombreCompleto: string

    @Column({ nullable: true })
    departamento: string

    @Column({ nullable: true })
    provincia: string

    @Column({ nullable: true })
    distrito: string

    @Column({ nullable: true })
    direccion: string

    @Column({ name: 'direccion_completa', nullable: true })
    direccionCompleta: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    telefono: string

    @Column({ name: 'ubigeo_reniec', nullable: true })
    ubigeoReniec: string

    @Column({ name: 'ubigeo_sunat', nullable: true })
    ubigeoSunat: string

    @Column({ nullable: true })
    ubigeo: string

    @Column({ name: 'fecha_nacimiento', nullable: true })
    fechaNacimiento: string

    @Column({ name: 'estado_civil', nullable: true })
    estadoCivil: string

    @Column({ nullable: true })
    foto: string

    @Column({ default: 'M' })
    sexo: string

    @Column({ default: 'WEB' })
    origen: string

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

    @OneToMany(() => Certificado, (certificado) => certificado.persona, {
        cascade: true
    })
    certificados: Certificado[]
}