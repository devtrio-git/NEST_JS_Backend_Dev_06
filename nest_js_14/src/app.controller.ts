import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('App health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthChecker(): {status:string}  {
    return this.appService.healthChecker();
  }
}
