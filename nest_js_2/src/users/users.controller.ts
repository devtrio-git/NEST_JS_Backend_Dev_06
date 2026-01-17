import {Body, Controller, Get, Param, ParseIntPipe,Patch, Post, Query, Headers, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {PatchUserDto} from "./dtos/patch-user.dto";
import {GetUserParamDto} from "./dtos/get-user-param.dto";

@Controller('users')
export class UsersController {
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
            createUser(@Body() createUserDto:CreateUserDto) {
                 console.log(createUserDto instanceof CreateUserDto);
                 return "Create User";
             }
       @Patch()
            updateUser(@Body() patchUserDto:PatchUserDto) {
                 console.log(patchUserDto);
                 return "Update User";
             }

    @Get('/:id?')
    getUserById(
        @Param() getUserParamDto:GetUserParamDto,
    ): string {
        console.log(getUserParamDto)
        return "Get User By Id with dto";
    }


}
