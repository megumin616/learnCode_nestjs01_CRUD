import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>,
  ) {}

  async getProfessorAll(limit: number): Promise<ProfessorEntity[]> {
    // const professorDataAll = await this.professorRepository.find(); // ใช้ตัวอย่างแบบง่ายก่อน จากนั้นค่อย query แบบมี limit (กรณีข้อมูลเยอะ)
    const professorDataAll = await this.professorRepository.find({
      take: limit,
    });
    // const professorDataAll = await this.professorRepository
    // .createQueryBuilder("professor")
    // .limit(2)
    // .getMany();

    return professorDataAll;
  }

  async getProfessorById(id: number): Promise<ProfessorEntity> {
    const getProfessorIdResult = await this.professorRepository.findOneBy({
      professorId: id,
    });

    if (!getProfessorIdResult) {
      throw new NotFoundException({
        message: 'Professor not found',
      });
    }

    return getProfessorIdResult;
  }

  async createProfessor(
    createProfessorDto: CreateProfessorDto,
  ): Promise<ProfessorEntity> {
    const exitsData = await this.professorRepository.findOne({
      where: {
        professorName: createProfessorDto.professorName,
      },
    });
    if (exitsData) {
      throw new BadRequestException({
        message: `${createProfessorDto.professorName} has exists`,
      });
    }
    const createProfessor = this.professorRepository.create(createProfessorDto);

    const createProfessorResult =
      await this.professorRepository.save(createProfessor);

    return createProfessorResult;
  }

  async updateProfessor(
    id: number,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<ProfessorEntity> {
    const existsProfessor = await this.professorRepository.findOne({
      where: { professorId: id },
    });

    if (!existsProfessor) {
      throw new NotFoundException('Professor not found');
    }

    // หา professor ที่มีชื่อซ้ำ (โดยไม่สน id ก่อน)
    const professorWithSameName = await this.professorRepository.findOne({
      where: { professorName: updateProfessorDto.professorName },
    });

    // เช็คว่าชื่อซ้ำกับคนอื่นไหม (ไม่ใช่ตัวเอง)
    //  && professorWithSameName.professorId !== id   # ตรงนี้จะเป็นเช็คอีกทีด้วยว่า ไอดีต้องไม่เท่ากับไอดีที่กำลังจะแก้ไขด้วย ถ้าไม่มี เท่ากับว่าสามารถแก้ได้
    if (professorWithSameName && professorWithSameName.professorId !== id) {
      throw new BadRequestException({
        message: 'This name already exists.',
      });
    }

    const mergeData = this.professorRepository.merge(
      existsProfessor,
      updateProfessorDto,
    );
    const saveData = await this.professorRepository.save(mergeData);

    return saveData;
  }

  async deleteProfessor(id: number): Promise<{ message: string }> {
    const getProfessor = this.professorRepository.findOneBy({
      professorId: id,
    });

    if (!getProfessor) {
      throw new NotFoundException({
        message: 'Professor not found',
      });
    }

    const deleteProfessorResult = await this.professorRepository.delete(id);

    if (deleteProfessorResult.affected === 0) {
      throw new BadRequestException({
        message: 'Deleted is fail',
      });
    }

    // ไปเพิ่ม onDelete: 'CASCADE', ที่ Entity ด้วย 
    // เพราะการลบ Professor จะต้องต้องการให้ลบข้อมูลที่มีความสัมพันธ์ (relation) กันในตารางอื่นด้วย เช่น Course

    return { message: 'Delete is successfully.' };
  }
}
