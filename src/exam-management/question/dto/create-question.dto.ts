import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
  @ApiProperty({
    type: [String],
  })
  gradeLevels: string[];

  @ApiProperty({ type: [String] })
  books: string[];

  @ApiProperty({ type: [String] })
  chapters: string[];

  @ApiProperty({ type: [String] })
  sections: string[];

  @ApiProperty({ type: [String] })
  subjects: string[];

  @ApiProperty({ enum: ["easy", "average", "hard"] })
  questionDifficulty: string;

  @ApiProperty({
    enum: [
      "conceptional",
      "computational",
      "trick",
      "memorizational",
      "challenging",
    ],
  })
  questionType: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  correctAnswer: number;

  @ApiProperty()
  number: number;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}