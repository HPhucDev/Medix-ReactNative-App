import React, {useImperativeHandle, useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {IconSvg} from '../customs/CustomSvgIcon';
import SuccessIcon from '../../assets/svg/success-icon.svg';
import FailedIcon from '../../assets/svg/failed-icon.svg';
import Text from '../customs/Text';
import {navigate} from '../../../App';
import {PATCH_SCREEN} from '../../constants/pathName';
import IconFeather from 'react-native-vector-icons/FontAwesome';

interface ModalState {
  visible: boolean;
  title?: string;
  description?: string;
  descriptionText?: string;
  viewDetail?: boolean;
  acceptText?: string;
  type: 'success' | 'failed';
}

type ModalType = 'success' | 'failed';
export const globalModalRef = React.createRef<any>();

export const globalModal = {
  show: ({
    title,
    description,
    descriptionText,
    viewDetail,
    acceptText,
    type,
  }: {
    title?: string;
    description?: string;
    descriptionText?: string;
    viewDetail?: boolean;
    acceptText?: string;
    type: ModalType;
  }) => {
    globalModalRef?.current?.show({
      title,
      description,
      descriptionText,
      viewDetail,
      acceptText,
      type,
    });
  },
  hide: () => {
    globalModalRef?.current?.hide();
  },
};

const GlobalModal = React.forwardRef((__props, ref) => {
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    description: '',
    descriptionText: '',
    viewDetail: false,
    acceptText: '',
    type: 'failed',
  });

  useImperativeHandle(ref, () => {
    return {show, hide};
  });

  const show = ({
    title,
    description,
    descriptionText,
    viewDetail,
    acceptText,
    type,
  }: {
    title?: string;
    description?: string;
    acceptText?: string;
    descriptionText?: string;
    viewDetail?: boolean;
    type: ModalType;
  }) => {
    setModal({
      visible: true,
      title,
      description,
      descriptionText,
      viewDetail,
      acceptText,
      type,
    });
  };

  const hide = () => {
    setModal({
      ...modal,
      visible: false,
      title: '',
      description: '',
      descriptionText: '',
      viewDetail: false,
      acceptText: '',
    });
  };

  const handleNavigateScreen = () => {
    globalModal.hide();
    navigate(PATCH_SCREEN.HISTORY);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal.visible}
      onRequestClose={hide}>
      <TouchableOpacity style={styles.centerModal} onPressOut={hide}>
        <TouchableWithoutFeedback>
          <View style={styles.contentViewModal}>
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <IconSvg
                Icon={modal.type === 'success' ? SuccessIcon : FailedIcon}
                width={50}
                height={50}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'rgba(60, 60, 67, 0.29)',
              }}>
              <Text style={styles.titleText}>{modal.title} </Text>
              <Text style={styles.descriptionText}>{modal.description}</Text>
              <Text style={styles.subDescriptionText}>
                {modal.descriptionText}
              </Text>
              {modal.viewDetail && (
                <TouchableOpacity
                  style={styles.btnViewDetail}
                  onPress={handleNavigateScreen}>
                  <Text style={styles.blackColor}>Xem chi tiết</Text>
                  <IconFeather
                    name="long-arrow-right"
                    size={15}
                    style={styles.blackColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity style={styles.acceptButton} onPress={hide}>
                {modal.acceptText ? (
                  <Text style={styles.acceptText}>{modal.acceptText}</Text>
                ) : modal.type === 'success' ? (
                  <View style={styles.btnSuccess}>
                    <Text style={styles.btnSuccessText}>OK</Text>
                  </View>
                ) : modal.type === 'failed' ? (
                  <Text style={styles.acceptText}>OK</Text>
                ) : (
                  ''
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 14,
  },
  subDescriptionText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 21,
    marginBottom: 10,
  },
  contentViewModal: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingHorizontal: 30,
  },
  btnSuccess: {
    width: 227,
    paddingVertical: 11,
    borderRadius: 33,
    backgroundColor: '#1BB55C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  btnSuccessText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 16,
  },
  noButton: {
    alignItems: 'center',
    flex: 0.5,
    paddingVertical: 11,
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(60, 60, 67, 0.29)',
  },
  noText: {
    fontSize: 18,
  },
  acceptButton: {
    alignItems: 'center',
    flex: 0.5,
    paddingVertical: 11,
  },
  acceptText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25,
    color: '#005BE0',
    width: '160%',
    textAlign: 'center',
  },
  blackColor: {
    color: '#000',
    marginLeft: 4,
  },
  btnViewDetail: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default GlobalModal;
