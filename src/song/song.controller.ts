import { Body, Controller, Delete, Logger, Param, Patch, Post } from '@nestjs/common';
import { ConnectionDto } from './dto/connection.dto';
import { RequestSongDto } from './dto/req.song.dto';
import { ResponseSongDto } from './dto/res.song.dto';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    private logger = new Logger('SongController')
    
    constructor(
        private songService: SongService
    ){}

    @Post()
    async createSong(@Body() requestSongDto: RequestSongDto) : Promise<ResponseSongDto> {
        return await this.songService.createSong(requestSongDto);
    }

    @Patch('/:id')
    async updateSongById(
        @Param('id') id : string ,
        @Body() requestSongDto: RequestSongDto
        ) : Promise<ResponseSongDto>{
            
        return await this.songService.updateSongById(id, requestSongDto);
    }

    @Delete("/:id")
    async deleteMusician(
        @Param('id') id : string ,
    ): Promise<string>{
        return await this.songService.deleteSong(id);
    }

    @Post('/connect/album')
    async connectToAlbum(
        @Body() connectionDto: ConnectionDto
    ){
        return await this.songService.connect(connectionDto, 'Album', 'BELONG');
    }

    @Post('/disconnect/album')
    async disconnectToAlbum(
        @Body() connectionDto: ConnectionDto
    ){
        return await this.songService.disconnect(connectionDto, 'Album', 'BELONG');
    }

    @Post('/connect/musician')
    async connectToMusician(
        @Body() connectionDto: ConnectionDto
    ){
        return await this.songService.connect(connectionDto, 'Musician', 'BE_CREATED');
    }

    @Post('/disconnect/musician')
    async disconnectToMusician(
        @Body() connectionDto: ConnectionDto
    ){
        return await this.songService.disconnect(connectionDto, 'Musician', 'BE_CREATED');
    }
}
