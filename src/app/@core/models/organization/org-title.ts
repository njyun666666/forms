export interface OrgTitle {
    titleID: number;
    title: string;
    level?: number;
    status?: number;
    createDate?: Date;
    updateDate?: Date;
    editor?: string;
}


export interface OrgTitleGetModel {
    status?: number;
}



