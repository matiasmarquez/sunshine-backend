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

@Controller('api/student')
export class StudentController {
	private logger = new Logger('StudentController');

	constructor(private studentService: StudentService) {}

	@Get()
	showAllStudents() {
		return this.service.showAll();
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createStudent(@Body() data: StudentDTO) {
		this.logger.log(JSON.stringify(data));
		return this.service.create(data);
	}

	@Get(':id')
	readStudent(@Param('id') id: string) {
		return this.service.read(id);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	updateStudent(@Param('id') id: string, @Body() data: Partial<StudentDTO>) {
		this.logger.log(JSON.stringify(data));
		return this.service.update(id, data);
	}

	@Delete(':id')
	destroyStudent(@Param('id') id: string) {
		return this.service.destroy(id);
	}

	private get service(): StudentService {
		return this.studentService;
	}
}
