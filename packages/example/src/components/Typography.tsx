import React from 'react';

export const Typography = ({ children }: { children: React.ReactNode }) => {
  return <div style={styles.text}>{children}</div>;
};

const styles = {
  text: {
    fontSize: 30,
    color: 'white',
  },
};
