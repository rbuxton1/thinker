var posts = [
  {
    img: "/img/face.jpg",
    post: "I got a snapshot of my girlfriend during her premiere for her new book. #fromnothingtosomething"
  },
  {
    img: "/img/art.png",
    post: "This is some art I made. They're from powerful words. #imanartist #powerfulwords"
  },
  {
    img: "/img/water.png",
    post: "I'm the only person to have visited this. In facet I think I discovered it myself. #myownworld"
  }
];
var users = [
  "joeMama1989",
  "thatGuy69",
  "xXx_i_am_craxy_xXx",
  "himan54",
  "ILiveInYourWalls45",
  "basmentdweller.exe",
  "thatGuy68",
  "excellent_squid",
  "joenuts45",
  "joebidensdog",
  "lightrail_guy.yaml",
  "squeeorxd",
  "joebama",
  "ceiling__fan",
  "barf1ghter",
  "420wizard",
  "sewer_rat",
  "bogdrinker",
  "stagnant_water_fan",
  "bonesmoker",
  "i_know_where_you_live_maybe5050"
];
var index = 0;
var checker;

function niceRandom(max) {
  return Math.floor(Math.random() * max);
}

function animateToNext(liked){
  $("#app").fadeOut(() => {
    $("#look").fadeIn(() => {
      $.post("/state", {state: liked ? "liked" : "skipped"});
      index++;

      if(index < posts.length) {
        $("#viewed").html(`Viewed by: ${users[niceRandom(users.length)]}, ${users[niceRandom(users.length)]}, ${users[niceRandom(users.length)]}, and ${niceRandom(100)} others.`);
        $("#img").attr("src", posts[index].img);
        $("#post").html(posts[index].post);

        checker = setInterval(() => {
          $.get("/state", (data) => {
            if(data == "idle") {
              $("#look").fadeOut(() => { $("#app").fadeIn(); });
              clearInterval(checker);
            } else console.log("Not done!");
          });
        }, 250);

      } else {
        $("#msg").html("Thank you.");
      }
    });
  });
}

$(document).ready(() => {
  $("#look").hide();
  $("#viewed").html(`Viewed by: ${users[niceRandom(users.length)]}, ${users[niceRandom(users.length)]}, ${users[niceRandom(users.length)]}, and ${niceRandom(100)} others.`);

  $("#like").click(() => {
    animateToNext(true);
  });
  $("#skip").click(() => {
    animateToNext(false);
  });
});
