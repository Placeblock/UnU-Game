export enum Color {
    BLUE = "#2323db",
    RED = "#b02525",
    GREEN = "#32ba4d",
    YELLOW = "#ebeb00"
}

export function getWeight(color: Color): number {
    switch (color) {
        case Color.RED:
            return 0;
        case Color.BLUE:
            return 15;
        case Color.GREEN:
            return 30;
        case Color.YELLOW:
            return 45;
        default:
            return 0;
    }
}