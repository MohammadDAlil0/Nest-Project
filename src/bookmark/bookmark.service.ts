import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

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

      async getBookmarks(userId: number) {
        return await this.prisma.bookmark.findMany({
          where: {
            userId
          }
        });
      }
    

    async getBookmarkById(userId: number, bookmarkId: number) {
        return await this.prisma.bookmark.findFirst({
            where: {
                userId: userId,
                id: bookmarkId 
            }
        });
    }

    async editBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

      // check if user owns the bookmark
      if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );

      return this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    }


    async deleteBookmark(userId: number, bookmarkId: number) {
      const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
    }

}
