{
  const screenElement = document.querySelector(".screen");
  const scoresElement = document.querySelector(".scores > span");
  const buttonElement = document.querySelector(".buttons");
  const rect = screenElement.getBoundingClientRect();
  const autoWidth = rect.width / 3;
  const autoHeight = rect.height / 4;
  const positionLeft = 0;
  const positionCenter = autoWidth;
  const positionRight = autoWidth + autoWidth;
  const autoPositionX = [
    [positionLeft],
    [positionCenter],
    [positionRight],
    [positionLeft, positionCenter],
    [positionCenter, positionRight],
    [positionLeft, positionRight]
  ];
  const autoPositionY = -autoHeight;
  const autoPositionsY = [
    autoPositionY,
    autoPositionY * 1.5,
    autoPositionY * 2,
    autoPositionY * 2.5,
  ];
  const autoImages = [
    "./2-auto.png",
    "./3-auto.png",
    "./4-auto.png",
    "./5-auto.png",
    "./6-auto.png",
    "./7-auto.png",
  ];
  const pilotLeft = positionCenter;
  const pilotTop = rect.height - autoHeight;
  const pilotImage = "./1-pilot.png";
  const randomInArray = (array) => array[Math.floor(Math.random() * array.length)];
  const createAuto = (left, top, img) => {
    const element = document.createElement("div");

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.backgroundImage = `url(${img})`;
    element.setAttribute("class", "auto");

    return element;
  };
  const getAutos = () => randomInArray(autoPositionX).map(positionX => createAuto(positionX, randomInArray(autoPositionsY), randomInArray(autoImages)));
  let stage = 5;
  let delta = 1;
  let interval = null;
  let autos = [];
  let pilot = createAuto(pilotLeft, pilotTop, pilotImage);

  const animate = () => {
    for (const auto of autos) {
      const autoTop = parseFloat(auto.style.top);
      const autoBottom = autoTop + autoHeight;

      if (parseFloat(pilot.style.top) <= autoBottom && parseFloat(pilot.style.left) === parseFloat(auto.style.left)) {
        const message = `Game over!\nYou scores ${scoresElement.innerHTML}!`;

        reset();
        alert(message);
      } else {
        if (autoTop >= rect.height) {
          scoresElement.innerHTML = (parseInt(scoresElement.innerHTML, 10) + 100).toString();
          stage += 0.0005;

          const index = autos.indexOf(auto);

          auto.remove();
          autos.splice(index, 1);
        } else {
          auto.style.top = `${autoTop + (stage + delta)}px`;
        }
      }
    }

    if (!autos.length) {
      autos = getAutos();
      autos.forEach(auto => screenElement.append(auto));
    }
  };
  const reset = () => {
    clearInterval(interval);
    pilot.remove();
    pilot = createAuto(pilotLeft, pilotTop, pilotImage);
    screenElement.append(pilot);

    autos.forEach(auto => auto.remove());
    autos = getAutos();
    autos.forEach(auto => screenElement.append(auto));

    stage = 0;
    interval = null;

    scoresElement.innerHTML = '0';
  };
  const start = () => {
    interval = setInterval(animate, 10);
  };
  const handleKeydown = (event) => {
    const left = parseFloat(pilot.style.left);

    if (event.key === "ArrowRight" && (left < positionRight)) {
      pilot.style.left = `${left + autoWidth}px`;
    }

    if (event.key === "ArrowLeft" && (left > positionLeft)) {
      pilot.style.left = `${left - autoWidth}px`;
    }
  };
  const handleClick = (event) => {
    if (event.target.id === "start") {
      reset();
      start();
    }

    if (event.target.id === "reset") {
      reset();
    }
  };

  document.addEventListener("keydown", handleKeydown);
  buttonElement.addEventListener("click", handleClick);

  reset();
}
