<template>
  <div class="articleView">

    <div ref="toc" class="toc"></div>

    <div class="center">
      <svg :style="LikeOnColor" @click="like" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
      <span class="likeCount">点赞数{{ count }}</span>
      <div ref="html" class="markdown"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router'
import {useStore} from "vuex";
import {marked} from 'marked'
import {getArticle, isMyLike, likeCount, likeOn} from "../../api/index.js";
import tocHelper from 'toc-helper';

const store = useStore()
const route = useRoute()
const html = ref()
const id = route.params.id
const LikeOnColor = ref({color: 'black'})

const data = ref([])
const count = ref(0)
const toc = ref()
let helper = null
const like = async () => {
  const res = await likeOn(id)
  if (res.data.data == 1) {
    count.value += 1
    LikeOnColor.value.color = 'red'
  } else if (res.data.data == 0) {
    count.value -= 1
    LikeOnColor.value.color = 'black'
  }
  if (res.data.code == 40100) {
    alert("请登入")
  }
}

onMounted(async () => {
  const myLikeRes = await isMyLike(id)
  if (myLikeRes.data.data) {
    LikeOnColor.value.color = 'red'
  }
  const res = await getArticle(id)
  const countData = await likeCount(id)
  count.value = countData.data.data
  data.value = res.data.data
  html.value.innerHTML = marked.parse(data.value);

  helper = new tocHelper(toc.value, {
    level: 2,
    headingSelector: ['h1', 'h2'],
    // collapsedLevel: 2,
    slugify: (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
  });
})

</script>

<style lang="scss">
.likeCount {
  margin-left: 10px;
  font-size: 14px;
}

.toc {
  float: left;
  width: 300px;
}

.articleView {
  width: 100%;
  padding: 20px;

  .center {
    //margin: 0 auto;
    //width: 60%;
    margin-left: 310px;
    height: 100%;
  }
}

@media only screen and (max-width: 800px) {
  .toc {
    display: none;
  }
  #toc-box.bitoc-fixed {
    max-width: 19rem;
  }
  .articleView {
    .center {
      //margin: 0 auto;
      width: 100%;
      margin-left: 0;
      height: 100%;
    }
  }
}

.markdown {
  .markdown-here-wrapper {
    font-size: 16px;
    line-height: 1.8em;
    letter-spacing: 0.1em;
  }


  pre, code {
    font-size: 14px;
    font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
    margin: auto 5px;
  }

  code {
    white-space: pre-wrap;
    border-radius: 2px;
    display: inline;
  }

  pre {
    font-size: 15px;
    line-height: 1.4em;
    display: block !important;
  }

  pre code {
    white-space: pre;
    overflow: auto;
    border-radius: 3px;
    padding: 1px 1px;
    display: block !important;
  }

  strong, b {
    color: #BF360C;
  }

  em, i {
    color: #009688;
  }

  hr {
    border: 1px solid #BF360C;
    margin: 1.5em auto;
  }

  p {
    margin: 1.5em 5px !important;
  }

  table, pre, dl, blockquote, q, ul, ol {
    margin: 10px 5px;
  }

  ul, ol {
    padding-left: 15px;
  }

  li {
    margin: 10px;
  }

  li p {
    margin: 10px 0 !important;
  }

  ul ul, ul ol, ol ul, ol ol {
    margin: 0;
    padding-left: 10px;
  }

  ul {
    list-style-type: circle;
  }

  dl {
    padding: 0;
  }

  dl dt {
    font-size: 1em;
    font-weight: bold;
    font-style: italic;
  }

  dl dd {
    margin: 0 0 10px;
    padding: 0 10px;
  }

  blockquote, q {
    border-left: 2px solid #009688;
    padding: 0 10px;
    color: #777;
    quotes: none;
    margin-left: 1em;
  }

  blockquote::before, blockquote::after, q::before, q::after {
    content: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 20px 0 10px;
    padding: 0;
    font-style: bold !important;
    color: #009688 !important;
    text-align: center !important;
    margin: 1.5em 5px !important;
    padding: 0.5em 1em !important;
  }

  h1 {
    font-size: 24px !important;
    border-bottom: 1px solid #ddd !important;
  }

  h2 {
    font-size: 20px !important;
    border-bottom: 1px solid #eee !important;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }


  table {
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 1em;
    font: inherit;
    border: 0;
    margin: 0 auto;
  }

  tbody {
    margin: 0;
    padding: 0;
    border: 0;
  }

  table tr {
    border: 0;
    border-top: 1px solid #CCC;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  table tr:nth-child(2n) {
    background-color: #F8F8F8;
  }

  table tr th, table tr td {
    font-size: 16px;
    border: 1px solid #CCC;
    margin: 0;
    padding: 5px 10px;
  }

  table tr th {
    font-weight: bold;
    color: #eee;
    border: 1px solid #009688;
    background-color: #009688;
  }
}
</style>