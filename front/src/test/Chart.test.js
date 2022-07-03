import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import Chart from "../components/Chart";
const CHART_NAME = "Stocks chart";
const CHART_COLOR = "red";
const chartData = {
	name: CHART_NAME,
	color: CHART_COLOR,
	items:
		[
			{
				"timestamp": "2022-07-01T12:23:27.109Z",
				"index": 0,
				"stocks": "19.595"
			},
			{
				"timestamp": "2022-06-30T12:23:27.114Z",
				"index": 1,
				"stocks": "16.221"
			},
			{
				"timestamp": "2022-06-29T12:23:27.114Z",
				"index": 2,
				"stocks": "21.774"
			}
		]
}

const dimensions = {
	width: 1000,
	height: 350,
	margin: {
		top: 30,
		right: 30,
		bottom: 30,
		left: 60
	}
};
const svgWidth = dimensions.width +  dimensions.margin.left +  dimensions.margin.right;
const svgHeight =  dimensions.height +  dimensions.margin.top + dimensions.margin.bottom;

afterEach(() => {
	cleanup();
})

describe("chart  Component", () => {
	// test if it the rigth heigth and width
	test("chart attributes", () => {
		render(<Chart data={[chartData]} dimensions={dimensions} />);
		const chart = screen.getByTestId("chart");
		console.log("chart", chart);

		expect(chart).toBeInTheDocument();
		expect(chart).toHaveAttribute('width', String(svgWidth));
		expect(chart).toHaveAttribute('height', String(svgHeight));
	})
})
