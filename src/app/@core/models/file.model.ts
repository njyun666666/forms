export interface FileListModel {
    fileID: string;
    groupID: string;
    oFileName: string;
    nFileName: string;
    path: string;
    size: number;
    uploadDate: Date;
    status: number;

    isDelete: boolean;
}
export interface FileInfoViewModel extends FileListModel {
    userName: string;
    sizeText: string;
    url: string;
}

export interface FileUploadResultModel {
    list: FileInfoViewModel[];
    error_message: string;
    error_list: string[];
}

export interface GetFileListModel {
    formID?: string;
    groupID?: string;
}
export interface DeleteFileModel {
    fileID: string;
}
