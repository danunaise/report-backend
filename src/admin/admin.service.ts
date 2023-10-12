import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  createUser(createAdminDto: CreateAdminDto) {
    const { firstName, lastName, department, role, email, username, password } =
      createAdminDto;
    const addUser = this.prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        department,
        role: 'user',
        username,
        password,
      },
    });

    if (!addUser) {
      throw new HttpException('User not created', 400);
    }
    if (username) {
      throw new HttpException('Username already exists', 400);
    }
    return addUser;
  }

  findAll() {
    const users = this.prisma.users.findMany({});
    if (!users) {
      throw new HttpException('Users not found', 404);
    }
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
