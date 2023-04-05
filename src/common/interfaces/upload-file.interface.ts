export interface FileAdapter {
  uploadFile<T>(file: Express.Multer.File): Promise<T>;
}
