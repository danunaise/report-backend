import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private Prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.Prisma.users.findUnique({
      where: { username },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: number) {
    const user = await this.Prisma.users.findUnique({ where: { userId } });

    if (!user) {
      throw new HttpException('ไม่มีผู้ใช้นี้ในระบบ', HttpStatus.BAD_REQUEST);
    }

    const { password, ...userProfile } = user; //ไม่ให้แสดงอะไรบ้างในข้อมูลผู้ใช้
    //userProfile.roles = roles; // Add roles data to userProfile if needed

    return userProfile;
  }
}
