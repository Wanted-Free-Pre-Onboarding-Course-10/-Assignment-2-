import { Gender } from "./gender.enum";

export class Musician {
    name: string;
    age: number;
    gender: Gender;
    createdAt: Date;
    updatedAt: Date;

    // == Musician 생성 메서드 == //
    public static createMusician(name: string, age: number, gender: Gender) {
        const musician: Musician = new Musician();

        musician.name = name;
        musician.age = age;
        musician.gender = gender;
        musician.createdAt = new Date();
        musician.updatedAt = null;

        return musician;
    }
}