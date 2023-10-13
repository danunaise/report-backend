import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(createAdminDto: CreateAdminDto) {
    const { firstName, lastName, department, role, email, username, password } =
      createAdminDto;
    const hashedPassword = await this.hashPassword(password);
    const addUser = this.prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        department,
        role: 'user',
        username,
        password: hashedPassword,
      },
    });

    if (!addUser) {
      throw new HttpException('User not created', 400);
    }
    const user = await this.prisma.users.findUnique({
      where: { username },
    });
    if (user.username === username) {
      throw new HttpException('Username already exists', 400);
    }
    if (user.email === email) {
      throw new HttpException('Email already exists', 400);
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
