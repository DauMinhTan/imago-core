import { Inject, Injectable } from '@nestjs/common';

import {
  AuthDomain,
  AuthInterop,
  AuthUseCase,
  ErrIdExisted,
  ErrorUnauthorized,
} from '../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class InteropService implements AuthInterop {
  constructor(@Inject('AuthUseCase') private authUseCase: AuthUseCase) {}

  async get(id: string, token: string): Promise<AuthDomain> {
    try {
      return await this.authUseCase.get(id);
    } catch (e) {
      throw e;
    }
  }

  // @ts-ignore
  async create(
    token: string,
    auth: AuthDomain,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      return await this.authUseCase.create(auth);
    } catch (e) {
      throw e;
    }
  }

  async signUp(
    token: string,
    auth: AuthDomain,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      auth.id = decodedIdToken.uid;
      auth.email = decodedIdToken.email;
      auth.role = 'default';
      auth.status = 'active';
      return await this.create(token, auth);
    } catch (e) {
      throw e;
    }
  }

  async signIn(token: string, auth: AuthDomain): Promise<AuthDomain> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      let user = await this.authUseCase.get(decodedIdToken.uid);
      return await this.get(decodedIdToken.uid, token);
    } catch (e) {
      throw e;
    }
  }

  // @ts-ignore
  async update(auth: AuthDomain): Promise<AuthDomain> {
    try {
      return await this.authUseCase.update(auth);
    } catch (error) {
      throw error;
    }
  }

  async list(token: string, auth: AuthDomain): Promise<AuthDomain[]> {
    return await this.authUseCase.list(auth);
  }

  verifyToken(token: string): Promise<DecodedIdToken> {
    throw new Error('Method not implemented.');
  }

  verifyRole(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
