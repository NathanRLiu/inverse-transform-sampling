import React, {useState, useEffect} from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const dictToList = (dict) => {
	let res = [];
	for (const key in dict){
		res.push({"label":key,
			"x":key * 10,
			"y":dict[key]
		});
	}
	return res;
}
const Graph = ()=>{
	const [data, setData] = useState({});
	const [options, setOptions] = useState({});
	function functionIntegral(x){
		return 1/2 * x**2;
	}
	const endBound = 1.414;
	function binarySearch(func, val, start, end){
		let left = start;
		let right = end;
		while (left < right){
			let center = left + (right - left)/2;
			if (Math.abs(functionIntegral(center) - val) < .01){
				return functionIntegral(center);
			}else if (functionIntegral(center) < val){
				left = center;
			}else if (functionIntegral(center) > val){
				right = center;
			}
		}
	}
	let results = data;
	function generate(){
		for (let i = 0; i < 100000; i++){
			let val = Math.random();
			let generatedNum = binarySearch(functionIntegral, val, 0, endBound);
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
				theme: "dark1", //"light1", "dark1", "dark2"
				title:{
					text: "Simple Column Chart with Index Labels"
				},
				axisY: {
					includeZero: false
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
		delayRun(5000);
	});
	
	return (
	<div>
		<CanvasJSChart options = {options} />
	</div>
	);
}
export default Graph;
