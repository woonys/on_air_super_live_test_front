import { StyleSheet } from 'react-native';
import * as Utility from '../../utils/utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  contentWrapper: { flex: 1 },
  header: { flex: 0.1, justifyContent: 'space-around', flexDirection: 'row' },
  // footer: { flex: 0.1 },
  body: { flex: 0.9 },
  footerBar: { flex: 1, flexDirection: 'row-reverse' },
  // footerBar: { height: 600 },
  streamerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Utility.screenHeight,
    width: Utility.screenWidth,
  },
  btnClose: { position: 'absolute', top: 15, left: 15 },
  icoClose: { width: 28, height: 28 },
  bottomGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnBeginLiveStream: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  btnLink: {
    position: 'absolute',
    top: 458,
    left: 197,
    borderRadius: 8,
    width: 200,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btnImage: {
    flex: 0.3,
    // position: 'absolute',
    // top: 458,
    // left: 197,
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  btnLinkText: {
    flex: 0.7,
    fontSize: 17,
    paddingHorizontal: 10,
    fontWeight: '600',
    color: 'black',
  },
  beginLiveStreamText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transParent: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
  },
  linkContainerStyle: {
    backgroundColor: 'rgba(239, 239, 244, 0.7)',
    position: 'absolute',
    top: 458,
    left: 197,
    flexDirection: 'row',
    width: 200,
    height: 70,
    flex: 0.5,
  },
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 70,
    height: 70,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 0.3,
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  titleStyle: {
    fontSize: 10,
    color: '#000',
    marginBottom: 5,
  },
  descriptionStyle: {
    fontSize: 8,
    color: 'grey',
  },
  imageProps: { resizeMode: 'contain' },
  hide: {
    width: 0,
    height: 0,
  },
});

export default styles;
