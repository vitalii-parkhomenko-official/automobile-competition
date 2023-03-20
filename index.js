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

  const pilot = document.createElement("div");

  pilot.style.top = `${pilotTop}px`;
  pilot.style.left = `${pilotLeft}px`;
  pilot.style.backgroundImage = `url(${pilotImage})`;
  pilot.setAttribute("class", "auto");

  const auto = document.createElement("div");

  auto.style.top = `${autoPositionY}px`;
  auto.style.left = `${autoPositionX}px`;
  auto.style.backgroundImage = `url(${autoImage})`;
  auto.setAttribute("class", "auto");

  screenElement.append(pilot);
  screenElement.append(auto);
}
