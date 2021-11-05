import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MusicianDto } from './dto/musician.dto';
import { ResponseMusicianDto } from './dto/res.musician.dto';
import { Musician, MusicianService } from './musician.service';

@Controller('musician')
export class MusicianController {
  constructor(private musicianService: MusicianService) {}

  @Get()
  async getAllMusicians(): Promise<ResponseMusicianDto[]> {
    const greeting = await this.musicianService.getAllMusicians();

    return greeting;
  }

  @Post()
  async createMusician(@Body() musicianDto: MusicianDto): Promise<Musician> {
    return await this.musicianService.createMusician(musicianDto);
  }

  @Patch()
  async updateMusicianAge(@Body() muisicianDto: MusicianDto) {
    return this.musicianService.updateMusicianAge(muisicianDto);
  }

  @Delete()
  async deleteMusician(@Query('name') name: string) {
    return this.musicianService.deleteMusicianByName(name);
  }
}
