//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

// Refers to trident\libs\data\notifications\src\lib\notifications.model.ts
export interface NotificationToastParam {
    title?: string;
    message?: string;
    duration?: NotificationDuration;
    notificationType?: keyof typeof NotificationType;
    id?: string;
    copySwitch?: boolean;
    extensionName?: string;
    actionName?: string;
    buttonLabel?: string;
    buttonType?: NotificationButtonType;
    itemType?: NotificationItemType;
}

type NotificationDuration = 'Short' | 'Medium' | 'Long';

type NotificationButtonType = 'Primary' | 'Secondary' | 'Link';

export type NotificationItemType =
    'Environment'
    | 'EventStream'
    | 'HomeOne'
    | 'KustoDashboard'
    | 'KustoDatabase'
    | 'KustoEventHubDataConnection'
    | 'KustoQueryWorkbench'
    | 'Lakehouse'
    | 'LinkedService'
    | 'MicrosoftSupplyChainCenter'
    | 'MLExperiment'
    | 'MLModel'
    | 'Pipeline'
    | 'ReflexProject'
    | 'SparkJobDefinition'
    | 'SqlDatabase'
    | 'SynapseNotebook'
    | 'TestArtifact';

export enum NotificationType {
    Error = 2,
    Loading = 3,
    Success = 4,
    Warning = 5,
    Share = 6,
    Info = 7,
}

export const NotificationTypeRecord: Record<string, NotificationType> = {
    'Error': NotificationType.Error,
    'Loading': NotificationType.Loading,
    'Success': NotificationType.Success,
    'Warning': NotificationType.Warning,
    'Share': NotificationType.Share,
    'Info': NotificationType.Info,
};

export interface NotificationCard {
    // for backend msg, id is of number type, while localStorage msg have string ids
    id: number | string;
    notificationType?: NotificationType;

    itemType?: NotificationItemType;
    isFromTrident?: boolean;

    title: string;
    message?: string;
    createdTime?: number;
    expirationTime?: number;
    seen: boolean;
    actionButtons?: NotificationActionButton[];
}

export interface NotificationActionButton {
    label: string;
    action?: NotificationAction;
}

export interface NotificationAction {
    label: string;
    extensionName?: string;
    action: string;
    userActionTimestamp: number;
    buttonType: number;
    data?: NotificationActionData | string;
}
export interface NotificationActionData {
    contract: any;
    actionType: number;
    actionPath?: string[];
}
