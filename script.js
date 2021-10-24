tabCurrent = 'games';

switching = false;

const nextGame = new Date(2021, 10, 1, 0, 0, 0).getTime();
function updateTimer() {
    var t = nextGame - Date.now();
    var days = Math.floor(t / (24*60*60*1000));
    var hours = Math.floor((t % (24*60*60*1000)) / (60*60*1000));
    var minutes = Math.floor((t % (60*60*1000)) / (60*1000));

    var seconds = Math.floor((t % (60*1000)) / (1000));
    var str = `${days}:${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
    $ ('#nextTimer')[0].innerHTML = str;
}

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
        <a href="" class="download-button" target="_blank"><img src="img/icon/download.png">Download</a>
    </div>
    `
});

Vue.component('game-tag', {
    props: ['tag'],
    template: '<span :class="tag.class">{{tag.tag}}</span>'
});

Vue.component('maker', {
    props: ['maker'],
    template: `
    <div class="maker">
        <img class="maker-icon" :src="maker.img">
        <div class="maker-info">
            <div class="maker-name">{{maker.name}}</div>
            <div class="maker-links">
                <maker-link
                    v-for="item in maker.links"
                    v-bind:link="item"
                    v-bind:key="item.id"
                ></maker-link>
            </div>
        </div>
    </div>
    `
})

Vue.component('maker-link', {
    props: ['link'],
    template: `
    <a :href="link.link" target="_blank"><img :src="link.img"></a>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        gameList: [
            /*{
                id: 1,
                title: 'Game title',
                tags: [{id: 1, tag: 'Needle', class: 'needle'}],
                maker: 'Game maker',
                desc: 'Game description',
                img: 'img/game/01.png'
            }*/
        ],
        makerList: [
            {
                id: 1,
                name: '128-Up',
                img: 'img/maker/128-up.png',
                links: [{id: 1, link: 'https://twitter.com/SpikyShroom', img: 'img/icon/twitter.png'}]
            },
            {
                id: 2,
                name: 'anxKha',
                img: 'img/maker/anxkha.png',
                links: []
            },
            {
                id: 3,
                name: 'Arzztt',
                img: 'img/maker/arzztt.png',
                links: [{id: 1, link: 'https://twitter.com/arzztt365/', img: 'img/icon/twitter.png'}]
            },
            {
                id: 4,
                name: 'Duncan',
                img: 'img/maker/duncan.png',
                links: [{id: 1, link: 'https://twitter.com/duncanacnud', img: 'img/icon/twitter.png'}]
            },
            {
                id: 5,
                name: 'EchoMask',
                img: 'img/maker/echomask.jpg',
                links: [{id: 1, link: 'https://twitter.com/ArthurTheGuy', img: 'img/icon/twitter.png'}]
            },
            {
                id: 6,
                name: 'IanBoy141',
                img: 'img/maker/ianboy.jpg',
                links: [{id: 1, link: 'https://twitter.com/IanBoy141', img: 'img/icon/twitter.png'}]
            },
            {
                id: 7,
                name: 'Lilly',
                img: 'img/maker/lilly.jpg',
                links: [{id: 1, link: 'https://twitter.com/TomorrowSuicide', img: 'img/icon/twitter.png'}]
            },
            {
                id: 8,
                name: 'JoshuaHB',
                img: 'img/maker/joshua.jpg',
                links: [{id: 1, link: 'https://twitter.com/joshhoffboring', img: 'img/icon/twitter.png'}]
            },
            {
                id: 9,
                name: 'Juan285',
                img: 'img/maker/juan.jpg',
                links: [{id: 1, link: 'https://twitter.com/slut285', img: 'img/icon/twitter.png'}]
            },
            {
                id: 10,
                name: 'Kurath',
                img: 'img/maker/kurath.png',
                links: []
            },
            {
                id: 11,
                name: 'p00ks',
                img: 'img/maker/p00ks.png',
                links: [{id: 1, link: 'https://twitter.com/p00ks1', img: 'img/icon/twitter.png'}]
            },
            {
                id: 12,
                name: 'Popop614',
                img: 'img/maker/popop.png',
                links: [{id: 1, link: 'https://twitter.com/popop6143', img: 'img/icon/twitter.png'}]
            },
            {
                id: 13,
                name: 'RandomChaos_',
                img: 'img/maker/randomchaos.png',
                links: []
            },
            {
                id: 14,
                name: 'RandomErik',
                img: 'img/maker/erik.jpg',
                links: [{id: 1, link: 'https://twitter.com/RandomErik2', img: 'img/icon/twitter.png'}]
            },
            {
                id: 15,
                name: 'Razzor',
                img: 'img/maker/razzor.png',
                links: [{id: 1, link: 'https://twitter.com/IwRazzor', img: 'img/icon/twitter.png'}]
            },
            {
                id: 16,
                name: 'renex',
                img: 'img/maker/renex.png',
                links: [{id: 1, link: 'https://twitter.com/renex_64', img: 'img/icon/twitter.png'}]
            },
            {
                id: 17,
                name: 'Rossiter',
                img: 'img/maker/rossiter.png',
                links: [{id: 1, link: 'https://twitter.com/RossiterDev', img: 'img/icon/twitter.png'}]
            },
            {
                id: 18,
                name: 'shign',
                img: 'img/maker/shign.png',
                links: []
            },
            {
                id: 19,
                name: 'Skulldude',
                img: 'img/maker/skull.png',
                links: [{id: 1, link: 'https://twitter.com/Skulldude89', img: 'img/icon/twitter.png'}]
            },
            {
                id: 20,
                name: 'Synthasmagoria',
                img: 'img/maker/synth.png',
                links: [{id: 1, link: 'https://twitter.com/SynthasA', img: 'img/icon/twitter.png'}]
            },
            {
                id: 21,
                name: 'Verve',
                img: 'img/maker/verve.png',
                links: [{id: 1, link: 'https://twitter.com/IwVerve', img: 'img/icon/twitter.png'}]
            },
            {
                id: 22,
                name: 'Wonderful',
                img: 'img/maker/wonderful.jpg',
                links: [{id: 1, link: 'https://twitter.com/wonderfulx_x', img: 'img/icon/twitter.png'}]
            },
            {
                id: 23,
                name: 'YaBoiMarcAntony',
                img: 'img/maker/ybma.png',
                links: [{id: 1, link: 'https://twitter.com/YaBoiMarcAnton1', img: 'img/icon/twitter.png'}]
            }
        ]
    }
});

clickTab("about");
setInterval(updateTimer, 200);