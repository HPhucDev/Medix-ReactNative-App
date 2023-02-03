import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import Text from '../customs/Text';
import styles from './styles';

interface Props {
  message?: string;
  style?: StyleProp<ViewStyle>;
}
const EmptyData = (props: Props) => {
  return (
    <View style={[styles.wrapperNoData, props.style]}>
      <IconFeather size={22} name="cloud-off" color="#000" />
      <Text style={styles.noData}>{props.message || `Không có dữ liệu!`}</Text>
    </View>
  );
};

export default EmptyData;
