function selectionSort(arr) {
  var n = arr.length;
  var min ;
  for(let i = 0; i<n; i++){
    min = arr[i];
    for(j = i+1; j <n; j++){
    if(min>arr[j]){
      min = arr[j] 
      arr[j]= arr[i];
      arr[i] = min
    }
    }
    
  }
  return arr;
}

console.log(selectionSort([2, 4, 6, 1, 3]));
