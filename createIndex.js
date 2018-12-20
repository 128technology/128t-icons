const path = require('path');
const fs = require('fs');

const PATH = path.join(__dirname, 'raw');

const titleCase = fileName => fileName
  .split('-')
  .map(x => `${x[0].toUpperCase()}${x.slice(1)}`)
  .join('');

fs.readdir(PATH, (err, files) => {
  if (err) {
    return console.error('Error reading directory', err);
  }

  const out = files
    .map(x => path.basename(x, '.svg'))
    .map(x => `export { default as ${titleCase(x)} } from './${titleCase(x)}';`)
    .join('\n');
  
  fs.writeFile('index.ts', out, err => {
    if (err) {
      return console.error('Error writing index file', err);
    }

    console.log('Index file written to ./');
  });
});