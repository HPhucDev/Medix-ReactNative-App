import React, {useImperativeHandle, useState} from 'react';
import {View, StyleSheet} from 'react-native';

export const globalLoadingRef = React.createRef<any>();

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

const GlobalLoading = React.forwardRef((__props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {show: show, hide: hide};
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return visible ? <View style={[styles.loading]}></View> : <></>;
});

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
    backgroundColor: '#FFFFF4',
    opacity: 0.6,
  },
});
export default GlobalLoading;
