import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	UsePipes,
	Logger,
} from '@nestjs/common';

import { StudentDTO } from './student.dto';
import { StudentService } from './student.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('student')
export class StudentController {
	private logger = new Logger('StudentController');

	constructor(private studentService: StudentService) {}

	@Get()
	showAllStudents() {
		const service = this.getStudentService();
		return service.showAll();
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createStudent(@Body() data: StudentDTO) {
		this.logger.log(JSON.stringify(data));
		const service = this.getStudentService();
		return service.create(data);
	}

	@Get(':id')
	readStudent(@Param('id') id: string) {
		const service = this.getStudentService();
		return service.read(id);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	updateStudent(@Param('id') id: string, @Body() data: Partial<StudentDTO>) {
		this.logger.log(JSON.stringify(data));
		const service = this.getStudentService();
		return service.update(id, data);
	}

	@Delete(':id')
	destroyStudent(@Param('id') id: string) {
		const service = this.getStudentService();
		return service.destroy(id);
	}

	public getStudentService() {
		return this.studentService;
	}
}
