import { ApiProperty, PartialType } from "@nestjs/swagger";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";
import { CreateKaranbalaDto } from "./create-karanbala.dto";

export class UpdateKaranbalaDto extends PartialType(CreateKaranbalaDto) {
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
