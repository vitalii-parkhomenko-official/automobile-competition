{
  const screenElement = document.querySelector(".screen");
  const rect = screenElement.getBoundingClientRect();
  const autoWidth = rect.width / 3;
  const autoHeight = rect.height / 4;
  const positionLeft = 0;
  const positionCenter = autoWidth;
  const positionRight = autoWidth + autoWidth;
  const autoPositionX = positionLeft; // positionCenter, positionRight
  const autoPositionY = 0;
  const autoImage = "./2-auto.png";
  const pilotLeft = positionCenter;
  const pilotTop = rect.height - autoHeight;
  const pilotImage = "./1-pilot.png";
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

  const pilot = createAuto(pilotLeft, pilotTop, pilotImage);
  const auto = createAuto(autoPositionX, autoPositionY, autoImage);

  screenElement.append(pilot);
  screenElement.append(auto);

  const animateAuto = () => {
    const autoTop = parseFloat(auto.style.top);

    if (autoTop >= rect.height) {
      auto.remove();
    } else {
      auto.style.top = `${autoTop + (stage + delta)}px`;
    }
  };

  setInterval(animateAuto, 10);

  const handleKeydown = (event) => {
    const left = parseFloat(pilot.style.left);

    if (event.key === "ArrowRight" && (left < positionRight)) {
      pilot.style.left = `${left + autoWidth}px`;
    }

    if (event.key === "ArrowLeft" && (left > positionLeft)) {
      pilot.style.left = `${left - autoWidth}px`;
    }
  };

  document.addEventListener("keydown", handleKeydown);
}
