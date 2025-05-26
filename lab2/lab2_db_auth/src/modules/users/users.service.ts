import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // Logic for signing up a user
    const { email, password, fullName, age, mobileNumber, role } = signUpDto;
    let user = await this.model.findOne({ email });
    // check if user already exists
    // if user exists, throw an error
    if (user) {
      throw new ConflictException('User already exists');
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user
    user = await this.model.create({
      email,
      password: hashedPassword,
      fullName,
      age,
      mobileNumber,
      role,
    });

    const response = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      age: user.age,
      mobileNumber: user.mobileNumber,
      role: user.role,
    };
    return response;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    // Logic for signing up a user
    // check if user already exists
    const user = await this.model.findOne({ email });
    // if user doesn't exist, throw an error
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    // compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // if the password is incorrect, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // create token for the user from payload consists of email (unique) (of course not password)
    const payload = { email: user.email, role: user.role };
    const secretKey = this.configService.getOrThrow<string>('JWT_SECRET');
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    // return the response with the token and user data
    const response = {
      token,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  async getProfile(email: string) {
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      email: user.email,
      fullName: user.fullName,
      age: user.age,
      mobileNumber: user.mobileNumber,
      role: user.role,
    };
  }

  async getAllUsers(email: string) {
    if (!email) {
      throw new UnauthorizedException('Only admins can access this route');
    }

    return this.model.find({ email: { $ne: email } }).select('-password');
  }
}
