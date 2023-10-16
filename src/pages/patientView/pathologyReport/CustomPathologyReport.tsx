import * as React from 'react';
import { PathologyReportPDF } from '../clinicalInformation/PatientViewPageStore';
import { If, Then, Else } from 'react-if';
import _ from 'lodash';
import IFrameLoader from '../../../shared/components/iframeLoader/IFrameLoader';
import { observer } from 'mobx-react';

export type IPathologyReportProps = {
    iframeHeight: number;
    iframeStyle?: { [styleProp: string]: any };
};

@observer
export default class PathologyReport extends React.Component<
    IPathologyReportProps,
    { pdfUrl: string }
> {
    pdfSelectList: any;
    pdfEmbed: any;

    constructor(props: IPathologyReportProps) {
        super(props);

        const searchParams = new URLSearchParams(document.location.search);
        const studyId = searchParams.get('studyId');
        const caseId = searchParams.get('caseId');

        let pdfURL = `https://hemepathfileutility.unmc.edu/uploads/${studyId}/${caseId}/report/${caseId}.pdf`;

        this.state = { pdfUrl: this.buildPDFUrl(pdfURL) };
    }

    buildPDFUrl(url: string): string {
        return `https://docs.google.com/viewerng/viewer?url=${url}?pid=explorer&efh=false&a=v&chrome=false&embedded=true`;
    }

    // shouldComponentUpdate(nextProps: IPathologyReportProps){
    //     return nextProps === this.props;
    // }

    render() {
        return (
            <div>
                <IFrameLoader
                    height={this.props.iframeHeight}
                    url={this.state.pdfUrl}
                />
            </div>
        );
    }
}
