import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface SafeUser {
  id: string; name: string; email: string; role: 'talent' | 'seeker';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private toSafeUser(user: { id: string; name: string; email: string; role: string }): SafeUser {
    return { id: user.id, name: user.name, email: user.email, role: user.role as SafeUser['role'] };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new UnauthorizedException('Unable to create account with these details');

    const password = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        email,
        password,
        mobile: dto.phone?.trim() || null,
        region: dto.city?.trim() || null,
        role: dto.role,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return { user: this.toSafeUser(user), accessToken: this.jwt.sign({ sub: user.id, email: user.email, role: user.role }) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.trim().toLowerCase() } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { user: this.toSafeUser(user), accessToken: this.jwt.sign({ sub: user.id, email: user.email, role: user.role }) };
  }
}
