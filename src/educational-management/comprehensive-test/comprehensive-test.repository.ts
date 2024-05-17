import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { CreateComprehensiveTestDto } from "./dto/create-comprehensive-test.dto";
import { UpdateComprehensiveTestDto } from "./dto/update-comprehensive-test.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ComprehensiveTest } from "./entities/comprehensive-test.entity";
import { Model, Types } from "mongoose";
import { ImageService } from "../../common/services/imageService";

@Injectable()
export class ComprehensiveTestRepository {
  constructor(
    @InjectModel(ComprehensiveTest.name)
    private readonly comprehensiveTestModel: Model<ComprehensiveTest>
  ) {}

  async findOneByTitle(title: string) {
    return this.comprehensiveTestModel.findOne({ title }).exec();
  }

  async create(
    @Res() res,
    createComprehensiveTestDto: CreateComprehensiveTestDto
  ) {
    try {
      const createComprehensiveTest = await this.comprehensiveTestModel.create(
        createComprehensiveTestDto
      );
      return res.status(200).json({
        statusCode: 200,
        message: "یک تست جامع با موفقیت ایجاد شد.",
        data: createComprehensiveTest,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  findAll() {
    return this.comprehensiveTestModel.find({});
  }

  findOne(id: string) {
    return this.comprehensiveTestModel.findOne({ _id: id });
  }

  async findBasedOnSubjects(subjects: string[]) {
    const comprehensiveTests = await this.comprehensiveTestModel.find({
      subject: {
        $in: subjects.map((id: string) => new Types.ObjectId(id)),
      },
    });

    return comprehensiveTests;
  }

  async findBasedOnBooks(books: string[]) {
    const comprehensiveTests = await this.comprehensiveTestModel
      .find({
        book: {
          $in: books.map((id: string) => new Types.ObjectId(id)),
        },
      })
      .populate(["book", "chapter", "section", "subject"]);

    return comprehensiveTests;
  }

  async update(
    @Res() res,
    @Param("id") id: string,
    updateComprehensiveTestDto: UpdateComprehensiveTestDto
  ) {
    try {
      const comprehensiveTest = await this.comprehensiveTestModel.findOne({
        _id: id,
      });

      if (!comprehensiveTest) {
        throw new NotFoundException("تست جامع مورد نظر یافت نشد.");
      }
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async remove(@Res() res, id: string) {
    try {
      const findComprehensiveTest = await this.comprehensiveTestModel.findOne({
        _id: id,
      });

      if (findComprehensiveTest) {
        const deleteBook = await this.comprehensiveTestModel.deleteOne({
          _id: id,
        });
        if (!deleteBook) {
          return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "تست جامع مورد نظر پیدا نشد",
          });
        }

        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "تست جامع مورد نظر با موفقیت حذف شد",
          data: deleteBook,
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "تست جامع مورد نظر پیدا نشد",
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "مشکلی در حذف تست جامع مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
