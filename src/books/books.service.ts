import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = await this.bookModel.create(createBookDto);
    return createdBook;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndRemove(id).exec();
  }
}
