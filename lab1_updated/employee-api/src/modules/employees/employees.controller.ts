import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Request } from 'express';
import { CreateEmployeeDto } from './dto';


@Controller('/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/')
  getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }
  
  @Get('/:id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @Post()
  addOneEmployee(@Body() data: CreateEmployeeDto) {
    return this.employeesService.addOneEmployee(data);
  }

  @Put('/:id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateEmployeeDto,
  ) {
    return this.employeesService.updateEmployee(id, data);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.deleteEmployee(id);
  }

  @Get('/highest-paid/one')
  getHighestPaidEmployee() {
    return this.employeesService.getHighestPaidEmployee();
  }
}