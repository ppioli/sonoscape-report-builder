import { Repository } from 'typeorm';
import path from 'path';
import { Image } from '../db/model/Image';
import db from '../db/db';
import { ClientException } from '../exception/ClientException';
import { getConfig } from '../config/registerConfigApi';

interface IImageService {
  imageGet(id: string): Promise<Image>;

  imageGetData(id: string): Promise<string>;
}

class ImageService implements IImageService {
  private readonly _repo: Repository<Image>;

  constructor() {
    this._repo = db.getRepository(Image);
  }

  public async imageGet(id: string): Promise<Image> {
    const image = await this._repo.findOne({
      where: { id },
      relations: {
        report: true,
      },
    });
    if (image == null) {
      throw new ClientException(`Image ${id} not found`);
    }

    return image;
  }

  public async imageGetData(id: string): Promise<string> {
    const config = await getConfig();
    const image = await this.imageGet(id);
    const imageFile = path.join(
      config.masterDir,
      image.report.patientId,
      image.report.id,
      image.id
    );
    // const base64 = await fs.readFile(imageFile, 'base64');
    // const data = `data:image/gif;base64,${base64}`;

    return imageFile;
  }
}

const service = new ImageService();

export default service;
