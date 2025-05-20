import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
