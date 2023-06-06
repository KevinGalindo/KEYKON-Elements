export interface ICategorie{
    id: number,
    date: string,
    name: string,
    desc: string,
    color: string,
    num_elements: number
}

export interface ICategorieForm{
    name: string,
    color: string,
    desc: string
}