import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReportDto: CreateReportDto) {
    const { roomId, title, description, department } = createReportDto;
    const createReport = this.prisma.report.create({
      data: {
        roomId: roomId,
        title: title,
        description: description,
        status: 'pending',
        department: department,
      },
    });
    return createReport;
  }

  findAll() {
    const reports = this.prisma.report.findMany();
    return reports;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
