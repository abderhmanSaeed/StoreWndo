export interface ColorWithSizes {
    color: color
    sizes: size[]
}


export interface size {
    id: number, 
    name: string, 
    quantity: number,
}


export interface color { 
    id: number,
    name: string,
    hexaCode: string,
    quantity: number, 
}