tabCurrent = "games";

switching = false;

function clickTab(id) {
    if (!switching && id != tabCurrent) {
        switching = true;

        $(".tab-button.active").removeClass("active");
        $("#tab"+id).addClass("active");

        $("#"+tabCurrent).fadeOut(150, function(){
            tabCurrent = id;
            $("#"+id).fadeIn(150);
            switching = false;
        });
    }
}

Vue.component('game-item', {
    props: ['game'],
    template: `
    <div class="game">
        <img :src="game.img" class="game-thumbnail">
        <div class="game-info-container">
            <div class="game-title-tags">
                <span class="game-title">
                    {{game.title}}
                </span> 
                <game-tag
                    v-for="tag in game.tags"
                    v-bind:tag="tag"
                    v-bind:key="tag.id"
                ></game-tag>
            </div>
            <p class="game-makers">
                {{game.maker}}
            </p>
            <p class="game-description">
                {{game.desc}}
            </p>
        </div>
        <a href="" class="download-button">Download</a>
    </div>
    `
});

Vue.component('game-tag', {
    props: ['tag'],
    template: '<span :class="tag.class">{{tag.tag}}</span>'
});

var app = new Vue({
    el: '#app',
    data: {
        gameList: [
            {
                id: 1,
                title: 'Game title',
                tags: [{id: 1, tag: 'Needle', class: 'needle'}, {id: 2, tag: 'Adventure', class: 'adventure'}],
                maker: 'Game maker',
                desc: 'Game description',
                img: 'img/01.png'
            },
            {
                id: 2,
                title: 'Markiplier',
                tags: [{id: 1, tag: 'Avoidance', class: 'avoidance'}],
                maker: 'Marko Pliar',
                desc: 'Mark Edward Fischbach (born June 28, 1989),[4] known online as Markiplier, is an American YouTuber and podcast host. Originally from Honolulu, Hawaii,[5][6] he began his career in Cincinnati, Ohio, and is currently based in Los Angeles, California. As well as uploading videos on his main YouTube channel, he is the co-founder of clothing company Cloak with fellow YouTuber Jacksepticeye,[7] and the co-host of the now defunct Unus Annus channel. ',
                img: 'img/02.png'
            }
        ]
    }
});

clickTab("about");