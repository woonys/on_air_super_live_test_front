import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
// 여기서도 button 그려주는 것에 대해서만 넣어야 된다. 클릭했을 때 링크 타는 로직은 index.js에서 구현.

const LinkButton = ({ onPress, roomName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnLink}>
      <Text style={styles.beginLiveStreamText}>{roomName}</Text>
    </TouchableOpacity>
  );
};

LinkButton.propTypes = {
  onPress: PropTypes.func,
  roomName: PropTypes.string,
};

LinkButton.defaultProps = {
  onPress: () => null,
  roomName: '',
};
export default LinkButton;
