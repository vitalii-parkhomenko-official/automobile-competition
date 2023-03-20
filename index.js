{
  const screenElement = document.querySelector(".screen");
  const rect = screenElement.getBoundingClientRect();
  const autoWidth = rect.width / 3;
  const autoHeight = rect.height / 4;
  const positionLeft = 0;
  const positionCenter = autoWidth;
  const positionRight = autoWidth + autoWidth;
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
  let pilot = createAuto(pilotLeft, pilotTop, pilotImage);

  screenElement.append(pilot);
}
