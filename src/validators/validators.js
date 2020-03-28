const fs = require('fs');
const { ACTIONS } = require('../constants/constants');

const ERRORS = {
	action: 'Please provide correct action\n',
	shift: 'Please provide correct shift\n',
	input: 'Please provide correct input file\n',
	output: 'Please provide correct output file\n'
};

function endProcessWithError(errorMessage) {
	process.stderr.write(errorMessage);
	process.exit(1);
}

function validate({action, shift, input, output}) {

	if (!action || !ACTIONS.includes(action)) {
		endProcessWithError(ERRORS.action)
	}

	if (!shift || !(Number.isInteger(+shift)) || !(shift >= 0)) {
		endProcessWithError(ERRORS.shift)
	}

	if (input) {
		fs.access(input, fs.constants.F_OK | fs.constants.R_OK, (err) => {
			if (err) {
				endProcessWithError(ERRORS.input)
			}
		});
	}

	if (output) {
		fs.access(output, fs.constants.F_OK | fs.constants.W_OK, (err) => {
			if (err) {
				endProcessWithError(ERRORS.output)
			}
		});
	}
}
  
module.exports = validate;