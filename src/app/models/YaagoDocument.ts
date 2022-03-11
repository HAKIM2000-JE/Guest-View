
export class YaagoDocument {
  url: string;
  type: DocType;
  title: string;
  description: string;
  date: string;

  constructor() {
  }
}
export class UploadUrlDto {

  url: string;
  blobName: string;

}

export enum DocType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  EXTERNAL_VIDEO = 'EXTERNAL_VIDEO',
  YOUTUBE = 'YOUTUBE',
  VIMEO = 'VIMEO',
  DAILYMOTION = 'DAILYMOTION',
  PDF = 'PDF',
  WORD = 'WORD',
  LINK = 'LINK'
}

export class DocumentUploadTypes {

  static all(): string[] {
    return [FileTypes.JPG, FileTypes.JPEG, FileTypes.PNG, FileTypes.EXCEL,
      FileTypes.OFFICE_DOCUMENT, FileTypes.MS_WORD, FileTypes.OFFICE_PRESENTATION,
      FileTypes.PPT, FileTypes.OPEN_PRESENTATION, FileTypes.PDF,
      FileTypes.MP4, FileTypes.QUICKTIME, FileTypes.X_QUICKTIME, FileTypes.MOV, FileTypes.MPEG, FileTypes.MP3];
  }
  static images(): string[] {
    return [FileTypes.JPG, FileTypes.JPEG, FileTypes.PNG];
  }
  static documents(): string[] {
    return [FileTypes.EXCEL, FileTypes.OFFICE_DOCUMENT, FileTypes.MS_WORD, FileTypes.OFFICE_PRESENTATION,
      FileTypes.PPT, FileTypes.OPEN_PRESENTATION, FileTypes.PDF];
  }
  static words(): string[] {
    return [FileTypes.OFFICE_DOCUMENT, FileTypes.MS_WORD];
  }
  static presentations(): string[] {
    return [FileTypes.OFFICE_PRESENTATION, FileTypes.PPT, FileTypes.OPEN_PRESENTATION];
  }
  static sheets(): string[] {
    return [FileTypes.EXCEL];
  }
  static audios(): string[] {
    return [FileTypes.MPEG, FileTypes.MP3];
  }
  static videos(): string[] {
    return [FileTypes.MP4, FileTypes.QUICKTIME, FileTypes.X_QUICKTIME, FileTypes.MOV];
  }
  static pdf(): string[] {
    return [FileTypes.PDF];
  }
  static slideshow(): string[] {
    return [FileTypes.SLIDESHOW];
  }
  static youtube(): string[] {
    return [FileTypes.YOUTUBE];
  }
}

export enum FileTypes {
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  OFFICE_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  MS_WORD = 'application/msword',
  OFFICE_PRESENTATION = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  PPT = 'application/vnd.ms-powerpoint',
  OPEN_PRESENTATION = 'application/vnd.oasis.opendocument.presentation',
  PDF = 'application/pdf',
  MP4 = 'video/mp4',
  QUICKTIME = 'video/quicktime',
  X_QUICKTIME = 'video/x-quicktime',
  MOV = 'image/mov',
  MPEG = 'audio/mpeg',
  MP3 = 'audio/mp3',
  YOUTUBE = 'YouTube',
  SLIDESHOW = 'Slideshow'
}
