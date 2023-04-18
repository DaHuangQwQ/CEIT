<template>
  <div id="topBg"></div>
  <div id="bgDarkMask"></div>
  <div id="topTitle">
    <h1>{{ topTitle }}</h1>
    <!--    <span class="bar"></span>-->
    <h2>
      <span>/*</span>
      CEIT 工作室
      <span>*/</span>
    </h2>
  </div>
  <div id="scrollDown">
    <span id="scrollDownIcon"></span>
  </div>
  <div id="about">
    <h3>关于我们</h3>
    <div class="tagBox">
      <span>CEIT</span>
      <span>前端</span>
      <span>后端</span>
      <span>CEIT</span>
    </div>
    <div class="aboutContent">
      <p>沈师软件学院是一个富有科技创新能力的学院</p>
      <p>为响应国家产学研号召， 学院在2011年创建了CEIT工作室</p>
      <p>这是一个集技术学习，软件开发，技术研究于一体的创新工作室</p>
      <p>自成立以来，本工作室注重培养学生的开发能力，团队合作能力以及创新能力</p>
      <p>并积极组织学生参加竞赛和项目开发，让学生在实践中学习和锻炼。</p>
    </div>
  </div>
  <div id="aboutContent">

  </div>

</template>

<script setup>
import {ref, onMounted, reactive} from "vue";

const Toptip = [
  "我很好奇！",
  "赞美之心！",
  "*舒缓的现代音乐*",
  "希望能成为有趣的人",
  "敬畏之心!",
  "希望能成为有趣的人",
  "你好，请多指教",
  "Lata\n" +
  "lulila\n" +
  "lulula\n" +
  "lulalila ♪♫",
]

let topTitle = Toptip[Math.floor(Math.random() * (Toptip.length - 0)) + 0]
onMounted(() => {
  const ele = document.querySelector('#topBg')
  ele.style.backgroundImage = `url(https://ceit-1312547723.cos.ap-beijing.myqcloud.com/0${Math.floor(Math.random() * (3)) + 1}.jpeg)`
})

</script>

<style lang="scss">
#topBg {
  z-index: -100;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //background-image: url('../assets/01.jpeg');
  transition: transform 1.5s, opacity 1s;
  animation: initBg 1s;
  //transform: scale(1.05);
}

#bgDarkMask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  animation: initBlack 1s;
}

#topTitle {
  position: absolute;
  top: 30%;
  width: 100%;
  text-align: center;

  h1 {
    animation: init 1s;
    margin: 30px auto;
    width: 50%;
    height: 150px;
    font-size: 42px;
    letter-spacing: .5em;
    color: white;
  }

  h2 {
    animation: init 1s;
    font-weight: 400;
    font-size: 15px;
    color: #fff;

    span {
      color: rgba(255, 255, 255, .6);
    }
  }

  .bar {
    animation: init 1s;
    position: absolute;
    left: calc(50% - 35px);
    margin-top: -20px;
    width: 70px;
    height: 4px;
    background-color: rgba(112, 192, 0, .6);
  }
}

#scrollDown {
  position: absolute;
  bottom: 100px;
  width: 100%;

  #scrollDownIcon {
    position: absolute;
    top: 50px;
    left: calc(50% - 10px);
    border-right: 3px solid;
    border-top: 3px solid;
    border-color: rgba(255, 255, 255, .5);
    border-radius: 2px;
    box-sizing: unset;
    height: 20px;
    width: 20px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    cursor: pointer;
    transition: .25s;
    animation: twinkle 2s 2s;
  }
}

#about {
  margin: 0 auto;
  position: relative;
  top: 100vh;
  width: 60%;
  border-radius: 60px;
  box-shadow: 10px 15px 15px #1d2125;
  height: 60vh;
  padding-top: 20px;
  padding-bottom: 100px;
  text-align: center;
  transition: .25s;
  background-color: rgba(230, 230, 230, 0.3);
  -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
  backdrop-filter: blur(30px) saturate(180%) !important;

  h3 {
    font-size: 30px;
    color: white;
    transition: .25s;
  }

  .tagBox {
    position: relative;
    margin-top: 60px;
    width: 100%;
    font-size: small;
    transition: .25s;

    span {
      margin: 0 3px;
      padding: 8px 15px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
      transition: .25s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
      }
    }
  }

  .aboutContent {
    position: relative;
    margin-top: 35px;
    width: 100%;
    color: white;
    font-size: 14px;

    p {
      line-height: 50px;
      transition: .25s;
    }
  }
}

#aboutContent {
  position: relative;
  margin-top: 100px;
  top: 100vh;
  width: 100%;
  height: 1px;
  //padding-top: 80px;
  //padding-bottom: 100px;
  text-align: center;
  transition: .25s;
  background-color: #cac6c6;
}

@keyframes init {
  0% {
    transform: translateY(70px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes initBg {
  0% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes initBlack {
  0% {
    background-color: rgba(0, 0, 0, 0.7);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

@media only screen and (max-width: 600px) {
  #about {
    width: 100%;
    border-radius: 0;
    box-shadow: none;

    h3 {

    }

    .tagBox {

      span {

        &:hover {

        }
      }
    }

    .aboutContent {

      p {
        line-height: 30px;
        transition: .25s;
      }
    }
  }
  #topTitle {
    h1 {
      font-size: 30px;
    }
  }
}
</style>