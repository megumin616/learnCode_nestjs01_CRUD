import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn('increment', { name: 'student_id' })
  student: number;

  @Column({
    name: 'first_name',
    length: 100,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 100,
  })
  lastName: string;

  // Relations
  @ManyToMany(() => CourseEntity, (courses) => courses.studens)
  courses: CourseEntity[];
}
