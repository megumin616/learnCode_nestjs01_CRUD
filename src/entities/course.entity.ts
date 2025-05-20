import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfessorEntity } from './professor.entity';
import { LessonEntity } from './lesson.entity';
import { StudentEntity } from './student.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'course_id' })
  courseId: number;

  @Column({
    name: 'course_name',
    length: 100,
  })
  courseName: string;

  // Relations
  @ManyToOne(() => ProfessorEntity, (professor) => professor.courses)
  @JoinColumn({ name: 'professor_id' })
  professor: ProfessorEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  lessons: LessonEntity[];

  @ManyToMany(() => StudentEntity, (studen) => studen.courses)
  @JoinTable({ name: 'courses_and_students' })
  studens: StudentEntity[];
}
