import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './DTO/Add-cv.dto';
import { UpdateCvDto } from './DTO/Update-cv.dto';
import { JwtStrategy } from '../user/Strategy/passport.jwt.strategy';
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';
@Controller('cv')
export class CvController {
  constructor(private cvService: CvService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllcvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }
  @Post()
  async addCv(@Body() addCvDto: AddCvDto): Promise<CvEntity> {
    return this.cvService.addCv(addCvDto);
  }
  @Patch()
  async updateCv2(@Body() updateObject) {
    const { updateCriteria, updateCvDto } = updateObject;
    return this.cvService.updateCv2(updateCriteria, updateCvDto);
  }
  @Get('stats/:max/:min')
  async statcvnumberbyage(
    @Param('max', ParseIntPipe) max,
    @Param('min', ParseIntPipe) min,
  ) {
    return await this.cvService.statcvNumberByAge(max, min);
  }
  @Delete(':id')
  async deletecv(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.deletecv(id);
  }
  @Get(':id')
  async getcvs(@Param('id', ParseIntPipe) id): Promise<CvEntity> {
    return await this.cvService.findcv(id);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateCvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return this.cvService.updateCv(id, updateCvDto);
  }
}
