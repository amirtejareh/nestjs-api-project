import { PartialType } from "@nestjs/swagger";
import { CreateStandardDto } from "./create-standard.dto";
import { GradeLevel } from "../../../../content-management/grade-level/entities/grade-level.entity";
import { Chapter } from "../../../../content-management/chapter/entities/chapter.entity";
import { Book } from "../../../../content-management/book/entities/book.entity";
import { TermOfStudy } from "../../../../content-management/term-of-study/entities/term-of-study.entity";

export class UpdateStandardDto extends PartialType(CreateStandardDto) {
  readonly _id?: string;
  readonly gradeLevel?: GradeLevel;
  readonly book?: Book;
  readonly chapters?: string[];
  readonly chapterTerm?: Chapter | TermOfStudy;
  readonly correctAnswer: number;
  readonly examNumber: number;
  readonly questionNumber: number;
  readonly examType: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}