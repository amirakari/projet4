import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { async } from 'rxjs';
import { AddCvDto } from './DTO/Add-cv.dto';
import { UpdateCvDto } from './DTO/Update-cv.dto';
@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }
  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }
  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    const newCV = await this.cvRepository.preload({
      id,
      ...cv,
    });
    if (!newCV) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.cvRepository.save(newCV);
  }
  async updateCv2(updateCriteria, cv: UpdateCvDto) {
    return await this.cvRepository.update(updateCriteria, cv);
  }
  async removecv(id: number) {
    const cvToremove = await this.cvRepository.findOne(id);
    if (!cvToremove) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.cvRepository.remove(cvToremove);
  }
  async findcv(id: number) {
    const cvToremove = await this.cvRepository.findOne(id);
    if (!cvToremove) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return cvToremove;
  }
  async deletecv(id: number) {
    return await this.cvRepository.delete(id);
  }
  async statcvNumberByAge(maxAge, MinAge = 0) {
    const qb = this.cvRepository.createQueryBuilder('cv');
    qb.select('cv.age, count(cv.id) as nombredecv')
      .where('cv.age>:minAge and cv.age<:maxAge')
      .setParameters({ minAge: MinAge, maxAge: maxAge })
      .groupBy('cv.age');

    console.log(qb.getSql());
    return await qb.getRawMany();
  }
}
