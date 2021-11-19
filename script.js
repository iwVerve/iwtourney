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

showhideLeaderboard = function(el) {
    var b = el.parentElement.parentElement.parentElement.children[1];
    if (b.classList.contains('leaderboard-hide')) {
        b.classList.remove('leaderboard-hide');
        el.innerHTML = '<img src="img/icon/close.png">';
    }
    else {
        b.classList.add('leaderboard-hide');
        el.innerHTML = '<img src="img/icon/open.png">';
    }
}

$ (document).ready(function() {
    tabCurrent = 'about';

    switching = false;

    const nextGame = new Date('2021-11-20T12:00:00-05:00').getTime();
    function updateTimer() {
        var t = Math.max(nextGame - Date.now(), 0);
        var days = Math.floor(t / (24*60*60*1000));
        var hours = Math.floor((t % (24*60*60*1000)) / (60*60*1000));
        var minutes = Math.floor((t % (60*60*1000)) / (60*1000));

        var seconds = Math.floor((t % (60*1000)) / (1000));
        var str = `${days}:${(hours < 10) ? '0' : ''}${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
        for (const el of $ ('.nextTimer')) {
            el.innerHTML = str;
        }
    }

    Vue.component('game-item', {
        props: ['game'],
        template: `
        <div class="game-leaderboard">
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
                    <p class="game-description" style="text-align: center">
                        {{game.desc}}
                    </p>
                </div>
                <div class="game-right-bar">
                    <a v-if="game.link != ''" :href="game.link" class="download-button" target="_blank"><img src="img/icon/download.png">Download</a>
                    <div v-else href="" class="download-button countdown nextTimer" target="_blank">0:00:00</div>
                    <button class="leaderboard-button" v-if="game.ranking.length != 0" onclick="showhideLeaderboard(this)"> <img src="img/icon/open.png"> </button>
                </div>
            </div>
            <div class="leaderboard leaderboard-hide">
                <leaderboard-entry
                    v-for="entry in game.ranking"
                    v-bind:entry="entry"
                    v-bind:key="entry.id"
                ></leaderboard-entry>
            </div>
        </div>
        `
    });

    Vue.component('leaderboard-entry', {
        props: ['entry'],
        template: `
        <div class="leaderboard-entry">
            <span class="leaderboard-name">{{entry.name}}</span>
            <a class="leaderboard-score" v-if="entry.link != ''" :href="entry.link" target="_blank">{{entry.score}}</a>
            <span class="leaderboard-score" v-else :href="entry.link">{{entry.score}}</span>
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

    games = {
        power: {
            title: 'I Wanna Power',
            tags: [{tag: '▲45', class: 'difficulty'}, {tag: 'Adventure', class: 'adventure'}],
            maker: 'wonderful',
            desc: 'Ranking critera: Fastest time',
            img: 'img/game/power.jpg',
            link: 'https://www.dropbox.com/s/73685ox5w1uc64w/I%20Wanna%20Power.zip?dl=0',
            ranking: []
        },
        wacky: {
            title: 'I Wanna Be Wacky',
            tags: [{tag: '▲40', class: 'difficulty'}, {tag: 'Luck', class: 'luck'}],
            maker: 'arzztt',
            desc: 'Ranking criteria: Fewest deaths',
            img: 'img/game/wacky.jpg',
            link: 'https://www.mediafire.com/file/cvfzdma7kfuo72r/I_Wanna_Be_Wacky.zip/file',
            ranking: []
        },
        preview1: {
            title: '???',
            tags: [{tag: '▲65', class: 'difficulty'}, {tag: 'Needle', class: 'needle'}],
            maker: '128-Up',
            desc: '',
            img: 'img/game/preview.jpg',
            link: '',
            ranking: []
        },
        preview2: {
            title: '???',
            tags: [{tag: '▲50', class: 'difficulty'}, {tag: 'Avoidance', class: 'avoidance'}],
            maker: 'RandomChaos_',
            desc: '🤠',
            img: 'img/game/preview.jpg',
            link: '',
            ranking: []
        }
    }

    var app = new Vue({
        el: '#app',
        data: {
            currentList: [
                games.power,
                games.wacky
            ],
            gameList: [
            ],
            previewList: [
                games.preview1,
                games.preview2
            ],
            makerList: [
                {
                    name: '29th letter',
                    img: 'img/maker/29.png',
                    links: []
                },
                {
                    name: '128-Up',
                    img: 'img/maker/128-up.png',
                    links: [{link: 'https://twitter.com/SpikyShroom', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'AGuyNamedTyler',
                    img: 'img/maker/tyler.png',
                    links: []
                },
                {
                    name: 'AlejoFangamer',
                    img: 'img/maker/alejo.jpg',
                    links: [{link: 'https://twitter.com/AlejoFangamer', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'anxKha',
                    img: 'img/maker/anxkha.png',
                    links: []
                },
                {
                    name: 'Aroxon',
                    img: 'img/maker/aroxon.jpg',
                    links: [{link: 'https://twitter.com/Aroxon2', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Artimax',
                    img: 'img/maker/artimax.png',
                    links: []
                },
                {
                    name: 'arzztt',
                    img: 'img/maker/arzztt.jpg',
                    links: [{link: 'https://twitter.com/arzztt365/', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Chrisay',
                    img: 'img/maker/chrisay.png',
                    links: [{link: 'https://twitter.com/TheChrisay', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Cthaere',
                    img: 'img/maker/cthaere.png',
                    links: []
                },
                {
                    name: 'Dono',
                    img: 'img/maker/dono.jpg',
                    links: []
                },
                {
                    name: 'Duncan',
                    img: 'img/maker/duncan.png',
                    links: [{link: 'https://twitter.com/duncanacnud', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'EchoMask',
                    img: 'img/maker/echomask.jpg',
                    links: [{link: 'https://twitter.com/ArthurTheGuy', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'FairLight',
                    img: 'img/maker/fairlight.png',
                    links: []
                },
                {
                    name: 'FancyFishie',
                    img: 'img/maker/fancy.webp',
                    links: []
                },
                {
                    name: 'happy',
                    img: 'img/maker/happy.webp',
                    links: []
                },
                {
                    name: 'IanBoy141',
                    img: 'img/maker/ianboy.jpg',
                    links: [{link: 'https://twitter.com/IanBoy141', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Jopagu',
                    img: 'img/maker/jopagu.png',
                    links: []
                },
                {
                    name: 'Kai',
                    img: 'img/maker/kai.jpg',
                    links: [{link: 'https://twitter.com/kai_2007__', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Kiiview',
                    img: 'img/maker/kiiview.jpg',
                    links: [{link: 'https://twitter.com/Kiiview1', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Kizelf',
                    img: 'img/maker/kizelf.webp',
                    links: []
                },
                {
                    name: 'lilly',
                    img: 'img/maker/lilly.jpg',
                    links: [{link: 'https://twitter.com/TomorrowSuicide', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'JoshuaHB',
                    img: 'img/maker/joshua.jpg',
                    links: [{link: 'https://twitter.com/joshhoffboring', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Juan285',
                    img: 'img/maker/juan.jpg',
                    links: [
                        {link: 'https://twitter.com/slut285', img: 'img/icon/twitter.png'},
                        {link: 'https://juan285.carrd.co', img: 'img/icon/carrd.png'},
                        {link: 'https://juan285.blogspot.com', img: 'img/icon/page.png'}
                    ]
                },
                {
                    name: 'kurath',
                    img: 'img/maker/kurath.png',
                    links: []
                },
                {
                    name: 'p00ks',
                    img: 'img/maker/p00ks.png',
                    links: [{link: 'https://twitter.com/p00ks1', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'PlayerDash2017',
                    img: 'img/maker/playerdash.webp',
                    links: []
                },
                {
                    name: 'PoiMoi',
                    img: 'img/maker/poi.png',
                    links: []
                },
                {
                    name: 'popop614',
                    img: 'img/maker/popop.png',
                    links: [{link: 'https://twitter.com/popop6143', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Princeoflight',
                    img: 'img/maker/princeoflight.png',
                    links: [{link: 'https://twitter.com/PrinceoflightA', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'RandomChaos_',
                    img: 'img/maker/randomchaos.png',
                    links: []
                },
                {
                    name: 'RandomErik',
                    img: 'img/maker/erik.jpg',
                    links: [{link: 'https://twitter.com/RandomErik2', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Razzor',
                    img: 'img/maker/razzor.jpg',
                    links: [{link: 'https://twitter.com/IwRazzor', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'R3Ked',
                    img: 'img/maker/r3ked.webp',
                    links: []
                },
                {
                    name: 'renex',
                    img: 'img/maker/renex.png',
                    links: [{link: 'https://twitter.com/renex_64', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Rossiter',
                    img: 'img/maker/rossiter.png',
                    links: [{link: 'https://twitter.com/RossiterDev', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'shign',
                    img: 'img/maker/shign.png',
                    links: []
                },
                {
                    name: 'Skulldude',
                    img: 'img/maker/skull.png',
                    links: [{link: 'https://twitter.com/Skulldude89', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Smartkin',
                    img: 'img/maker/smartkin.png',
                    links: [{link: 'https://twitter.com/SmartkinZ', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'Synthasmagoria',
                    img: 'img/maker/synth.png',
                    links: [
                        {link: 'https://twitter.com/SynthasA', img: 'img/icon/twitter.png'},
                        {link: 'https://synthasmagoria.neocities.org/', img: 'img/icon/page.png'},
                        {link: 'https://synthasmagoria.itch.io/', img: 'img/icon/itch.png'}
                    ]
                },
                {
                    name: 'Tayashie',
                    img: 'img/maker/tayashie.png',
                    links: []
                },
                {
                    name: 'Verve',
                    img: 'img/maker/verve.png',
                    links: [{link: 'https://twitter.com/IwVerve', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'very cool',
                    img: 'img/maker/very.jpg',
                    links: [{link: 'https://twitter.com/verycool_____/photo', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'wonderful',
                    img: 'img/maker/wonderful.jpg',
                    links: [{link: 'https://twitter.com/wonderfulx_x', img: 'img/icon/twitter.png'}]
                },
                {
                    name: 'YaBoiMarcAntony',
                    img: 'img/maker/ybma.png',
                    links: [{link: 'https://twitter.com/YaBoiMarcAnton1', img: 'img/icon/twitter.png'}]
                }
            ],
            alex: [
                {
                    name: 'Tralexium',
                    img: 'img/maker/tralexium.jpg',
                    links: [{link: 'https://twitter.com/Tralexium', img: 'img/icon/twitter.png'}]
                }   
            ]
        }
    });

    //clickTab("about");
    $("#about").fadeIn(0);
    setInterval(updateTimer, 200);
});