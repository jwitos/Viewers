const AICXRViewport = asyncComponent(() =>
  import(/* webpackChunkName: "AICXRViewport" */ './AICXRViewport.js')
);

const aicxr = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'ai-cxr',

  getViewportModule() {
    return AICXRViewport;
  },
};

export default aicxr;

export { aicxr };
