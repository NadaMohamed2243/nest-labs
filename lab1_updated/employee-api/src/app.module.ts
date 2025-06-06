import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [EmployeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
