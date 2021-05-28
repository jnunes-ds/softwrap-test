export interface ButtonColorsProps{
    bgNormal?: string;
    borderNormal?: string;
    textColorNormal?: string;
    bgHover?: string;
    borderHover?: string;
    textColorHover?: string;
}
export interface ButtonProps{
    name: string;
    onClick?: VoidFunction;
    color?: ButtonColorsProps;
}


