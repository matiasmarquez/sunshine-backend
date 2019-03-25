/* tslint:disable */
export abstract class CourseCategoryCreateInput {
    name: string;
    description?: string;
    color: string;
}

export abstract class CourseCategoryUpdateInput {
    name?: string;
    description?: string;
    color?: string;
}

export abstract class CourseCreateInput {
    name: string;
    categoryId: string;
    installments?: CourseInstallmentCreateInput[];
    briefDescription?: string;
    description?: string;
    duration: string;
    schedule: string;
    price: number;
}

export abstract class CourseInstallmentCreateInput {
    id?: string;
    number: number;
    price: number;
}

export abstract class CourseUpdateInput {
    name?: string;
    categoryId?: string;
    installments?: CourseInstallmentCreateInput[];
    briefDescription?: string;
    description?: string;
    duration?: string;
    schedule?: string;
    price?: number;
}

export abstract class InscriptionCreateInput {
    courseId: string;
    studentId: string;
}

export abstract class InscriptionInstallmentCreateInput {
    number: number;
    price: number;
}

export abstract class InscriptionInstallmentUpdateInput {
    number: number;
    price: number;
    paid?: boolean;
}

export abstract class InscriptionUpdateInput {
    price?: number;
    installments?: InscriptionInstallmentCreateInput[];
}

export abstract class StaffCategoryCreateInput {
    name: string;
    description?: string;
}

export abstract class StaffCategoryUpdateInput {
    name?: string;
    description?: string;
}

export abstract class StaffPersonCreateInput {
    name: string;
    lastName: string;
    address?: string;
    phone?: string;
    email?: string;
    categoryId: string;
    coursesIds?: string[];
}

export abstract class StaffPersonUpdateInput {
    name?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
    categoryId?: string;
    coursesIds?: string[];
}

export abstract class StudentCreateInput {
    name: string;
    lastName: string;
    address: string;
    phone?: string;
    email?: string;
}

export abstract class StudentUpdateInput {
    name?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export abstract class StudentWhereInput {
    name?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export abstract class Course {
    id: string;
    name: string;
    category: CourseCategory;
    installments?: CourseInstallment[];
    staff?: StaffPerson[];
    briefDescription?: string;
    description?: string;
    duration: string;
    schedule: string;
    price: number;
    created?: Date;
}

export abstract class CourseCategory {
    id: string;
    courses?: Course[];
    name: string;
    description?: string;
    color: string;
    created?: Date;
}

export abstract class CourseInstallment {
    id: string;
    number: number;
    price: number;
    course: Course;
}

export abstract class Inscription {
    id: string;
    course: Course;
    installments?: InscriptionInstallment[];
    payStates?: InscriptionPayState[];
    student: Student;
    price?: number;
    state: string;
    currentPayState: string;
}

export abstract class InscriptionInstallment {
    id: string;
    number: number;
    price: number;
    paid?: boolean;
    inscription: Inscription;
}

export abstract class InscriptionPayState {
    id: string;
    inscription: Inscription;
    installment?: InscriptionInstallment;
    state: string;
    fullPayment: boolean;
}

export abstract class IMutation {
    abstract createCourse(data: CourseCreateInput): Course | Promise<Course>;

    abstract updateCourse(id: string, data: CourseUpdateInput): Course | Promise<Course>;

    abstract deleteCourse(id: string): Course | Promise<Course>;

    abstract createStudent(data: StudentCreateInput): Student | Promise<Student>;

    abstract updateStudent(id: string, data: StudentUpdateInput): Student | Promise<Student>;

    abstract deleteStudent(id: string): Student | Promise<Student>;

    abstract createCourseCategory(data?: CourseCategoryCreateInput): CourseCategory | Promise<CourseCategory>;

    abstract updateCourseCategory(id: string, data?: CourseCategoryUpdateInput): CourseCategory | Promise<CourseCategory>;

    abstract deleteCourseCategory(id: string): CourseCategory | Promise<CourseCategory>;

    abstract createInscription(data: InscriptionCreateInput): Inscription | Promise<Inscription>;

    abstract updateInscription(id: string, data: InscriptionUpdateInput): Inscription | Promise<Inscription>;

    abstract deleteInscription(id: string): Inscription | Promise<Inscription>;

    abstract createStaffCategory(data: StaffCategoryCreateInput): StaffCategory | Promise<StaffCategory>;

    abstract updateStaffCategory(id: string, data: StaffCategoryUpdateInput): StaffCategory | Promise<StaffCategory>;

    abstract deleteStaffCategory(id: string): StaffCategory | Promise<StaffCategory>;

    abstract createStaffPerson(data: StaffPersonCreateInput): StaffPerson | Promise<StaffPerson>;

    abstract updateStaffPerson(id: string, data: StaffPersonUpdateInput): StaffPerson | Promise<StaffPerson>;

    abstract deleteStaffPerson(id: string): StaffPerson | Promise<StaffPerson>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract course(id: string): Course | Promise<Course>;

    abstract students(where?: StudentWhereInput): Student[] | Promise<Student[]>;

    abstract student(id: string): Student | Promise<Student>;

    abstract courseCategories(): CourseCategory[] | Promise<CourseCategory[]>;

    abstract courseCategory(id: string): CourseCategory | Promise<CourseCategory>;

    abstract courseCategoryColors(): string[] | Promise<string[]>;

    abstract inscriptions(): Inscription[] | Promise<Inscription[]>;

    abstract inscription(id: string): Inscription | Promise<Inscription>;

    abstract staffCategories(): StaffCategory[] | Promise<StaffCategory[]>;

    abstract staffCategory(id: string): StaffCategory | Promise<StaffCategory>;

    abstract staffPeople(): StaffPerson[] | Promise<StaffPerson[]>;

    abstract staffPerson(id?: string): StaffPerson | Promise<StaffPerson>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class StaffCategory {
    id: string;
    name: string;
    description?: string;
}

export abstract class StaffPerson {
    id: string;
    name: string;
    lastName: string;
    address?: string;
    phone?: string;
    email?: string;
    category: StaffCategory;
    courses?: Course[];
}

export abstract class Student {
    id: string;
    name: string;
    lastName: string;
    address: string;
    phone?: string;
    email?: string;
    created: Date;
    updated?: Date;
}

export abstract class User {
    id: string;
    username: string;
}

export type Date = any;
