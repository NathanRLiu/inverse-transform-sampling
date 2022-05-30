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
	return 1/(1+e**-(10*x-5));
}
function integralBimodal(x){
	return 1/(2+e**-(30*x-5)) + 1/(2+e**-(15*x-10));
}
function integralExponential(x){
	return 1/1.719 * (e ** x - 1);
}
function integralLogarithmic(x){
	const C = 1.7183;
	return (C*x+1) * Math.log(C*x+1) - C*x;
}

const functionIntegrals = {
	"Linear":integralLinear,
	"Uniform":integralUniform,
	"Normal":integralNormal,
	"Exponential":integralExponential,
	"Logarithmic":integralLogarithmic,
	"Bimodal":integralBimodal
}
const FunctionButtons = ()=>{
	const [functionName, setFunctionName] = useState("Linear");
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
			<Graph functionIntegral = {functionIntegrals[functionName]} functionName = {functionName} key = {keyCount}/>
		</>
	);
}
export default FunctionButtons;
