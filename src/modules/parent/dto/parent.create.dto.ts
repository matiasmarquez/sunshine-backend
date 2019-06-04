import { ParentCreateInput } from 'graphql.schema';
import { Student } from 'modules/student/student.entity';

export class ParentCreateDTO extends ParentCreateInput {
	student?: Student;
}
