
let gamma = 0

function handleOrientation(event) {
  gamma = Math.floor(event.gamma)  ;
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


