import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    width: '60%',
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginHorizontal: 2,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default styles;
