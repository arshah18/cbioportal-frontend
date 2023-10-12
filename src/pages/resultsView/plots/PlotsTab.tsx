import PlotsTabComponent from './PlotsTabComponent';
import * as React from 'react';
import { ResultsViewPageStore } from '../ResultsViewPageStore';
import ResultsViewURLWrapper from '../ResultsViewURLWrapper';
import { ClinicalAttribute } from 'cbioportal-ts-api-client';

export interface IPlotsTabProps {
    store: ResultsViewPageStore;
    urlWrapper: ResultsViewURLWrapper;
}

export enum ColoringType {
    ClinicalData,
    MutationType,
    CopyNumber,
    LimitVal,
    StructuralVariant,
    None,
}

export enum PotentialColoringType {
    GenomicData,
    None,
    LimitValGenomicData,
    LimitVal,
}

export type SelectedColoringTypes = Partial<{ [c in ColoringType]: any }>;

export enum PlotType {
    ScatterPlot,
    WaterfallPlot,
    BoxPlot,
    DiscreteVsDiscrete,
}

export enum DiscreteVsDiscretePlotType {
    Bar = 'Bar',
    StackedBar = 'StackedBar',
    PercentageStackedBar = 'PercentageStackedBar',
    Table = 'Table',
}

export enum MutationCountBy {
    MutationType = 'MutationType',
    MutatedVsWildType = 'MutatedVsWildType',
    DriverVsVUS = 'DriverVsVUS',
}

export enum StructuralVariantCountBy {
    VariantType = 'VariantType',
    MutatedVsWildType = 'MutatedVsWildType',
}

export type AxisMenuSelection = {
    entrezGeneId?: number;
    genesetId?: string;
    genericAssayEntityId?: string;
    selectedGeneOption?: PlotsTabGeneOption;
    selectedDataSourceOption?: PlotsTabOption;
    selectedGenesetOption?: PlotsTabOption;
    selectedGenericAssayOption?: PlotsTabOption;
    genericAssayDataType?: string; // LIMIT-VALUE, CATEGORICAL, BINARY
    selectedCategories: any[];
    dataType?: string; // Generic Assay saves genericAssayType as dataType
    dataSourceId?: string;
    mutationCountBy: MutationCountBy;
    structuralVariantCountBy: StructuralVariantCountBy;
    logScale: boolean;
};

export type ColoringMenuOmnibarOption = {
    label: string;
    value: string;
    info: {
        entrezGeneId?: number;
        clinicalAttribute?: ClinicalAttribute;
    };
};

export type ColoringMenuOmnibarGroup = {
    label: string;
    options: ColoringMenuOmnibarOption[];
};

export type ColoringMenuSelection = {
    selectedOption: ColoringMenuOmnibarOption | undefined;
    logScale?: boolean;
    readonly colorByMutationType: boolean;
    readonly colorByCopyNumber: boolean;
    readonly colorByStructuralVariant: boolean;
    default: {
        entrezGeneId?: number;
    };
};

export interface IPlotsTabProps {
    store: ResultsViewPageStore;
    urlWrapper: ResultsViewURLWrapper;
}

export type PlotsTabDataSource = {
    [dataType: string]: { value: string; label: string }[];
};

export type PlotsTabOption = {
    value: string;
    label: string;
    plotAxisLabel?: string;
    genericAssayDataType?: string;
};

export type PlotsTabGeneOption = {
    value: number; // entrez id
    label: string; // hugo symbol
};

export const NONE_SELECTED_OPTION_STRING_VALUE = 'none';
export const NONE_SELECTED_OPTION_NUMERICAL_VALUE = -1;
export const NONE_SELECTED_OPTION_LABEL = 'Ordered samples';
export const ALL_SELECTED_OPTION_NUMERICAL_VALUE = -3;
export const SAME_SELECTED_OPTION_STRING_VALUE = 'same';
export const SAME_SELECTED_OPTION_NUMERICAL_VALUE = -2;

export default class PlotsTab extends React.Component<IPlotsTabProps, {}> {
    render() {
        const genes = this.props.store.genes.result!.map(gene => ({
            label: gene.hugoGeneSymbol,
            info: {
                entrezGeneId: gene.entrezGeneId,
            },
        }));

        return genes?.map((gene, index) => (
            <>
                <PlotsTabComponent
                    key={`gene${index}`}
                    store={this.props.store}
                    urlWrapper={this.props.urlWrapper}
                    current_gene={gene}
                />
                <hr />
            </>
        ));
    }
}
