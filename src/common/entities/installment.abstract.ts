import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class InstallmentAbstract {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('int')
	number: number;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;
}
