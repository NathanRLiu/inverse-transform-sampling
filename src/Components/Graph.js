import React, {useState, useEffect} from 'react';
import CanvasJSReact from './canvasjs.react';
import ReactSlider from "react-slider";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const dictToList = (dict) => {
	let res = [];
	for (const key in dict){
		res.push({"label":key,
			"x":key * 10,
			"y":(key == 0 || key == 1)?dict[key] * 2:dict[key]
		});
	}
	return res;
}

const Graph = (props)=>{
	const [data, setData] = useState({});
	const [shouldWipe, setShouldWipe] = useState(false);
	const [options, setOptions] = useState({});
	const [genRate, setGenRate] = useState(10);

	const endBound = 1;
	let runCount = 1;
	let functionIntegral = props.functionIntegral;
	function binarySearch(func, val, start, end){
		let left = start;
		let right = end;
		while (left < right){
			let center = left + (right - left)/2;
			if (Math.abs(functionIntegral(center) - val) <= .0001){
				return center;
			}else if (functionIntegral(center) < val){
				left = center;
			}else if (functionIntegral(center) > val){
				right = center;
			}
		}
		let center = left + (right - left) /2;
		if (center > endBound/2){
			return endBound;
		}else{
			return 0;
		}
	}
	let results = data;
	function generate(){
		runCount++;
		for (let i = 0; i < genRate; i++){
			let val = Math.random();
			let generatedNum = binarySearch(functionIntegral, val, 0, endBound);
			//let generatedNum = functionIntegral(val);
			let roundedNum = generatedNum.toFixed(1);
			//console.log("val: " + val + "generatedNum: " + roundedNum);
			if (!(roundedNum in results)){
				results[roundedNum] = 0;
			}
			results[roundedNum] += 1;
		}
	}
	
	const delayRun = (delay)=>{
		setTimeout(()=>{
			setData(results)
			setOptions({
				animationEnabled: true,
				exportEnabled: true,
				theme: "dark2", //"light1", "dark1", "dark2"
				title:{
					text: props.functionName + " Distribution"
				},
				axisY: {
					includeZero: true
				},
				data: [{
					type: "column", //change type to bar, line, area, pie, etc
					//indexLabel: "{y}", //Shows y value on all Data Points
					indexLabelFontColor: "#5A5757",
					indexLabelPlacement: "outside",
					dataPoints:dictToList(data)
				}]
			});

		}, delay);

	}
	useEffect(()=>{
		generate();
		delayRun(500);
	});
	
	return (
		<>
			<div className="canvas">
				<CanvasJSChart options = {options} />
			</div>
			<ReactSlider
				className="horizontal-slider"
				thumbClassName="example-thumb"
				trackClassName="example-track"
				onChange = {(newRate)=>{setGenRate(newRate)}}
			/>
			<p>
				Samples per second: {genRate * 2}
			</p>
		</>
	);
}
export default Graph;
