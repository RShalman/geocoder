// Transform CSV/TSV to simple array of objects
export function transformToJSON(data) {
  const d = data
    .replace(/"/g, "'")
    .replace(/\r/g, '')
    .split('\n');

  let result = d.map(s =>
    s.split('\t').reduce((acc, x) => {
      if (x == '') {
        return acc;
      }

      return Object.assign(acc, {
        address: x.replace(/,/g, '').replace(/\s/g, '+'),
      });
    }, {})
  );

  return result;
}
