import { Body, Inject, Injectable } from '@nestjs/common';
import { Comment, CommentInterop, CommentUseCase, ErrorCommentPostId } from '../../../../domain/comment.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';
import { PostUseCase } from '../../../../domain/post.domain';

@Injectable()
export class CommentInteropBaseService implements CommentInterop {

    constructor(@Inject('CommentUseCase') private useCase: CommentUseCase, @Inject('AuthUseCase') private auth: AuthUseCase, @Inject('PostUseCase') private postUseCase: PostUseCase) {}


    async createComment(token: string,comment: Comment) {
        try {
          let decoded = await this.auth.verifyToken(token);
          comment.authorId = decoded.uid;
          return await this.useCase.createComment(comment);
        }catch (e) {
            throw e;
        }
    }
    async updateComment(token: string,id: string, comment: Comment) {
      try {
        await this.auth.verifyToken(token);
        return this.useCase.updateComment(id,comment);
      }
      catch (e) {
        throw e;
      }
    }
    async deleteComment(token: string,id: string,comment: Comment){
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.deleteComment(id,comment);
      }
      catch (e) {
        throw e;
      }
    }
    async getCommentById(token: string,id: string): Promise<Comment> {
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.getCommentById(id);
      }
      catch (e) {
          throw e;
      }
    }
  async getCommentsByPostId(token: string, postId: string): Promise<Comment[]> {
    try {
      await this.auth.verifyToken(token);
      let exists = await this.postUseCase.getPostById(postId);
      if (exists) {
        return await this.useCase.getCommentsByPostId(postId);
      }else {
        console.error(ErrorCommentPostId);
      }
    } catch (e) {
      throw (e);
    }
  }
    async getComments(token: string): Promise<Comment[]> {
      try {
        await this.auth.verifyToken(token);
        return await this.useCase.getComments();
      }
      catch (e) {
          throw e;
      }
    }
}
