import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import ErrorMessage from "../components/ErrorMessage";
const message = "that is an Error test"
// afterEach function runs after each test suite is executed
afterEach(() => {
	cleanup();
})

describe("Error Component" ,() => {
    // test if it retrieves the right message 
	test("Text Rendering", () => {
		render(<ErrorMessage message={message}/>);
		const text = screen.getByTestId("error-message");
		expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent(message);

	})
})
