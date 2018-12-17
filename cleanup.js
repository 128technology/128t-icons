const path = require('path');
const fs = require('fs');

const READ_PATH = './raw';
const UNLINK_PATH = './';

const titleCase = fileName => fileName
  .split('-')
  .map(x => `${x[0].toUpperCase()}${x.slice(1)}`)
  .join('');

fs.readdir(READ_PATH, (err, files) => {
  if (err) {
    return console.error('Error reading directory', err);
  }

  files
    .map(x => path.basename(x, '.svg'))
    .reduce((acc, x) => {
      const fileName = path.join(UNLINK_PATH, titleCase(x));
      return acc.concat([fileName + '.tsx', fileName + '.js', fileName + '.d.ts']);
    }, [])
    .concat(['index.ts', 'index.js', 'index.d.ts'])
    .forEach(fs.unlinkSync);
});