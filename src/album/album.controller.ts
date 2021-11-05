import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.album.dto';
import { ResponseAlbumDto } from './dto/res.album.dto';
import { UpdateAlbumDto } from './dto/update.album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) { }
  
  @Get()
  async getAllAlbums(): Promise<ResponseAlbumDto[]>{
    const greeting = await this.albumService.getAllAlbums();
    
    return greeting;
  }

  @Post()
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto):
    Promise<ResponseAlbumDto>
    {
      return await this.albumService.createAlbum(createAlbumDto);
  }
  
  @Patch('/:id')
  async updateAlbumById(
    @Param('id') id : string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ): Promise<ResponseAlbumDto>{
    return await this.albumService.updateAlbumById(id, updateAlbumDto)
  }
  
  @Delete('/:id')
  async deleteAlbumById(@Param('id') id: string): Promise<string>{
    return await this.albumService.deleteAlbumById(id);
  }
  }



