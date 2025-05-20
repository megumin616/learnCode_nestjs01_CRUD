import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('lesson')
export class LessonEntity {
  @PrimaryGeneratedColumn('increment', { name: 'lesson_id' })
  lessonId: number;

  @Column({
    name: 'lesson_name',
    length: 100,
  })
  lessonName: string;

  // Relatoins
  @ManyToOne(() => CourseEntity, (course) => course.lessons)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
