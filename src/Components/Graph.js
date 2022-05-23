import React, {useState, useEffect} from 'react';
import CanvasJSReact from './canvasjs.react';
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
const Graph = ()=>{
	const [data, setData] = useState({});
	const [options, setOptions] = useState({});
	function functionIntegral(x){
		return x ** 2; //linear
		//return x;//uniform
		const e = 2.718;
		//return 1/(1+e**-(10*x-6));
		//return 1/1.719 * (e ** x - 1);
	}
	const endBound = 1;
	let runCount = 1;
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
		for (let i = 0; i < runCount ** 2; i++){
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
					text: "Linear Distribution"
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
		delayRun(100);
	});
	
	return (
	<div>
		<CanvasJSChart options = {options} />
	</div>
	);
}
export default Graph;
