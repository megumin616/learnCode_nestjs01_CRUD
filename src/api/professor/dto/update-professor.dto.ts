import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfessorDto {
  @IsNotEmpty()
  @IsString()
  professorName: string;

  //   @IsOptional()
  //   @IsNumber()
  //   professorAge: string;
}
