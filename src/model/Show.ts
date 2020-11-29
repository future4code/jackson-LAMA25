export class Show {
    private id: string
    private week_day: string
    private start_time: number
    private end_time: number
    private band_id: string

    constructor (
        id: string,
        week_day: string,
        start_time: number,
        end_time: number,
        band_id: string
    )  {
        this.id = id
        this.start_time = start_time
        this.end_time = end_time
        this.band_id = band_id

        if(
            week_day.toLowerCase() === "sexta" ||
            week_day.toLowerCase() === "sábado" ||
            week_day.toLowerCase() === "domingo"
        ){
            this.week_day = week_day
        } else {
            throw new Error("Please enter a valid day. Valid days are SEXTA, SÁBADO or DOMINGO.")
        }
    }

}