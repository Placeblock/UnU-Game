export class Color {
    public static readonly RED = new Color("RED","#b02525", 0);
    public static readonly BLUE = new Color("BLUE","#2323db",15);
    public static readonly GREEN = new Color("GREEN","#32ba4d",30);
    public static readonly YELLOW = new Color("YELLOW","#ebeb00",45);
    public static readonly WHITE = new Color("WHITE","#ffffff", 0);

    private constructor(public readonly variable: string, public readonly colorcode: string, public readonly weight: number) {}

    public static fromString(color: string): Color {
        switch (color) {
            case "RED":
                return Color.RED;
            case "BLUE":
                return Color.BLUE;
            case "GREEN":
                return Color.GREEN;
            case "YELLOW":
                return Color.YELLOW;
            default:
                return Color.RED;
        }
    }
}