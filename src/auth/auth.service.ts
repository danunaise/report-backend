import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private Prisma: PrismaService, private jwtService: JwtService) {}

  async login(username: string, password: string) {
    const user = await this.Prisma.users.findUnique({
      where: { username },
    });
    if (user && user.password === password) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
      return user;
    }
    return null;
  }
}
