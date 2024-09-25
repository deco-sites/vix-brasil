export default function ProductImageZoom() {
  const zoom = {
    init() {
      $(document).ready(function () {
        const imageWidth = $("#imageZoom--image").width();
        const imageHeight = $("#imageZoom--image").height();
        $("#imageZoom--image").jqzoom({
          zoomType: "innerzoom",
          zoomWidth: imageWidth,
          zoomHeight: imageHeight,
          preloadImages: false,
          alwaysOn: false,
          title: false,
        });
      });
    },
  };

  zoom.init();
}
