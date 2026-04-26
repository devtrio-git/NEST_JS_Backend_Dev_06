import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Headers,
  ValidationPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UserService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // getHello(): string {
  //     return "Get all users!";
  // }

  // @Get('/:id?')
  // getUserById(@Param() param:any, @Query() query:any): string {
  //     console.log(param, query)
  //     return "Get User By Id";
  // }

  // @Get('/:id/:opt')
  // getUserById(): string {
  //     return "Get User By Id & Opt";
  // }

  // @Get('/:id?')
  //    getUserById(@Param("id") id:number, @Query('size') size:number): string {
  //        console.log(typeof id, typeof size)
  //        return "Get User By Id";
  //    }

  // @Get('/:id')
  //    getUserById(
  //        @Param("id", ParseIntPipe) id:number,
  //        @Query('size', ParseIntPipe) size:number
  // ): string {
  //        console.log(typeof id, typeof size)
  //        return "Get User By Id";
  // }

  //  @Post()
  // createUser(@Body() body:any, @Headers() header:any) {
  //      console.log(body, header)
  //      return "Create User";
  //  }

  // @Post()
  //   createUser(@Body(new ValidationPipe()) createUserDto:CreateUserDto) {
  //        console.log(createUserDto);
  //        return "Create User";
  //    }
  //
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  createManyUser(@Body() createUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createUsersDto);
  }
  @Patch()
  updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'Update User';
  }

  //  new class service se...................................................

  @Get('/:id?')
  @ApiOperation({ summary: 'Fetch a registered user by id' })
  @ApiResponse({
    status: 200,
    description: "Users fetched successfully",
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    description: 'No of users as per size',
    required: false,
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'The position of the page number that you want to return API',
    required: false,
    example: '1',
  })
  getUserById(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): any {
    return this.userService.getAllUser(getUserParamDto, size, page);
  }
}
