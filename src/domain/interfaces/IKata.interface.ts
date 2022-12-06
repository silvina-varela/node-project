export enum KataLevel {
    BASIC = 'Basic', 
    MEDIUM = 'Medium', 
    HIGH = 'High'
}

export interface IKata {
    name: string,
    description: string,
    level: KataLevel,
    attempts: number,
    stars: number,
    creator: string, // user ID
    solution: string,
    participants: string[]
}