import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class InstallmentAbstract {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date')
	date: any;

	@Column({
		type: 'float',
		precision: 14,
		scale: 2,
	})
	price: number;
}
