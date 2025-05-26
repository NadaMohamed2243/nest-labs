import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto';

@Injectable()
export class EmployeesService {
  private Data = [
    { id: 1, Name: 'nada', Age: '23', Salary: 20000 },
    { id: 2, Name: 'nada2', Age: '23', Salary: 60000 },
    { id: 3, Name: 'nada3', Age: '23', Salary: 200000 },
  ];

  getAllEmployees() {
    return this.Data;
  }
  
  getEmployeeById(id: number) {
    const emp = this.Data.find((emp) => emp.id === id);
    if (!emp) {
      throw new NotFoundException(`student ${id} not exist`);
    }
    return emp;
  }

  addOneEmployee(data: CreateEmployeeDto) {
    const newId = this.Data[this.Data.length - 1].id +1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEmp = {
      id: newId,
      ...data,
    }
    this.Data.push(newEmp);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newEmp;
  }


  updateEmployee(id: number, data: CreateEmployeeDto) {
    const index = this.Data.findIndex((emp) => emp.id === id); // Fix here
    if (index === -1) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
  }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.Data[index] = { ...this.Data[index], ...data };
    return this.Data[index];
}

  deleteEmployee(id: number) {
    const index = this.Data.findIndex((emp) => emp.id === id); // Fix here
    if (index === -1) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
  }
    const deleted = this.Data[index];
    this.Data.splice(index, 1);
    return deleted;
}

  getHighestPaidEmployee() {
    if (this.Data.length === 0) {
      throw new NotFoundException('No employees found');
    }
    return this.Data.reduce((highest, current) =>
      current.Salary > highest.Salary ? current : highest
    );
  }
}
