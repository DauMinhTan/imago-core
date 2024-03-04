import { Body, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Comment, CommentRepository } from '../../../../domain/comment.domain';

@Injectable()
export class CommentRepositoryBaseService implements CommentRepository{
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  async getCommentsByPostId(postId: string): Promise<Comment[]> {
        try {
          const comments = await this.db.collection('comments').where('postId', '==', postId).get();
        return comments.docs.map(doc => doc.data() as Comment);
        } catch (e) {
          throw e;
        }
    }
  async createComment(comment: Comment): Promise<boolean> {
    try {
      const Comment = await this.db.collection('comments').doc(comment.id).set(comment);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async updateComment(id: string,comment: Partial<Comment>): Promise<boolean> {
    try {
      const Comment = await this.db.collection('comments').doc(id).update(comment);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async deleteComment(id: string): Promise<boolean> {
    try {
    const Comment = await this.db.collection('comments').doc(id).delete();
      return true;
    } catch (e) {
      throw e;
    }
  }
  async getCommentById(id: string): Promise<Comment> {
    try {
      const comment = await this.db.collection('comments').doc(id).get();
      return comment.data() as Comment;
    } catch (e) {
      throw e;
    }
  }
  async getComments(): Promise<Comment[]> {
    try {
      const comments = await this.db.collection('comments').get();
      return comments.docs.map(doc => doc.data() as Comment);
    } catch (e) {
      throw e;
    }
  }
}
