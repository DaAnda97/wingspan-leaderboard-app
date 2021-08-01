class Points {
    avg: number;
    max: number;
    min: number;

    constructor(avg: number, max: number, min:number) {
        this.avg = avg;
        this.max = max;
        this.min = min;
    }

    get(attributeName: string): number {
        switch (attributeName) {
            case "avg":
                return this.avg;
            case "max":
                return this.max;
            case "min":
                return this.min;
        }
        return this.avg
    }
}

export default Points;