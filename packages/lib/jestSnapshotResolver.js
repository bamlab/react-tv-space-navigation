module.exports = {
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',
  /** resolves from test to snapshot path */
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return testPath + snapshotExtension;
  },
  /** resolves from snapshot to test path */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath.slice(0, -snapshotExtension.length);
  },
};
