import { Repository } from 'typeorm';
import fs from 'fs/promises';
import { Image } from '../db/model/Image';
import db from '../db/db';
import { ClientException } from '../exception/ClientException';

interface IImageService {
  imageGet(id: string): Promise<Image>;
  imageGetData(id: string): Promise<string | null>;
}

class ImageService implements IImageService {
  private readonly _repo: Repository<Image>;

  constructor() {
    this._repo = db.getRepository(Image);
  }

  public async imageGet(id: string): Promise<Image> {
    const image = await this._repo.findOne({
      where: { id },
    });
    if (image == null) {
      throw new ClientException(`Image ${id} not found`);
    }

    return image;
  }

  public async imageGetData(id: string): Promise<string | null> {
    try {
      const image = await this.imageGet(id);
      const base64 = await fs.readFile(image.fileName, 'base64');
      return `data:image/jpeg;base64,${base64}`;
    } catch (error: any) {
      if (error.code === 'ENONET') {
        return null;
      }
      throw error;
    }
  }
}

const service = new ImageService();

export default service;
