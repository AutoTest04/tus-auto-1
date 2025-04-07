export interface Branding {
    appName?: string;
    description?: string;
    supportSite?: string;
}

export interface Parameter {
    name: string;
    required: boolean;
    value: string;
    exampleInput?: string;
}

export interface Parameters {
    parameters: Parameter[];
    guidanceLink: string;
}

export interface Access {
    entireOrg: boolean;
}

export interface Authentication {
    method: string;
}

export interface AppSettings {
    branding: Branding;
    parameters: Parameters;
    access: Access;
    authentication: Authentication;
    resource_name: string;
}