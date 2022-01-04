import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentsInterface } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private baseUrl = 'http://localhost:26737/comments' //dotnet

  constructor(private http: HttpClient) { }

  getComments(){
    return this.http.get<any>(this.baseUrl);
  }

  getComment(id){
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  getUserComments(id: number){
    return this.http.get<any>(this.baseUrl + "?user-id" + id);
  }

  addComment = (userId: number, movieId: number, data: CommentsInterface) => {
    return this.http.post<CommentsInterface>(this.baseUrl, {
      "userId": userId,
      "movieId": movieId,
      "body": data.body
    });
  }

  deleteComment(id) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

  editComment = (data: CommentsInterface) => {
    return this.http.put(this.baseUrl + '/' + data.id, {
      "id": data.id,
      "userId": data.userId,
      "movieId": data.movieId,
      "body": data.body
    });
  };

}
