import { Response } from "express";

export interface ResponseMessage {
  isSuccessful: boolean;
  errors?: string[];
  data?: any;
};

export interface MyResponse extends Response<ResponseMessage> { }