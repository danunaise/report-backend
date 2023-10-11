import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateReportDto {
  @IsNotEmpty({ message: 'กรุณากรอกหมายเลขห้อง' })
  roomId: number;
  @IsNotEmpty({ message: 'กรุณากรอกชื่ออุปกรณ์ที่มีปัญหา' })
  title: string;
  @IsNotEmpty({ message: 'กรุณาอธิบายปัญหาที่เกิดขึ้น' })
  description: string;
  @IsNotEmpty({ message: 'กรุณาระบุแผนก' })
  department: string;
}
