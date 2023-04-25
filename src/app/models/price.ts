export class Price{
  constructor(
      public _id:string,
      public data: object,
      public avg: number,
      public date: Date,
      public link: string,
  ){}
}