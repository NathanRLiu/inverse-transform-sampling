//f(y) = x
//integral(f(y)) = 1/2 * x^2
function functionIntegral(x){
	return 1/2 * x**2;
}
const endBound = 1.414;
function binarySearch(func, val, start, end){
	let left = start;
	let right = end;
	while (left < right){
		let center = left + (right - left)/2;
		if (center < val){
			left = center;
		}else if (center > val){
			right = center;
		}else{
			return center;
		}
	}
}

var results = {};

for (let i = 0; i < 10000; i++){
	const generatedNum = binarySearch(functionIntegral, Math.random(), 0, endBound);
	let roundedNum = generatedNum.toFixed(1);
	if (!(roundedNum in results)){
		results[roundedNum] = 0;
	}
	results[roundedNum] += 1;
}
console.log(results);
