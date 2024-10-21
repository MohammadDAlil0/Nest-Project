import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto } from './dto';

@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    createBookmark(@GetUser('id') userId: number , @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Get(':id')
    getBookmarkById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
      return this.bookmarkService.getBookmarkById(
        userId,
        bookmarkId,
      );
    }


}
