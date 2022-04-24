export class Product {

  constructor(
    public Id: number,
    public Name : string,
    public Details: string,
    public Image: string,
    public Cost: number,
    public IsDeleted: boolean
  ) {  }
}
