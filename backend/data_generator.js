exports.getRandomData = function (json, player) {
  const keys = Object.keys(json)

  const randIndex = Math.floor(Math.random() * keys.length)

  const randKey = keys[randIndex]

  return {
    time: new Date().toLocaleTimeString(),
    xAxis: json[randKey].X,
    yAxis: json[randKey].Y,
    zAxis: json[randKey].Z,
    danceMove: getDanceMove(),
    position: getPosition(),
  }
}

function getDanceMove() {
  let random = Math.floor(Math.random() * 8)
  // console.log(random)
  if (random === 1) {
    return 'Dab'
  } else if (random === 2) {
    return 'Elbow-Kick'
  } else if (random === 3) {
    return 'Gun'
  } else if (random === 4) {
    return 'Hair'
  } else if (random === 5) {
    return 'Listen'
  } else if (random === 6) {
    return 'Point-High'
  } else if (random === 7) {
    return 'Side-Pump'
  } else if (random === 8) {
    return 'Wipe-Table'
  } else {
    return 'Neutral'
  }
}

function shuffle(o) {
  for (
    let j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o
}

function getPosition() {
  let numbers = [1, 2, 3]
  let random = shuffle(numbers)

  return random
}

exports.getTestLogData = function (json) {
  const keys = Object.keys(json)

  const randIndex = Math.floor(Math.random() * keys.length)

  const randKey = keys[randIndex]

  return json[randKey]
}
