let amount = prompt('enter an amount of money');
let max = 100;

if (amount <= 0 || isNaN(amount)) {
  alert('Invalid input data');
} else {
  let percent = prompt('enter percent');
  if (percent <= 0 || isNaN(percent) || percent > max) {
    alert('Invalid input data');
  } else {
    let tip = amount * percent / max;
    alert(`Check number: ${amount}
Tip: ${percent}%
Tip amount: ${tip}
Total sum to pay: ${Math.floor((+amount + +tip) * max) / max}`);
  }
}