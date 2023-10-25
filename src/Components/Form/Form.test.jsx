import Form from './index'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Testing Form', () => {
	test('If a user makes a request, ', async () => {

		let testNumber = null;

		function handleSubmit(value) {
			testNumber = value
		}

		render(<Form onSubmit={handleSubmit}/>);

		let inputElement = screen.getByTestId('form-input');
		fireEvent.change(inputElement, {target: {value: 0}}) // Changing an input element

		let buttonElement = screen.getByTestId('form-button');
		fireEvent.click(buttonElement); // Simulate clicking the submit button

		expect(testNumber).toEqual(0);
	});
});
