export interface Node {
    id: number;
    value: string;
    children?: Node[];
    deleted?: boolean;
    tempId?: string
}