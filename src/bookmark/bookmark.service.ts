import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async createBookmark(
        userId: number,
        dto: CreateBookmarkDto,
      ) {
        const bookmark =
          await this.prisma.bookmark.create({
            data: {
              userId,
              ...dto,
            },
          });
    
        return bookmark;
      }
    

    async getBookmarkById(userId: number, bookmarkId: number) {
        return await this.prisma.bookmark.findFirst({
            where: {
                userId: userId,
                id: bookmarkId 
            }
        });
    }
}
