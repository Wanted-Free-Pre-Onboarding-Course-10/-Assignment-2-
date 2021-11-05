export class Song{
    name: string;
    createdAt: Date;
    updatedAt: Date;

        // == Song 객체 생성 메서드 == //
        public static createSong(name: string){
            const song: Song = new Song();
    
            song.name = name;
            song.createdAt = new Date();
            song.updatedAt = null;
    
            return song;
        }
}