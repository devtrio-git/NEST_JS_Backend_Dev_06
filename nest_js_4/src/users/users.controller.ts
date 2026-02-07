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
  ValidationPipe, DefaultValuePipe
} from "@nestjs/common";
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UsersService } from "./providers/users.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

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
    return 'Create User';
  }
  @Patch()
  updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'Update User';
  }

  @Get('/:id?')
  @ApiOperation({summary: "Fetch a registered user by id"})
  @ApiResponse({
    status: 200,
    description: 'Fetch user successfully',
  })
  @ApiQuery({
    name: 'size',
    type:'number',
    description: "Fetch no of users as per size",
    required: false,
    example: 10
  })
  @ApiQuery({
    name: 'page',
    type:'number',
    description: "The position of the page number that you want to return API",
    required: false,
    example: 1
  })
  getAllUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size:number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number,
    ) {
    return this.userService.findAll(getUserParamDto, size, page);
  }

}
