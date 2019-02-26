import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
} from '@nestjs/common';

import { StudentDTO } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Get()
	showAllStudents() {
		const service = this.getStudentService();
		return service.showAll();
	}

	@Post()
	createStudent(@Body() data: StudentDTO) {
		const service = this.getStudentService();
		return service.create(data);
	}

	@Get(':id')
	readStudent(@Param('id') id: string) {
		const service = this.getStudentService();
		return service.read(id);
	}

	@Put(':id')
	updateStudent(@Param('id') id: string, @Body() data: Partial<StudentDTO>) {
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
