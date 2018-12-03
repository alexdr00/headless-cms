const fibo = (n = 1, n2 = 1) => {
  if (n > 1000) return;
  console.log(n);
  console.log(n2);
  fibo(n + n2);
};

fibo();
