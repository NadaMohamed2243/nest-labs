import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator'
export class CreateEmployeeDto {
  @ApiProperty({
    example: 'nada',
  })
  @IsNotEmpty()
  Name: string;

  @ApiProperty({
    example: '12'
  })
  @IsNotEmpty()
  Age: string;

  @ApiProperty({
    example: 300000,
  })
  @IsNotEmpty()
  Salary: number;
}
