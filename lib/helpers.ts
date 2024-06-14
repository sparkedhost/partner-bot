export const getExtension = () => {
   return process.env.NODE_ENV === 'production' ? 'js' : 'ts';
}