import React, {useState, useEffect} from 'react';
import Graph from './Graph';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const e = 2.718;

function integralLinear(x){
	return x ** 2; //linear
}
function integralUniform(x){
	return x;
}
function integralNormal(x){
	return 1/(1+e**-(10*x-6));
}
function integralLogarithmic(x){
	return 1/1.719 * (e ** x - 1);
}

const functionIntegrals = {
	"linear":integralLinear,
	"uniform":integralUniform,
	"normal":integralNormal,
	"logarithmic":integralLogarithmic
}
const FunctionButtons = ()=>{
	const [functionName, setFunctionName] = useState("linear");
	const [keyCount, setKeyCount] = useState(0);

	return (
		<>
			<div>
				{
					Object.keys(functionIntegrals).map(function(functionName, i){
						return <button key = {i} onClick={()=>{
							setFunctionName(functionName);
							setKeyCount(keyCount + 1);
						}}>{functionName}</button>;
					})
				}
			</div>
			<Graph functionIntegral = {functionIntegrals[functionName]} key = {keyCount}/>
		</>
	);
}
export default FunctionButtons;
