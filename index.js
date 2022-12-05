const iniciar = () => {
  // MÉTODO
  // 8x + 4y -2z = 24
  // 0x + 2y - z = 1
  // 2x - y + z = 3

  const n = 4;
  const despeje1 = [0, -1 / 2, 1 / 2, -1 / 2, 4];
  const despeje2 = [0, 0, -1 / 2, 1 / 2, 1];
  const despeje3 = [0, -1, 0, 1, 4];
  const despeje4 = [-1 / 2, 1 / 2, 0, 0, -1];

  const despejes = [despeje1, despeje2, despeje3, despeje4];
  //const despeje1 = "(24 - 4x^2 + 2x^3) / 8";
  //const despeje2 = "(1 - (0*x) +x^3)/2";
  //const despeje3 = "(3 - 2x +x^2)";
  /*
  const despejes = [
    math.rationalize(despeje1, {}, true),
    math.rationalize(despeje2, {}, true),
    math.rationalize(despeje3, {}, true),
  ];

  for (let index = 0; index < despejes.length; index++) {
    despejes[index].coefficients.reverse();
  }

  for (let index = 0; index < despejes.length; index++) {
    if (despejes[index].coefficients.length < n + 1) {
      console.log(despejes[index]);
      console.log("ALgo mal");
    }
  }

  //despejes[2].coefficients.unshift(0);

  console.log(despejes[0].coefficients);
  console.log(despejes[1].coefficients);
  console.log(despejes[2].coefficients);
  */
  //sistemasLinealesIterativos(Array.from(despejes), true, n);
  console.log("=================");
  sistemasLinealesIterativos(Array.from(despejes), false, n);
};

const sistemasLinealesIterativos = (despejes, esJacobi, n) => {
  const matrizT = [];
  const matrizC = [];
  let matrizAnterior = [];
  const error = 0.01;

  for (let index = 0; index < n; index++) {
    matrizAnterior[index] = 0;
    matrizT[index] = [];
  }

  /*
  for (let index = 0; index < 3; index++) {
    for (let indexC = 1; indexC <= 3; indexC++) {
      if (index == indexC - 1) {
        matrizT[index][indexC - 1] = 0;
      } else {
        matrizT[index][indexC - 1] = despejes[index].coefficients[3 - indexC];
      }
    }
    matrizC[index] =
      despejes[index].coefficients[despejes[index].coefficients.length - 1];
  }*/

  for (let index = 0; index < n; index++) {
    for (let indexC = 1; indexC <= n; indexC++) {
      matrizT[index][indexC - 1] = despejes[index][indexC - 1];
    }
    matrizC[index] = despejes[index][n];
  }

  if (esJacobi) {
    console.log(jacobi(matrizT, matrizC, matrizAnterior, error, 0));
  } else {
    console.log(gaussSeidel(matrizT, matrizC, matrizAnterior, error, 0, n));
  }
};

const jacoviS = () => {
  // MÉTODO
  // 5x + 2y - 3z = 1
  // 2x + 10y - 8z = 4
  // 3x + 8y + 13z = 7
  //const despeje1 = "(1 - 2x^2 + 3x^3)/5";
  //const despeje2 = "(4-2x+8x^3)/10";
  //const despeje3 = "(7 -3x -8x^2)/13";
  const despeje1 = "(-2x^2 + x^3 - 2)/9";
  const despeje2 = "(3-7x-5x^3)/8";
  const despeje3 = "(6 -3x -4x^2)/-10";
  const despejes = [
    math.rationalize(despeje1, {}, true),
    math.rationalize(despeje2, {}, true),
    math.rationalize(despeje3, {}, true),
  ];

  for (let index = 0; index < despejes.length; index++) {
    despejes[index].coefficients.reverse();
  }

  despejes[2].coefficients.unshift(0);

  const matrizT = [[], [], []];
  const matrizC = [];
  let matrizAnterior = [0, 0, 0];

  for (let index = 0; index < 3; index++) {
    for (let indexC = 1; indexC <= 3; indexC++) {
      if (index == indexC - 1) {
        matrizT[index][indexC - 1] = 0;
      } else {
        matrizT[index][indexC - 1] = despejes[index].coefficients[3 - indexC];
      }
    }
    matrizC[index] =
      despejes[index].coefficients[despejes[index].coefficients.length - 1];
  }
  const error = 0.0001;
  //console.log(matrizT);
  //console.log(matrizC);

  //console.log(gaussSeidel(matrizT, matrizC, matrizAnterior, error, 0));
  let iteracion = 0;
  while (true) {
    console.log(iteracion + 1);
    const matrizResultante = math.add(
      math.multiply(matrizT, matrizAnterior),
      matrizC
    );
    const norma = math.norm(
      math.subtract(matrizResultante, matrizAnterior),
      Infinity
    );
    iteracion++;
    matrizAnterior = matrizResultante;
    if (norma <= error) {
      break;
    }
  }

  console.log(matrizAnterior);
};

const seidelS = () => {
  // MÉTODO
  // 9x + 2y - z = -2
  // 7x + 8y + 5z = 3
  // 3x + 4y - 10z = 6
  const despeje1 = "(-2x^2 + x^3 - 2)/9";
  const despeje2 = "(3-7x-5x^3)/8";
  const despeje3 = "(6 -3x -4x^2)/-10";
  const despejes = [
    math.rationalize(despeje1, {}, true),
    math.rationalize(despeje2, {}, true),
    math.rationalize(despeje3, {}, true),
  ];

  for (let index = 0; index < despejes.length; index++) {
    despejes[index].coefficients.reverse();
  }

  despejes[2].coefficients.unshift(0);

  const matrizT = [[], [], []];
  const matrizC = [];
  let matrizAnterior = [0, 0, 0];

  for (let index = 0; index < 3; index++) {
    for (let indexC = 1; indexC <= 3; indexC++) {
      if (index == indexC - 1) {
        matrizT[index][indexC - 1] = 0;
      } else {
        matrizT[index][indexC - 1] = despejes[index].coefficients[3 - indexC];
      }
    }
    matrizC[index] =
      despejes[index].coefficients[despejes[index].coefficients.length - 1];
  }
  const error = 0.0001;
  //console.log(matrizT);
  //console.log(matrizC);

  console.log(gaussSeidel(matrizT, matrizC, matrizAnterior, error, 0));
};

const jacobi = (matrizT, matrizC, matrizAnterior, error, iteracion) => {
  iteracion++;
  console.log(iteracion);
  const matrizResultante = math.add(
    math.multiply(matrizT, matrizAnterior),
    matrizC
  );
  const norma = math.norm(
    math.subtract(matrizResultante, matrizAnterior),
    Infinity
  );
  if (norma >= error) {
    return jacobi(matrizT, matrizC, matrizResultante, error, iteracion);
  }
  return matrizResultante;
};

const gaussSeidel = (matrizT, matrizC, matrizAnterior, error, iteracion, n) => {
  iteracion++;
  console.log(iteracion);
  let matrizResultante = Array.from(matrizAnterior);
  for (let index = 0; index < n; index++) {
    matrizResultante[index] = math.add(
      math.multiply(matrizT, matrizResultante)[index],
      matrizC[index]
    );
  }
  const norma = math.norm(
    math.subtract(matrizResultante, matrizAnterior),
    Infinity
  );
  console.log(matrizResultante);
  console.log(norma);
  if (norma >= error) {
    return gaussSeidel(matrizT, matrizC, matrizResultante, error, iteracion, n);
  }
  return matrizResultante;
};
