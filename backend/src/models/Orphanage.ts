import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';


@Entity('orphanages')
export default class Orphanages {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  phone: string;

  @Column()
  whatsapp: string;

  @Column()
  email: string;

  @Column()
  facebook: string;

  @Column()
  instagram: string;

  @Column()
  address: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  uf: string;

  @Column()
  zip_code: string;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}
