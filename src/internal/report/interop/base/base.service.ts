import { Inject, Injectable } from '@nestjs/common';
import {
  Report,
  ReportInterop,
  ReportUseCase,
} from '../../../../domain/report.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';
import { RolePagination } from 'src/domain/role.domain';

@Injectable()
export class BaseServiceInterop implements ReportInterop {
  constructor(
    @Inject('ReportUseCase') private useCase: ReportUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}
 async getList(token: string, page: number):Promise<RolePagination> {
    try {
      await this.authUseCase.verifyToken(token);
      return await this.useCase.getList(page);
    } catch (e) {
      throw e;
    }
  }

  async create(token: string, report: Object) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.create(report);
    } catch (e) {
      throw e;
    }
  }

  async getAll(token: string): Promise<Report[]> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAll();
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, token: string) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.update(id);
    } catch (e) {
      throw e;
    }
  }
}
