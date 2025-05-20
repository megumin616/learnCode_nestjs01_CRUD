import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('professor')
export class ProfessorEntity {
  @PrimaryGeneratedColumn('increment', { name: 'professor_id' })
  professorId: number;

  @Column({
    name: 'professor_name',
    length: 100,
  })
  professorName: string;

  // Relations
  @OneToMany(() => CourseEntity, (course) => course.professor, {
    onDelete: "CASCADE",  // เพิ่มในภายหลังหลังจากทำส่วน delete **ช่วงคลิปสอน
  })
  courses: CourseEntity[];
}
