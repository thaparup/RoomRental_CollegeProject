import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common/decorators';
import { PropertyDto } from './dto/property.dto';
import { RoomDto } from './dto/room.dto';
import { HouseDto } from './dto/house.dto';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
  TokenUser,
} from 'src/common/decorators';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MessageDto } from './dto/message.dto';
import { LandDto } from './dto/land.dto';
import { ParseFilePipeBuilder, ParseIntPipe } from '@nestjs/common/pipes';
import { RoomService } from './room/room.service';
import { HouseService } from './house/house.service';
import { LandService } from './land/land.service';
import { ReservationDto } from './dto/reservations.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly roomService: RoomService,
    private readonly houseService: HouseService,
    private readonly landService: LandService,
    private readonly propteryService: PropertyService,
  ) {}

  @Post('room/image/create/:roomId')
  @UseInterceptors(FilesInterceptor('files', 6))
  createImagesRoom(
    @GetCurrentUserId()
    userId: TokenUser,
    @Param('roomId') roomId: string,
    @Body()
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    console.log(userId);
    typeof userId;
    return this.roomService.createImagesRoom(+userId, +roomId, file);
  }

  @Post('room')
  @UseInterceptors(FilesInterceptor('files', 6))
  addRoom(
    @Body() roomDto: RoomDto,
    image: Array<String>,
    @GetCurrentUserId() userId: TokenUser,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    return this.roomService.addRoom(roomDto, +userId, file);
  }

  @Get('room')
  @Public()
  getRoom() {
    return this.roomService.getRoom();
  }

  @Get('room/my')
  getMyRoom(@GetCurrentUserId() userId: TokenUser) {
    return this.roomService.getMyRoom(+userId);
  }

  @Get('room/my/:id')
  getMyRoomById(
    @Param('id') roomid: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.getMyRoomById(parseInt(roomid), +userId);
  }

  @Get('room/images/:id')
  getImagesRoom(
    @Param('id') roomId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.getImagesRoom(+roomId, +userId);
  }

  @Get('room/image')
  @Public()
  getSingleImageForRoom() {
    return this.roomService.getSingleImageForRoom();
  }

  @Get('room/:id')
  getRoomByID(@Param('id') id: string, @GetCurrentUser() userId: TokenUser) {
    return this.roomService.getRoomById(+userId, +id);
  }

  @Patch('room/book/:id/:receiverId')
  async bookRoom(
    @Body() text: string,
    @Param('id') id: string,
    @Param('receiverId') receiverId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.bookRoom(text, +id, +receiverId, +userId);
  }
  @Post('room/reservation/:id/:receiverId')
  roomReservation(
    @Body() reservationDto: ReservationDto,
    @Param('id') id: string,
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.roomReservation(
      reservationDto,
      +id,
      receiverId,
      +userId,
    );
  }

  @Get('room/reservation/:id')
  getRoomReservation(
    @Param('id') id: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.getRoomReservation(+id, +userId);
  }
  @Patch('room/:id')
  async updateRoom(
    @Body() roomDto: RoomDto,
    @Param('id') id: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.roomService.updateRoom(roomDto, +id, +userId);
  }

  @Delete('room/:id')
  delRoom(@Param('id') id: string, @GetCurrentUserId() userId: TokenUser) {
    return this.roomService.delRoom(parseInt(id), +userId);
  }

  @Delete('room/image/:imageid')
  deleteImageRoom(
    @GetCurrentUserId() userId: TokenUser,
    @Param('imageid') imageid: string,
  ) {
    return this.roomService.deleteImage(+userId, +imageid);
  }

  @Post('room/comment/:id')
  comments(
    @GetCurrentUserId() userId: TokenUser,
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
  ) {
    return this.roomService.comments(+userId, +id, commentDto);
  }
  @Get('room/comment/get/:id')
  GetComments(@GetCurrentUserId() userId: TokenUser, @Param('id') id: string) {
    return this.roomService.getComments(+userId, +id);
  }

  // *************************************** House  ***********************************************

  @Post('house/image/create/:houseId')
  @UseInterceptors(FilesInterceptor('files', 6))
  createImagesHouse(
    @GetCurrentUserId()
    userId: TokenUser,
    @Param('houseId') houseId: string,
    @Body()
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    return this.houseService.createImagesHouse(+userId, +houseId, file);
  }

  @Post('house')
  @UseInterceptors(FilesInterceptor('files', 6))
  addHouse(
    @Body() houseDto: HouseDto,
    @GetCurrentUserId() userId: TokenUser,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    return this.houseService.addHouse(houseDto, +userId, file);
  }

  @Get('house/images/:houseId')
  getImagesForHouse(
    @Param('houseId') houseId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.houseService.getImagesForHouse(parseInt(houseId), +userId);
  }

  @Get('house/image')
  @Public()
  getSingleImageForHouse(@Param('houseId') houseId: string) {
    return this.houseService.getSingleImageForHouse(parseInt(houseId));
  }

  @Get('house')
  @Public()
  getHouse() {
    return this.houseService.getHouse();
  }
  @Get('house/my')
  getMyHouse(@GetCurrentUserId() userId: TokenUser) {
    return this.houseService.getMyHouse(+userId);
  }

  @Get('house/my/:id')
  getMyHouseById(
    @Param('id') houseId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.houseService.getMyHouseById(parseInt(houseId), +userId);
  }

  @Get('house/:id')
  getHouseById(@Param('id') id: string, @GetCurrentUser() userId: TokenUser) {
    return this.houseService.getHouseById(+userId, +id);
  }

  @Patch('house/:id')
  async updateHouse(
    @Body() houseDto: HouseDto,
    @Param('id') id: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.houseService.updateHouse(houseDto, +id, +userId);
  }

  @Patch('house/book/:id')
  async bookHouse(
    @Body() book: boolean,
    @Param('id') id: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.houseService.bookHouse(book, +id, +userId);
  }

  @Delete('house/:id')
  deleteHouse(@GetCurrentUserId() userId: TokenUser, @Param('id') id: string) {
    return this.houseService.deleteHouse(+userId, +id);
  }

  @Delete('house/images/:imageid')
  deleteImageHouse(
    @GetCurrentUserId() userId: TokenUser,
    @Param('imageid') imageid: string,
  ) {
    return this.houseService.deleteImageHouse(+userId, +imageid);
  }

  // ************************************ Land ******************************************************
  @Post('land/image/create/:landId')
  @UseInterceptors(FilesInterceptor('files', 6))
  createImagesLand(
    @GetCurrentUserId()
    userId: TokenUser,
    @Param('landId') landId: string,
    @Body()
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    console.log(userId);
    typeof userId;
    return this.landService.createImagesLand(+userId, +landId, file);
  }

  @Post('land')
  @UseInterceptors(FilesInterceptor('files', 6))
  addLand(
    @Body() landDto: LandDto,
    @GetCurrentUserId() userId: TokenUser,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    return this.landService.addLand(landDto, +userId, file);
  }

  @Patch('land/:id')
  updateLand(
    @Body() landDto: LandDto,
    @Param('id') id: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.landService.updateLand(landDto, +id, +userId);
  }

  // @Patch('land/:id')
  // @UseInterceptors(FilesInterceptor('files', 6))
  // updateLand(
  //   @Body() landDto: LandDto,
  //   @Param('id') id: string,
  //   @GetCurrentUserId() userId: TokenUser,

  //   @UploadedFiles(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: /(jpg|jpeg|png|gif|avif)$/,
  //       })
  //       .addMaxSizeValidator({ maxSize: 5000000 })
  //       .build({}),
  //   )
  //   file: Array<Express.Multer.File>,
  // ) {
  //   return this.landService.updateLand(landDto, +id, +userId, file);
  // }

  @Get('land/images/:landId')
  getImagesForLand(
    @Param('landId') landId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.landService.getImagesForLand(parseInt(landId), +userId);
  }

  @Get('land/image')
  getSingleImageForLand(@GetCurrentUserId() userId: TokenUser) {
    return this.landService.getSingleImageForLand(+userId);
  }

  @Get('land')
  getLand() {
    return this.landService.getLand();
  }
  @Get('land/my')
  getMyLand(@GetCurrentUserId() userId: TokenUser) {
    return this.landService.getMyLand(+userId);
  }

  @Get('land/my/:id')
  getMyLandById(
    @Param('id') landId: string,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.landService.getMyLandById(parseInt(landId), +userId);
  }

  @Get('land/:id')
  getLandById(@Param('id') id: string, @GetCurrentUser() userId: TokenUser) {
    return this.landService.getLandById(+userId, +id);
  }

  @Delete('land/:id')
  deleteLand(@GetCurrentUserId() userId: TokenUser, @Param('id') id: string) {
    return this.landService.deleteLand(+userId, +id);
  }

  @Delete('land/images/:imageid')
  deleteImageLand(
    @GetCurrentUserId() userId: TokenUser,
    @Param('imageid') imageid: string,
  ) {
    return this.landService.deleteImageLand(+userId, +imageid);
  }

  // **************************************************** Images ***********************************

  @Post('multiimage')
  @UseInterceptors(FilesInterceptor('files', 6))
  addMul(
    // @Body() roomDto: RoomDto,
    image: Array<String>,
    @GetCurrentUserId() userId: TokenUser,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Array<Express.Multer.File>,
  ) {
    return this.roomService.addMul(+userId, file);
  }
  tart;
  @Post('text/:id')
  createText(
    @Body('') messageDto: MessageDto,
    @GetCurrentUserId() userId: TokenUser,
    @Param('id') id: string,
  ) {
    return this.propteryService.createText(messageDto, +userId, +id);
  }
  @Post('text')
  createTexts(
    @Body('') messageDto: MessageDto,
    @GetCurrentUserId() userId: TokenUser,
    @Param('id') id: string,
  ) {
    return this.propteryService.createTexts(messageDto, +userId, +id);
  }

  @Get('betweentwo/:id')
  getConverstationBetweenTwoOnly(
    @GetCurrentUserId() userId: TokenUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.propteryService.getConverstationBetweenTwoOnly(+userId, id);
  }

  @Get('view')
  viewAllMessages(@GetCurrentUserId() userId: TokenUser) {
    return this.propteryService.viewAllMessages(+userId);
  }
  @Get('user')
  getUser(@GetCurrentUserId() userId: TokenUser) {
    return this.propteryService.getUser(+userId);
  }
}
