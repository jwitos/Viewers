import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OHIF from '@ohif/core';
import OHIFComponentPlugin from './OHIFComponentPlugin.js';
import DicomPDFViewport from './DicomPDFViewport';
import DicomLoaderService from '../../../platform/viewer/src/lib/dicomLoaderService';

const { DICOMWeb } = OHIF;

class OHIFDicomPDFViewport extends Component {
  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
  };

  state = {
    byteArray: null,
    error: null,
  };

  static id = 'DicomPDFViewportPDF';

  static init() {
    console.log('DicomPDFViewport init()');
  }

  static destroy() {
    console.log('DicomPDFViewport destroy()');
  }

  componentDidMount() {
    const { displaySet, studies } = this.props.viewportData;
    const {
      studyInstanceUid,
      seriesInstanceUid,
      sopInstanceUid,
      wadoRoot,
      wadoUri,
      authorizationHeaders,
    } = displaySet;

    DicomLoaderService.getDicomData(displaySet, studies).then(
      data => {
        var byteArrayData = new Uint8Array(data);
        this.setState({
          byteArray: byteArrayData,
        });
      },
      error => {
        this.setState({
          error,
        });

        throw new Error(error);
      }
    );
  }

  render() {
    const { id, init, destroy } = OHIFDicomPDFViewport;
    const pluginProps = { id, init, destroy };

    return (
      <OHIFComponentPlugin {...pluginProps}>
        {this.state.byteArray && (
          <DicomPDFViewport byteArray={this.state.byteArray} />
        )}
        {this.state.error && <h2>{JSON.stringify(this.state.error)}</h2>}
      </OHIFComponentPlugin>
    );
  }
}

export default OHIFDicomPDFViewport;
