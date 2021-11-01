export interface OrgNode {
    id: string;
    name: string;
    manager?: number;
    deptID?: string;
    type: 'user' | 'dept';
    expand?: number;
    children?: OrgNode[];
}
