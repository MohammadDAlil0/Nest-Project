import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    createBookmark(@GetUser('id') userId: number , @Body() dto: CreateBookmarkDto) {
      return this.bookmarkService.createBookmark(userId, dto);
    }

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
      return this.bookmarkService.getBookmarks(userId);
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

    @Patch(':id')
    editBookmark(
      @GetUser('id') userId: number, 
      @Param('id', ParseIntPipe) bookmarkId: number,
      @Body() dto: EditBookmarkDto
    ) {
      return this.bookmarkService.editBookmark(userId, bookmarkId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
      return this.bookmarkService.deleteBookmark(userId, bookmarkId);
    }

}