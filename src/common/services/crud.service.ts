import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class CrudOperations {
	protected repository: Repository<any>;

	constructor(repository: Repository<any>) {
		this.repository = repository;
	}

	async findAll(relations: string[] = [], order: object = {}): Promise<any[]> {
		return await this.repository.find({ relations, order });
	}

	async findAllBy(criteria: FindManyOptions<any>) {
		return await this.repository.find(criteria);
	}

	async findOneById(id: string, relations: string[] = []): Promise<any> {
		const entity = await this.repository.findOne({ where: { id }, relations });
		if (!entity) {
			throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
		}
		return entity;
	}

	async findOneBy(criteria: FindOneOptions<any>) {
		const entity = await this.repository.findOne(criteria);
		return entity;
	}

	async create(data: any): Promise<any> {
		const entity = await this.repository.create(data);
		await this.repository.save(entity);
		return entity;
	}

	async update(id: string, data: any): Promise<any> {
		const toUpdate = await this.findOneById(id);
		const updated = Object.assign(toUpdate, data);
		const entity = await this.repository.save(updated);
		return entity;
	}

	async delete(id: string): Promise<any> {
		const entity = await this.findOneById(id);
		await this.repository.delete(id);
		return entity;
	}
}
