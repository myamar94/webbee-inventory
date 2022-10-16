export const extractIDFromURI = (uri: string | undefined) => {
  if (!uri) {
    return '';
  }
  const uriArr = uri.slice().split('--');
  return uriArr.pop() || '';
};
