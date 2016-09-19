export class FirebaseGrocery {
  constructor(
    public key: string,
    public name: string,
    public done: boolean,
    public deleted: boolean,
    public dateCreated: Number
  ) {}
}