"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
class Show {
    constructor(id, week_day, start_time, end_time, band_id) {
        this.id = id;
        this.start_time = start_time;
        this.end_time = end_time;
        this.band_id = band_id;
        if (week_day.toLowerCase() === "sexta" ||
            week_day.toLowerCase() === "sábado" ||
            week_day.toLowerCase() === "domingo") {
            this.week_day = week_day;
        }
        else {
            throw new Error("Please enter a valid day. Valid days are SEXTA, SÁBADO or DOMINGO.");
        }
    }
}
exports.Show = Show;
//# sourceMappingURL=Show.js.map