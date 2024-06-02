
let gamma = 0

function handleOrientation(event) {
  gamma = event.gamma;
  console.log("asda");
  alpha = Math.floor(event.gamma);
  // document.getElementById("beta").textContent = event.beta
  //   ? event.beta.toFixed(2)
  //   : "N/A";
  document.getElementById("gamma").textContent = event.gamma
    ? event.gamma.toFixed(2)
    : "N/A";
}
 
export function init() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          alert("Разрешение на доступ к ориентации устройства было отклонено.");
        }
      })
      .catch((error) => {
        console.error(
          "Ошибка запроса разрешения на ориентацию устройства:",
          error
        );
        alert("Ошибка запроса разрешения на ориентацию устройства.");
      });
  } else if (window.DeviceOrientationEvent) {
    // For browsers that do not require permission
    window.addEventListener("deviceorientation", handleOrientation);
  } else {
    alert("Device Orientation API not supported.");
  }
  return gamma
}


