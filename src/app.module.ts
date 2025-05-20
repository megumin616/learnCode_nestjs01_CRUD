import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from './api/professor/professor.module';
import { CoursesModule } from './api/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'learn_nestjs_01',
      entities: ["dist/**/*.entity.js"],
      /*ที่ใช้ dist/  แทน src/  เพราะตอน build TypeScript (.ts) เป็น JavaScript (.js)
         NestJS จะคอมไพล์ไฟล์ทั้งหมดจาก src/ ไปไว้ในโฟลเดอร์ dist/ โดยอัตโนมัติ */
      synchronize: false, 
  }), ProfessorModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
