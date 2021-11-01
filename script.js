clickTab = function(id) {
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

$ (document).ready(function() {
    tabCurrent = 'games';

    switching = false;

    const nextGame = new Date('2022-01-01T18:42:00+01:00').getTime();
    function updateTimer() {
        var t = nextGame - Date.now();
        var days = Math.floor(t / (24*60*60*1000));
        var hours = Math.floor((t % (24*60*60*1000)) / (60*60*1000));
        var minutes = Math.floor((t % (60*60*1000)) / (60*1000));

        var seconds = Math.floor((t % (60*1000)) / (1000));
        var str = `${days}:${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
        $ ('#nextTimer')[0].innerHTML = str;
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
        <a :href="link.link" target="_blank"><img class="maker-link-icon" :src="link.img"></a>
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
                    id: 25,
                    name: '29th letter',
                    img: 'img/maker/29.png',
                    links: []
                },
                {
                    id: 1,
                    name: '128-Up',
                    img: 'img/maker/128-up.png',
                    links: [{id: 1, link: 'https://twitter.com/SpikyShroom', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 26,
                    name: 'AGuyNamedTyler',
                    img: 'img/maker/tyler.png',
                    links: []
                },
                {
                    id: 39,
                    name: 'AlejoFangamer',
                    img: 'img/maker/alejo.jpg',
                    links: [{id: 1, link: 'https://twitter.com/AlejoFangamer', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 2,
                    name: 'anxKha',
                    img: 'img/maker/anxkha.png',
                    links: []
                },
                {
                    id: 27,
                    name: 'Aroxon',
                    img: 'img/maker/aroxon.jpg',
                    links: [{id: 1, link: 'https://twitter.com/Aroxon2', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 37,
                    name: 'Artimax',
                    img: 'img/maker/artimax.png',
                    links: []
                },
                {
                    id: 3,
                    name: 'Arzztt',
                    img: 'img/maker/arzztt.png',
                    links: [{id: 1, link: 'https://twitter.com/arzztt365/', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 42,
                    name: 'Chrisay',
                    img: 'img/maker/chrisay.png',
                    links: [{id: 1, link: 'https://twitter.com/TheChrisay', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 4,
                    name: 'Dono',
                    img: 'img/maker/dono.png',
                    links: []
                },
                {
                    id: 41,
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
                    id: 28,
                    name: 'FairLight',
                    img: 'img/maker/fairlight.png',
                    links: []
                },
                {
                    id: 29,
                    name: 'FancyFishie',
                    img: 'img/maker/fancy.webp',
                    links: []
                },
                {
                    id: 30,
                    name: 'happy',
                    img: 'img/maker/happy.webp',
                    links: []
                },
                {
                    id: 6,
                    name: 'IanBoy141',
                    img: 'img/maker/ianboy.jpg',
                    links: [{id: 1, link: 'https://twitter.com/IanBoy141', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 31,
                    name: 'Jopagu',
                    img: 'img/maker/jopagu.png',
                    links: []
                },
                {
                    id: 43,
                    name: 'Kai',
                    img: 'img/maker/kai.jpg',
                    links: [{id: 1, link: 'https://twitter.com/kai_2007__', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 32,
                    name: 'Kiiview',
                    img: 'img/maker/kiiview.jpg',
                    links: [{id: 1, link: 'https://twitter.com/Kiiview1', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 33,
                    name: 'Kizelf',
                    img: 'img/maker/kizelf.webp',
                    links: []
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
                    links: [
                        {id: 1, link: 'https://twitter.com/slut285', img: 'img/icon/twitter.png'},
                        {id: 2, link: 'https://juan285.carrd.co', img: 'img/icon/carrd.png'},
                        {id: 3, link: 'https://juan285.blogspot.com', img: 'img/icon/page.png'}
                    ]
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
                    id: 34,
                    name: 'PlayerDash2017',
                    img: 'img/maker/playerdash.webp',
                    links: []
                },
                {
                    id: 24,
                    name: 'Poi Moi',
                    img: 'img/maker/poi.png',
                    links: []
                },
                {
                    id: 12,
                    name: 'Popop614',
                    img: 'img/maker/popop.png',
                    links: [{id: 1, link: 'https://twitter.com/popop6143', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 38,
                    name: 'princeoflight',
                    img: 'img/maker/princeoflight.png',
                    links: [{id: 1, link: 'https://twitter.com/PrinceoflightA', img: 'img/icon/twitter.png'}]
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
                    id: 35,
                    name: 'R3Ked',
                    img: 'img/maker/r3ked.webp',
                    links: []
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
                    id: 40,
                    name: 'Smartkin',
                    img: 'img/maker/smartkin.png',
                    links: [{id: 1, link: 'https://twitter.com/SmartkinZ', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 20,
                    name: 'Synthasmagoria',
                    img: 'img/maker/synth.png',
                    links: [
                        {id: 1, link: 'https://twitter.com/SynthasA', img: 'img/icon/twitter.png'},
                        {id: 2, link: 'https://synthasmagoria.neocities.org/', img: 'img/icon/page.png'},
                        {id: 3, link: 'https://synthasmagoria.itch.io/', img: 'img/icon/itch.png'}
                    ]
                },
                {
                    id: 36,
                    name: 'Tayashie',
                    img: 'img/maker/tayashie.png',
                    links: []
                },
                {
                    id: 44,
                    name: 'Verve',
                    img: 'img/maker/verve.png',
                    links: [{id: 1, link: 'https://twitter.com/IwVerve', img: 'img/icon/twitter.png'}]
                },
                {
                    id: 21,
                    name: 'very cool',
                    img: 'img/maker/very.png',
                    links: [{id: 1, link: 'https://twitter.com/verycool_____/photo', img: 'img/icon/twitter.png'}]
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
});