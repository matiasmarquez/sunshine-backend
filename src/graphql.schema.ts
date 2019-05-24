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
    description?: string;
    duration: string;
    schedule: string;
    price: number;
}

export abstract class CourseInstallmentCreateInput {
    id?: string;
    date: Date;
    price: number;
}

export abstract class CourseUpdateInput {
    name?: string;
    categoryId?: string;
    installments?: CourseInstallmentCreateInput[];
    description?: string;
    duration?: string;
    schedule?: string;
    price?: number;
}

export abstract class InscriptionCreateInput {
    courseId: string;
    studentId: string;
    installments?: InscriptionInstallmentCreateInput[];
    price?: number;
}

export abstract class InscriptionInstallmentCreateInput {
    date: Date;
    price: number;
    paid?: boolean;
    comment?: string;
}

export abstract class InscriptionInstallmentUpdateInput {
    date: Date;
    price: number;
    paid?: boolean;
    comment?: string;
}

export abstract class InscriptionUpdateInput {
    courseId: string;
    studentId: string;
    installments?: InscriptionInstallmentCreateInput[];
    price?: number;
}

export abstract class ParentCreateInput {
    id?: string;
    name: string;
    lastName: string;
    type: number;
    phone: string;
    comment?: string;
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
    parents?: ParentCreateInput[];
    lastName: string;
    address: string;
    phone?: string;
    email?: string;
    school?: string;
    degree?: string;
}

export abstract class StudentUpdateInput {
    name?: string;
    parents?: ParentCreateInput[];
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
    school?: string;
    degree?: string;
}

export abstract class UserCreateInput {
    name: string;
    lastName: string;
    username: string;
    password: string;
}

export abstract class UserUpdateInput {
    name?: string;
    lastName?: string;
    username?: string;
    password?: string;
}

export abstract class Auth {
    username: string;
    token: string;
}

export abstract class Course {
    id: string;
    name: string;
    category: CourseCategory;
    installments?: CourseInstallment[];
    staff?: StaffPerson[];
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
    date: Date;
    price: number;
    course: Course;
}

export abstract class Inscription {
    id: string;
    course: Course;
    installments?: InscriptionInstallment[];
    student: Student;
    price?: number;
    state: string;
    hasInstallmentsNotPayed?: boolean;
    created?: Date;
}

export abstract class InscriptionInstallment {
    id: string;
    date: Date;
    price: number;
    paid?: boolean;
    comment?: string;
    inscription: Inscription;
}

export abstract class IMutation {
    abstract login(username: string, password: string): Auth | Promise<Auth>;

    abstract createStudent(data: StudentCreateInput): Student | Promise<Student>;

    abstract updateStudent(id: string, data: StudentUpdateInput): Student | Promise<Student>;

    abstract deleteStudent(id: string): Student | Promise<Student>;

    abstract createUser(data: UserCreateInput): User | Promise<User>;

    abstract updateUser(id: string, data: UserUpdateInput): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract createCourseCategory(data?: CourseCategoryCreateInput): CourseCategory | Promise<CourseCategory>;

    abstract updateCourseCategory(id: string, data?: CourseCategoryUpdateInput): CourseCategory | Promise<CourseCategory>;

    abstract deleteCourseCategory(id: string): CourseCategory | Promise<CourseCategory>;

    abstract createCourse(data: CourseCreateInput): Course | Promise<Course>;

    abstract updateCourse(id: string, data: CourseUpdateInput): Course | Promise<Course>;

    abstract deleteCourse(id: string): Course | Promise<Course>;

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

export abstract class Parent {
    id: string;
    student: Student;
    name: string;
    lastName: string;
    type: number;
    phone: string;
    comment?: string;
}

export abstract class ParentType {
    id: number;
    type: string;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract students(): Student[] | Promise<Student[]>;

    abstract student(id: string): Student | Promise<Student>;

    abstract countStudents(): number | Promise<number>;

    abstract parents(): Parent[] | Promise<Parent[]>;

    abstract parent(id: string): Parent | Promise<Parent>;

    abstract parentTypes(): ParentType[] | Promise<ParentType[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract courseCategories(): CourseCategory[] | Promise<CourseCategory[]>;

    abstract courseCategory(id: string): CourseCategory | Promise<CourseCategory>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract course(id: string): Course | Promise<Course>;

    abstract countCourses(): number | Promise<number>;

    abstract inscriptions(): Inscription[] | Promise<Inscription[]>;

    abstract inscriptionsNotPayed(): Inscription[] | Promise<Inscription[]>;

    abstract inscriptionsOfThisYear(): Inscription[] | Promise<Inscription[]>;

    abstract inscription(id: string): Inscription | Promise<Inscription>;

    abstract countInscriptions(): number | Promise<number>;

    abstract staffCategories(): StaffCategory[] | Promise<StaffCategory[]>;

    abstract staffCategory(id: string): StaffCategory | Promise<StaffCategory>;

    abstract staffPeople(): StaffPerson[] | Promise<StaffPerson[]>;

    abstract staffPerson(id: string): StaffPerson | Promise<StaffPerson>;

    abstract countStaffPeople(): number | Promise<number>;

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
    parents?: Parent[];
    name: string;
    lastName: string;
    address: string;
    phone?: string;
    email?: string;
    school?: string;
    degree?: string;
    created: Date;
    updated?: Date;
}

export abstract class User {
    id: string;
    username: string;
    name: string;
    lastName: string;
}

export type Date = any;
