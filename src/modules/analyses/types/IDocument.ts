export default interface IDocument {
  id: string;
  status: 'valid' | 'fraud' | 'error';
  src: string;
}
