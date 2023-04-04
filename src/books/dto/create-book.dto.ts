import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly author: string;

  @Min(1900)
  @Max(new Date().getFullYear())
  readonly year: number;
}
