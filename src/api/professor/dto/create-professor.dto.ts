import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty()
  @IsString()
  professorName: string;
}
