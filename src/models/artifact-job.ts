// trident\libs\monitoring-hub\src\lib\contracts\monitoring-hub-model.ts
export const enum ArtifactJobListFilterGroupId {
    status = 'status',
    type = 'type',
    startTime = 'startTime',
    submitter = 'submitter',
    workspace = 'workspace',
}

export const enum StatusGroupFilter {
    Cancelled = '0',
    Completed = '1',
    Failed = '2',
    InProgress = '3',
    NotStarted = '4',
    Unknown = '5',
}

export const enum StartTimeGroupFilter {
    Anytime = 'anytime',
    Yesterday = 'yesterday',
    PreviousWeek = 'previous-week',
    PreviewMonth =  'preview-month',
    Customize = 'customize',
}

export const enum ArtifactTypeGroupFilter {
    Dataflow = 'dataflow-gen2',
    Dataset = 'dataset',
    Datamart = 'datamart',
    Pipeline = 'Pipeline',
    Lakehouse = 'Lakehouse',
    SparkJobDefinition = 'SparkJobDefinition',
    SynapseNotebook = 'SynapseNotebook',
    TestArtifact = 'TestArtifact',
    HomeOne = 'HomeOne',
    Folder = 16
}

export const enum ColumnName {
    // common columns
    Name = 'ActivityName',
    Status = 'Status',
    ItemType = 'Item_Type',
    StartTime = 'Start_Time',
    Submitter = 'Submitted_By',
    Location = 'Location',
    Duration = 'Duration',
    // workload related columns
    Capacity = 'Capacity',
    AllocatedResource = 'Allocated_Resource',
    AverageDuration = 'Average_Duration',
    JobType = 'Job_Type',
    LivyID = 'Livy_ID',
    RefreshType = 'Refresh_Type',
    RefreshesPerDay = 'Refreshes_Per_Day',
    RunKind = 'Run_Kind',
    UpstreamRun = 'Upstream_Run',
    DownstreamRun = 'Downstream_Runs',
}