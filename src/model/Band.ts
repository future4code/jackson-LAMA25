export class Band {
    private id: string
    private name: string
    private music_genre: string
    private responsible: string

    constructor(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ) {
        this.id = id
        this.name = name
        this.music_genre = music_genre
        this.responsible = responsible
    }
} 

export interface InputBandDTO {
    name: string,
    music_genre: string,
    responsible: string
}