import * as React from 'react';
import { PathologyReportPDF } from '../clinicalInformation/PatientViewPageStore';
import { If, Then, Else } from 'react-if';
import _ from 'lodash';
import IFrameLoader from '../../../shared/components/iframeLoader/IFrameLoader';
import { observer } from 'mobx-react';
import ZoomImage from '../../../shared/components/imageViewer/ImageViewer';
import { Link } from 'react-router-dom';

export type IPathologyReportProps = {
    iframeHeight: number;
    iframeStyle?: { [styleProp: string]: any };
};

@observer
export default class CustomTissueImage extends React.Component<
    IPathologyReportProps,
    {
        imageData: { status: number; message: string; data: string[] };
        studyId: any;
        caseId: any;
        loading: boolean;
        activeIndex: number;
        casesData: { status: number; message: string; data: string[] };
    }
> {
    pdfSelectList: any;
    pdfEmbed: any;

    constructor(props: IPathologyReportProps) {
        super(props);

        this.state = {
            imageData: { status: 0, message: '', data: [] },
            studyId: '',
            caseId: '',
            loading: true,
            activeIndex: 0,
            casesData: { status: 0, message: '', data: [] },
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(document.location.search);

            const studyId = searchParams.get('studyId');
            const caseId = searchParams.get('caseId');

            this.setState({ studyId: studyId, caseId: caseId });

            const BASE_URL = 'https://hemepathfileutility.unmc.edu';

            const response = await fetch(
                `${BASE_URL}/get-files/${studyId}/${caseId}`
            );
            const jsonResponse = await response.json();

            if (jsonResponse.status) {
                this.setState({ imageData: jsonResponse });
            }

            const caseResponse = await fetch(
                `${BASE_URL}/get-case-files/${studyId}`
            );
            const jsonCaseResponse = await caseResponse.json();

            if (jsonCaseResponse.status) {
                this.setState({ casesData: jsonCaseResponse });
            }

            this.setState({ loading: false });
        };

        fetchData();
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                {this.state.loading ? (
                    <p>Loading...</p>
                ) : this.state.imageData.status ? (
                    <>
                        <div
                            style={{
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #dddddd',
                                width: '10%',
                                height: 'calc(100vh - 237px)',
                                overflow: 'scroll',
                            }}
                        >
                            {this.state.casesData.status ? (
                                <>
                                    {this.state.casesData.data.length > 0 ? (
                                        <>
                                            {this.state.casesData.data.map(
                                                single => (
                                                    <Link
                                                        to={`/patient/H&EandIHCs?studyId=${this.state.studyId}&caseId=${single}`}
                                                        style={{
                                                            display: 'block',
                                                            backgroundColor: `${
                                                                single ===
                                                                this.state
                                                                    .caseId
                                                                    ? '#3786c2'
                                                                    : 'none'
                                                            }`,
                                                            textAlign: 'center',
                                                            padding: '10px',
                                                            color: `${
                                                                single ===
                                                                this.state
                                                                    .caseId
                                                                    ? '#fff'
                                                                    : '000'
                                                            }`,
                                                            cursor: 'pointer',
                                                        }}
                                                        key={single}
                                                    >
                                                        {single}
                                                    </Link>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <span>
                                            No case study found for which images
                                            exist
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span>
                                    An error occurered while loading studies
                                </span>
                            )}
                        </div>

                        {this.state.imageData.data.length === 0 ? (
                            <p>No images found for this case id</p>
                        ) : (
                            <div style={{ width: '90%' }}>
                                <span
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                    }}
                                >
                                    Showing {this.state.activeIndex + 1} /{' '}
                                    {this.state.imageData.data.length}
                                </span>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        paddingLeft: '20px',
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            this.setState({
                                                activeIndex:
                                                    this.state.activeIndex - 1,
                                            })
                                        }
                                        disabled={this.state.activeIndex === 0}
                                        style={{
                                            height: 'calc(100vh - 280px)',
                                            padding: '15px',
                                        }}
                                    >
                                        Prev
                                    </button>

                                    {/* <ZoomImage
                                        image={`https://ilabportal-file-uploader.crunchyapps.com/uploads/${
                                            this.state.studyId
                                        }/${this.state.caseId}/images/${
                                            this.state.imageData.data[
                                                this.state.activeIndex
                                            ]
                                        }`}
                                    /> */}

                                    <iframe
                                        src={`https://pathology.unmc.edu/apps/viewer/viewer.html?slideId=${
                                            this.state.imageData.data[
                                                this.state.activeIndex
                                            ]
                                        }`}
                                        style={{
                                            height: 'calc(100vh - 280px)',
                                            width: '100%',
                                            margin: 0,
                                        }}
                                    ></iframe>

                                    <button
                                        onClick={() =>
                                            this.setState({
                                                activeIndex:
                                                    this.state.activeIndex + 1,
                                            })
                                        }
                                        disabled={
                                            this.state.activeIndex ===
                                            this.state.imageData.data.length - 1
                                        }
                                        style={{
                                            height: 'calc(100vh - 280px)',
                                            padding: '15px',
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p>
                        Error Occurered: Most probably you have not uploaded any
                        images for this case id of this study
                    </p>
                )}
            </div>
        );
    }
}
