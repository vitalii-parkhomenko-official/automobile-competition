{
  const screenElement = document.querySelector(".screen");
  const buttonElement = document.querySelector(".buttons");
  const rect = screenElement.getBoundingClientRect();
  const autoWidth = rect.width / 3;
  const autoHeight = rect.height / 4;
  const positionLeft = 0;
  const positionCenter = autoWidth;
  const positionRight = autoWidth + autoWidth;
  const autoPositionX = [
    positionLeft,
    positionCenter,
    positionRight
  ];
  const autoPositionY = -autoHeight;
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
  let stage = 0;
  let delta = 1;
  let interval = null;
  let auto = createAuto(randomInArray(autoPositionX), autoPositionY, randomInArray(autoImages));
  let pilot = createAuto(pilotLeft, pilotTop, pilotImage);

  const animate = () => {
    const autoTop = parseFloat(auto.style.top);

    if (autoTop >= rect.height) {
      auto.remove();
    } else {
      auto.style.top = `${autoTop + (stage + delta)}px`;
    }
  };
  const reset = () => {
    clearInterval(interval);
    pilot.remove();
    pilot = createAuto(pilotLeft, pilotTop, pilotImage);
    screenElement.append(pilot);

    auto.remove();
    auto = createAuto(randomInArray(autoPositionX), autoPositionY, randomInArray(autoImages));
    screenElement.append(auto);

    stage = 0;
    interval = null;
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
