import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ConnectionDto } from 'src/song/dto/connection.dto';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.album.dto';
import { ResponseAlbumDto } from './dto/res.album.dto';
import { UpdateAlbumDto } from './dto/update.album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) { }

  @Get()
  async getAllAlbums(): Promise<ResponseAlbumDto[]> {
    const greeting = await this.albumService.getAllAlbums();

    return greeting;
  }

  @Post()
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto):
    Promise<ResponseAlbumDto> {
    console.log("create album")
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Patch('/:id')
  async updateAlbumById(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ): Promise<ResponseAlbumDto> {
    return await this.albumService.updateAlbumById(id, updateAlbumDto)
  }

  @Delete('/:id')
  async deleteAlbumById(@Param('id') id: string): Promise<string> {
    return await this.albumService.deleteAlbumById(id);
  }

  @Post('/connect/song')
  async connectToAlbum(
      @Body() connectionDto: ConnectionDto
  ){
      return await this.albumService.connect(connectionDto, 'Song', 'HAS');
  }

  @Post('/disconnect/song')
  async disconnectToAlbum(
      @Body() connectionDto: ConnectionDto
  ){
      return await this.albumService.disconnect(connectionDto, 'Song', 'HAS');
  }
}



