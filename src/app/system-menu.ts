export interface SystemMenu {
    id: number,
    name: string,
    title: string,
    path: string,
    order: number,
    disabled: boolean,
    icon: string,
    children: SystemMenu[]
}