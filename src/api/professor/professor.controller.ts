import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get('all/:limit')
  async getProfessorAll(
    @Param('limit', new ParseIntPipe()) limit: number,
  ): Promise<ProfessorEntity[]> {
    return await this.professorService.getProfessorAll(limit);
  }

  @Get('professorid/:id')
  async getProfessorById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProfessorEntity> {
    const getProfessorIdResult =
      await this.professorService.getProfessorById(id);

    return getProfessorIdResult;
  }

  @Post('create')
  async createProfessor(
    @Body(new ValidationPipe()) createProfessorDto: CreateProfessorDto,
  ): Promise<ProfessorEntity> {
    const createProfessorResult =
      await this.professorService.createProfessor(createProfessorDto);

    return createProfessorResult;
  }

  @Put('update/:id')
  async updateProfessor(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) updateProfessorDto: UpdateProfessorDto,
  ): Promise<ProfessorEntity> {
    const updateProfessorResult = await this.professorService.updateProfessor(
      id,
      updateProfessorDto,
    );

    return updateProfessorResult;
  }

  @Delete("delete/:id")
  async deleteProfessor(
    @Param("id", new ParseIntPipe()) id: number,
  ): Promise<{ message: string }> {
    const deleteProfessorResult = await this.professorService.deleteProfessor(
      id,
    )

    return deleteProfessorResult;
  }
}
