
let map;

function initMap() {
    map = new google.maps.Map(document.querySelector("#map"), {
        mapId: "6d7fac2f87f28a6d",
        center: { lat: 34.6665442278154, lng: 33.00678164597041 },
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
        },
    });

    const branches = [
        {
            position: { lat: 34.67023408576484, lng: 33.01611878371115 },
            icon: "assets/img/active-geotag-icon.png",
            tabClass: "branch-tab-0",
            boxClass: "branch-box-0",
        },
        {
            position: { lat: 34.663183938045364, lng: 33.01417444321938 },
            icon: "assets/img/geotag-icon.png",
            tabClass: "branch-tab-1",
            boxClass: "branch-box-1",
        },
        {
            position: { lat: 34.6583832878914, lng: 32.99997249015476 },
            icon: "assets/img/geotag-icon.png",
            tabClass: "branch-tab-2",
            boxClass: "branch-box-2",
        },
    ];

    const markers = branches.map((branch) => {
        const marker = new google.maps.Marker({
            position: branch.position,
            map,
            animation: google.maps.Animation.DROP,
            icon: {
                url: branch.icon,
                scaledSize: new google.maps.Size(36, 48),
            },
        });

        marker.addListener("click", function () {
            $(".branch-tab").removeClass("active-tab");
            $(".branch-box").hide();
            $(`.${branch.tabClass}`).addClass("active-tab");
            $(`.${branch.boxClass}`).show();

            // Reset icons of all markers
            markers.forEach((m) => {
                m.setIcon({
                    url: m === marker ? "assets/img/active-geotag-icon.png" : "assets/img/geotag-icon.png",
                    scaledSize: new google.maps.Size(36, 48),
                });
            });
        });

        return marker;
    });
}

window.initMap = initMap;