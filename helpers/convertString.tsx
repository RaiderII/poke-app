export default function convertString(id: string[] | number | string) {
  if (typeof id[0] === 'string') {
    id = id[0].split('');

    switch (id.length) {
      case 3:
        id.splice(1, 0, '00');
        id.splice(3, 1);
        break;

      case 4:
        id.splice(1, 0, '0');
        id.splice(4, 1);
        break;

      case 5:
        id.splice(4, 1);
        break;
    }
    return id.join('');
  }

  if (typeof id === 'number') {
    console.log('this is the id', id);
    id = id.toString();

    const result = [];

    switch (id.length) {
      case 1:
        result.push('00', id);
        break;

      case 2:
        result.push('0', id);
        break;

      default:
        result.push(id);
        break;
    }
    return result.join('');
  }
}
