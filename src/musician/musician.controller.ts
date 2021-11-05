import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { CreateMusicianDto } from './dto/create.musician.dto';
import { ResponseMusicianDto } from './dto/res.musician.dto';
import { UpdateMusicianDto } from './dto/update.musician.dto';
import { MusicianService } from './musician.service';

@Controller('musician')
// @UseFilters(new HttpExceptionFil)
export class MusicianController {
    private logger = new Logger('MusicianController')
    
    constructor(
        private musicianService: MusicianService
    ){}

    @Get()
    async getAllMusicians() : Promise<ResponseMusicianDto[]>{
        const greeting = await this.musicianService.getAllMusicians();
        
        return greeting;
    }

    @Post()
    async createMusician(@Body() createMusicianDto: CreateMusicianDto): Promise<ResponseMusicianDto> {
        return await this.musicianService.createMusician(createMusicianDto);
    }

    @Patch('/:id')
    async updateMusicianById(
        @Param('id') id : string ,
        @Body() updateMusicianDto: UpdateMusicianDto
        ): Promise<ResponseMusicianDto>{
        this.logger.debug(`updateMusician controller dto : ${JSON.stringify(updateMusicianDto)}`)
        return await this.musicianService.updateMusicianById(id, updateMusicianDto)
    }

    @Delete("/:id")
    async deleteMusician(
        @Param('id') id : string ,
    ) : Promise<string>{
        return await this.musicianService.deleteMusician(id);
    }

}
