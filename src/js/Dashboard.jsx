import React, {Component} from 'react';

import DocumentArea from './DocumentArea';

/*
    Main app view for viewing/uploading pdfs
*/
export default class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <DocumentArea />
            </div>
        );
    }
}
