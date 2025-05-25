function mojoMutkiCalculationFun(value) {
  let mojoCount = value;
  let mutkiCount = value;

  while (mutkiCount >= 3) {
    let newMojo = Math.floor(mutkiCount / 3);

    mojoCount += newMojo;
    mutkiCount = (mutkiCount % 3) + newMojo;
  }

  return mojoCount;
}

const res = mojoMutkiCalculationFun(10);

console.log(res);
