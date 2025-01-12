export enum StudyViewPageTabKeyEnum {
    SUMMARY = 'summary',
    CLINICAL_DATA = 'clinicalData',
    HEATMAPS = 'heatmaps',
    CN_SEGMENTS = 'cnSegments',
    FILES_AND_LINKS = 'filesAndLinks',
    SUMMARY_CLINICO_PATHOLOGY_FEATURES = 'summaryClinicoPathologyFeatures',
    COMPLETE_STUDY_REPORT = 'completeStudyReport',
}

export const StudyViewResourceTabPrefix = 'openResource_';

export function getStudyViewResourceTabId(resourceId: string) {
    return `${StudyViewResourceTabPrefix}${resourceId}`;
}

export function extractResourceIdFromTabId(tabId: string) {
    const match = new RegExp(`${StudyViewResourceTabPrefix}(.*)`).exec(tabId);
    if (match) {
        return match[1];
    } else {
        return undefined;
    }
}
