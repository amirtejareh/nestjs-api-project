import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { CreateSampleExampleQuestionsDto } from "./create-sample-example-question.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";
export class UpdateSampleExampleQuestionsDto extends PartialType(
  CreateSampleExampleQuestionsDto
) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly chapter?: Chapter;
  readonly section?: Section;
  readonly subject?: Subject;
  readonly videos?: IVideo[];
  @ApiProperty({ type: "string", format: "binary" })
  public pdfFiles?: { title: string; link: string }[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
