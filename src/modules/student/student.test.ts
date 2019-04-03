import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'app.module';

describe('🤓 Student Module', () => {
	let app: INestApplication;
	let studentId: '';
	let studentCreatedId: '';

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	describe('🚀 Queries', () => {
		test(`students`, done => {
			request(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `
					{
						students {
							id
							name
						}
					}`,
				})
				.then(res => {
					expect(res.status).toBe(200);
					const students = res.body.data.students;
					studentId = students[0].id;
					expect(students).toEqual(
						expect.arrayContaining([
							expect.objectContaining({
								id: expect.anything(),
							}),
						]),
					);
					done();
				});
		});

		test(`student`, done => {
			request(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `
					{
						student(id: "${studentId}") {
							id
						}
					}`,
				})
				.then(res => {
					expect(res.status).toBe(200);
					const student = res.body.data.student;
					expect(student).toEqual(
						expect.objectContaining({
							id: expect.anything(),
						}),
					);
					done();
				});
		});
	});

	describe('🚀 Mutations', () => {
		test(`createStudent`, done => {
			request(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `
					mutation { 
						createStudent(data: {name: "Test", lastName: "Test"}) {
						  id
						  name
						}
					  }`,
				})
				.then(res => {
					expect(res.status).toBe(200);
					const student = res.body.data.createStudent;
					studentCreatedId = student.id;
					expect(student).toEqual(
						expect.objectContaining({
							id: expect.anything(),
						}),
					);
					done();
				});
		});

		test(`updateStudent`, done => {
			request(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `
					mutation { 
						updateStudent(id: "${studentCreatedId}", data: {name: "Testx"}) {
						  id
						  name
						}
					  }`,
				})
				.then(res => {
					expect(res.status).toBe(200);
					const student = res.body.data.updateStudent;
					expect(student).toEqual(
						expect.objectContaining({
							id: expect.anything(),
						}),
					);
					done();
				});
		});

		test(`updateStudent`, done => {
			request(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `
					mutation { 
						deleteStudent(id: "${studentCreatedId}") {
						  id
						  name
						}
					  }`,
				})
				.then(res => {
					expect(res.status).toBe(200);
					const student = res.body.data.deleteStudent;
					expect(student).toEqual(
						expect.objectContaining({
							id: expect.anything(),
						}),
					);
					done();
				});
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
