import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";

export type ComprehensiveTestDocument = ComprehensiveTest & Document;

@Schema({ timestamps: true })
export class ComprehensiveTest {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
  })
  gradeLevel: GradeLevel;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
  })
  book: Book;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: Chapter.name }],
  })
  chapter: Chapter;

  @Prop({
    required: true,
    default: false,
  })
  isPublished: boolean;
}

export const ComprehensiveTestSchema =
  SchemaFactory.createForClass(ComprehensiveTest);
