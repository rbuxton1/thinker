var videos = {
  liked: [
    "/videos/liked/cash.mp4",
    "/videos/liked/happy1.mp4",
    "/videos/liked/happy2.mp4"
  ],
  skipped: [
    "/videos/skipped/swords.mp4",
    "/videos/skipped/mad1.mp4",
    "/videos/skipped/mad2.mp4"
  ],
  idle: "/videos/idle.mp4"
};
var checker = null;

function niceRandom(max) {
  return Math.floor(Math.random() * max);
}

$(document).ready(() => {
  $("#video").on("play", () => {
    if(checker == null){
      console.log("playing");
      checker = setInterval(() => {
        $.get("/state", (data) => {
          console.log(data);
          switch (data) {
            case "skipped":
              $("#container").fadeOut(250, () => {
                $("#video").attr("src", videos.skipped[niceRandom(videos.skipped.length)]);
                $("#video").on("play", () => {
                  $("#container").fadeIn(250);
                });
              });
              $.post("/state", {state: "idle"});
              break;
            case "liked":
              $("#container").fadeOut(250, () => {
                $("#video").attr("src", videos.liked[niceRandom(videos.liked.length)]);
                $("#container").fadeIn(350);
              });
              $.post("/state", {state: "idle"});
              break;
            case "idle":
              if($("#video").attr("src") != videos.idle)
                $("#container").fadeOut(250, () => {
                  $("#video").attr("src", videos.idle);
                  $("#container").fadeIn(350);
                });
              break;
            default:
              $.post("/state", {state: "idle"});
              break;
          }
        })
      }, 5000);
    }
  });
});
