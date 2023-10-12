import MutationsComponent from './MutationsComponent';
import * as React from 'react';
import { ResultsViewPageStore } from '../ResultsViewPageStore';
import { AppStore } from '../../../AppStore';
import ResultsViewURLWrapper from '../ResultsViewURLWrapper';

export interface IMutationsPageProps {
    routing?: any;
    store: ResultsViewPageStore;
    appStore: AppStore;
    urlWrapper: ResultsViewURLWrapper;
}

export default class Mutations extends React.Component<
    IMutationsPageProps,
    {}
> {
    render() {
        const genes = this.props.store.genes.result!.map(gene => ({
            label: gene.hugoGeneSymbol,
            info: {
                entrezGeneId: gene.entrezGeneId,
            },
        }));

        return genes?.map((gene, index) => (
            <>
                <MutationsComponent
                    key={`mutation${index}`}
                    routing={this.props.routing}
                    appStore={this.props.appStore}
                    store={this.props.store}
                    urlWrapper={this.props.urlWrapper}
                    current_gene={gene}
                />
                <hr />
            </>
        ));
    }
}
