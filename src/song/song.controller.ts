import { Body, Controller, Delete, Logger, Param, Patch, Post } from '@nestjs/common';
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
}
