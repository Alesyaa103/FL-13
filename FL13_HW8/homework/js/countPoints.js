const isBigger = (a,b) => (a > b);

function countPoints(arr) {
  let team = 0;
  for(let i = 0; i<arr.length; i++) {
    let x = arr[i].split(':')[0];
    let y = arr[i].split(':')[1];
    if (isBigger(x,y)) {
      team +=3;
    } else if (!isBigger(y,x)) {
      team++;
    }
  }
  return team
}

countPoints(['3:1','1:0','0:0','1:2','4:0','2:3','1:1','0:1','2:1','1:0'])