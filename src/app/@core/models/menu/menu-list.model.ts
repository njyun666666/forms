export interface MenuListModel{
  menuID: number;

  menuName: string;

  mainMenu: number;

  url:string;

  icon:string;

  status:number;

  type:number;

  sort:number;

  createDate:Date;

  updateDate:Date;

  editor?:string;
}
