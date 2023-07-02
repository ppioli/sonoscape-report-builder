import { Font, StyleSheet } from '@react-pdf/renderer';
import SourceSansBold from '../../../../assets/fonts/source-sans/SourceSans3-SemiBold.ttf';
import SourceSans from '../../../../assets/fonts/source-sans/SourceSans3-Regular.ttf';

Font.register({
  family: 'SourceSans',
  src: SourceSans,
});
Font.register({
  family: 'SourceSansBold',
  src: SourceSansBold,
});
export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'SourceSansBold',
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'SourceSans',
  },
  label: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'SourceSansBold',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  fieldRow: {
    marginLeft: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  section: {
    marginBottom: 12,
  },
});
