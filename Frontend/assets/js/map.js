
let map;

function initMap() {
  map = new google.maps.Map(document.querySelector("#map"), {
    mapId: "6d7fac2f87f28a6d",
    center: { lat: 34.7061323, lng: 33.1166691 },
    zoom: 12,
    disableDefaultUI: true,
  });
  initZoomControl(map);
}

function initZoomControl(map) {
  document.querySelector(".zoom-control-in").onclick = function () {
    map.setZoom(map.getZoom() + 1);
  };

  document.querySelector(".zoom-control-out").onclick = function () {
    map.setZoom(map.getZoom() - 1);
  };

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.querySelector(".zoom-control"),
  );
}




window.initMap = initMap;