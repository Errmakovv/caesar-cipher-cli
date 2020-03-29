const { program } = require('commander');
const { pipeline } = require('stream');

const validate = require('./src/validators/validators');
const {
  readStream,
  transformStream,
  writeStream
} = require('./src/streams/streams');

program
    .storeOptionsAsProperties(false)
    .option('-i, --input <input>', 'Input file path')
    .option('-o, --output <output>', 'Output file path')
    .option('-s, --shift <shift>', 'Cipher shift')
    .option('-a, --action <action>', 'Action name')

program.parse(process.argv);
const options = program.opts();

validate(options);
pipeline(
  readStream(options.input),
  transformStream(+options.shift, options.action),
  writeStream(options.output),
  (error) => {
    if(error) console.error;
  }
);
