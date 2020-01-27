import * as React from 'react';
import { Mutation } from 'shared/api/generated/CBioPortalAPI';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { generateHgvsgByMutation } from 'shared/lib/MutationUtils';
import { buildGenomeNexusHgvsgUrl } from 'shared/api/urls';

import hgvsgStyles from './hgvsg.module.scss';

export default class HgvsgColumnFormatter {
    public static renderFunction(data: Mutation[]) {
        return HgvsgColumnFormatter.getHgvsgDataViz(data[0]);
    }

    private static getHgvsgDataViz(mutation: Mutation) {
        let hgvsg = HgvsgColumnFormatter.getData(mutation);
        if (!hgvsg) {
            return <span />;
        } else {
            let genomeNexusUrl = buildGenomeNexusHgvsgUrl(hgvsg);
            return (
                <DefaultTooltip
                    placement="topLeft"
                    overlay={
                        <div>
                            {hgvsg}
                            <br />
                            Click to see this variant on &nbsp;
                            <a
                                href={genomeNexusUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Genome Nexus
                                <div
                                    className={hgvsgStyles['genome-nexus-logo']}
                                />
                            </a>
                        </div>
                    }
                >
                    <span className={hgvsgStyles['hgvsg-data']}>
                        <a
                            href={genomeNexusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {hgvsg}&nbsp;
                            <i className="fa fa-external-link" />
                        </a>
                    </span>
                </DefaultTooltip>
            );
        }
    }

    public static getData(mutation: Mutation): string | null {
        return generateHgvsgByMutation(mutation);
    }

    public static download(data: Mutation[]): string {
        const hgvsg = HgvsgColumnFormatter.getData(data[0]);
        return hgvsg ? hgvsg : '';
    }

    public static getSortValue(data: Mutation[]): string | null {
        return HgvsgColumnFormatter.getData(data[0]);
    }
}
