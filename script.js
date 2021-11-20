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
    const submitEnd = new Date('2021-11-25T12:00:00-05:00').getTime();
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

        t = Math.max(submitEnd - Date.now(), 0);
        days = Math.floor(t / (24*60*60*1000));
        hours = Math.floor((t % (24*60*60*1000)) / (60*60*1000));
        minutes = Math.floor((t % (60*60*1000)) / (60*1000));

        seconds = Math.floor((t % (60*1000)) / (1000));
        str = `${days}:${(hours < 10) ? '0' : ''}${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
        for (const el of $ ('#submitTimer')) {
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
            <span class="leaderboard-name"> &nbsp; {{entry.name}}</span>
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
            ranking: [
                {name: 'Cosmoing#9001', score: '0:42:56', link: 'https://youtu.be/AiEL4IDIU5M'},
                {name: 'bummerman222#8700', score: '0:49:33', link: 'https://www.youtube.com/watch?v=9D6qNZT9IkM'},
                {name: 'JPRG666#4320', score: '0:50:16', link: 'https://youtu.be/BuGkvrzJrls'},
                {name: 'Natsu#5688', score: '0:52:40', link: 'https://youtu.be/6G27yZLIrls'},
                {name: 'Wolsk#1111', score: '0:53:19', link: 'https://www.youtube.com/watch?v=x2pLgalrCIw'},
                {name: 'Verve#4008', score: '0:54:01', link: ''},
                {name: 'chrisg#0492', score: '0:54:57', link: 'https://drive.google.com/drive/folders/1CMLtwzzimt3sNDsumNIqFDBGSjmDVUqb?usp=sharing'},
                {name: 'MirFälltKeinNameEin#4945', score: '0:55:01', link: 'https://www.twitch.tv/videos/1206104474'},
                {name: 'Dijivunda#0791', score: '0:55:22', link: 'https://youtu.be/AzCyMFT8TwU'},
                {name: 'Nogard#9860', score: '0:55:31', link: 'https://www.twitch.tv/videos/1207356029?t=2h18m20s'},
                {name: 'ぎょーざ#5156', score: '0:55:34', link: 'https://youtu.be/BhtvrzPGShs'},
                {name: 'シュガー#6238', score: '0:56:15', link: ''},
                {name: 'Uber Bob#8550', score: '0:58:02', link: 'https://www.youtube.com/watch?v=-3Ydn6zhOak'},
                {name: 'pieceofcheese87#8241', score: '0:58:54', link: 'https://www.youtube.com/watch?v=Ytw9-MTfruU'},
                {name: 'P2#7591', score: '0:58:58', link: 'https://www.twitch.tv/videos/1204517151'},
                {name: 'Mastermaxify#2893', score: '0:59:14', link: 'https://www.twitch.tv/videos/1204622919'},
                {name: 'hy-oca#5225', score: '1:00:52', link: ''},
                {name: 'TetraField#1275', score: '1:02:03', link: ''},
                {name: 'ナッツ#0286', score: '1:02:27', link: 'https://www.youtube.com/watch?v=aTZy0IWcByA'},
                {name: 'ElRaimon2000#9965', score: '1:03:12', link: 'https://www.youtube.com/watch?v=x0UShncRHIs'},
                {name: 'Stonk#3212', score: '1:03:30', link: 'https://www.twitch.tv/videos/1205787286'},
                {name: 'あずもる#3594', score: '1:05:46', link: 'https://www.youtube.com/watch?v=SnWmrUZIib4&ab_channel=%E3%81%82%E3%81%9A%E3%82%82%E3%82%8B'},
                {name: 'Jety#8150', score: '1:05:18', link: 'https://www.youtube.com/watch?v=vk6rTJqJ6yg'},
                {name: 'Schulzer#5885', score: '1:07:49', link: ''},
                {name: 'Naloa#2570', score: '1:09:38', link: 'https://www.youtube.com/watch?v=omHyBZUI1Jg'},
                {name: 'Nick24#2510', score: '1:10:03', link: 'https://www.twitch.tv/videos/1206040786'},
                {name: 'どるっぴ#4013', score: '1:10:53', link: 'https://www.youtube.com/watch?v=Bd7KnrC6HJI'},
                {name: 'shign#4549', score: '1:11:03', link: 'https://www.youtube.com/watch?v=-IPPxVNC3e0'},
                {name: 'Gaborro#1598', score: '1:14:23', link: 'https://www.twitch.tv/videos/1205688279?t=0h3m5s'},
                {name: 'Cabbage#2356', score: '1:16:05', link: ''},
                {name: 'Chrisay#4955', score: '1:17:04', link: ''},
                {name: 'フライ#9601', score: '1:18:04', link: ''},
                {name: 'bv#3948', score: '1:19:29', link: 'https://www.twitch.tv/videos/1204649853'},
                {name: 'rikuzyou#7630', score: '1:22:13', link: 'https://youtu.be/J5Khr8VYDpk'},
                {name: 'Wolfiexe#3182', score: '1:22:46', link: ''},
                {name: 'RndGuy#7172', score: '1:22:51', link: 'https://www.youtube.com/watch?v=hLhRjqDOSNc'},
                {name: 'Redluma#9218', score: '1:24:43', link: ''},
                {name: 'Gaphodil#0058', score: '1:24:48', link: 'https://youtu.be/Bx6dxdKMDq4'},
                {name: 'idfk again#1005', score: '1:25:08', link: ''},
                {name: 'Maxim_new#8032', score: '1:25:53', link: 'https://www.twitch.tv/videos/1204452083'},
                {name: 'Kiyoshi#8258', score: '1:26:52', link: ''},
                {name: 'eevee314#5264', score: '1:34:48', link: 'https://youtu.be/x5ry51bZonA?t=757'},
                {name: 'Arras#6153', score: '1:36:21', link: 'https://www.twitch.tv/videos/1206490885'},
                {name: 'JoshuaHB#4420', score: '1:38:17', link: ''},
                {name: 'Huse#7457', score: '1:38:24', link: 'https://www.twitch.tv/videos/1204486644?t=00h45m39s'},
                {name: 'flaviaflave#5883', score: '1:39:53', link: 'https://www.twitch.tv/videos/1205024694'},
                {name: 'ChakaZaluu#3281', score: '1:43:54', link: ''},
                {name: 'Taprus#0468', score: '1:46:25', link: 'https://www.youtube.com/watch?v=goTT99RbTdY'},
                {name: 'Tayashie#2812', score: '1:46:40', link: 'https://www.youtube.com/watch?v=P-x30ZnGFBs'},
                {name: 'Myragee#2941', score: '1:46:42', link: ''},
                {name: 'Artimax#3541', score: '1:49:29', link: ''},
                {name: 'iraqlobster01#2536', score: '1:49:50', link: 'https://www.dropbox.com/s/7hraumjzo31cx03/2021-11-13%2014-33-14.flv?dl=0'},
                {name: 'genesis1987#3212', score: '1:49:59', link: 'https://www.twitch.tv/videos/1204470829'},
                {name: 'Beaverbounce#1489', score: '1:50:24', link: ''},
                {name: 'FictioN#2307', score: '1:51:50', link: ''},
                {name: 'letcreate#2409', score: '1:52:25', link: 'https://www.twitch.tv/videos/1204647027'},
                {name: 'MKey#1714', score: '1:55:02', link: 'https://youtu.be/63MRxrb-Z7c?t=2032'},
                {name: 'touhoe#7049', score: '1:58:39', link: ''},
                {name: 'Kiiview#9278', score: '2:02:35', link: ''},
                {name: 'Tralexium#7489', score: '2:04:43', link: 'https://www.twitch.tv/videos/1204580044?t=0h40m49s'},
                {name: 'ProtoCloud#1060', score: '2:06:48', link: 'https://www.youtube.com/watch?v=jkJ8BBbfe18'},
                {name: 'norton_2222#6387', score: '2:09:30', link: ''},
                {name: 'Ross#0638', score: '2:09:53', link: 'https://www.youtube.com/watch?v=uZbXrm1Mhz8'},
                {name: 'Daglom#3015', score: '2:24:16', link: ''},
                {name: 'bantsmen#3247', score: '2:36:19', link: ''},
                {name: 'Byron#6895', score: '2:38:03', link: ''},
                {name: 'Havamati#1687', score: '2:46:33', link: ''},
                {name: 'Person4566#9924', score: '2:59:31', link: ''},
                {name: 'EchoMask#8965', score: '3:02:06', link: 'https://www.twitch.tv/videos/1204485133'},
                {name: 'Elmur#9293', score: '3:05:27', link: 'https://youtu.be/ea-lgWvmfkg https://youtu.be/QBOdFlLG3HY'},
                {name: 'InF™| Yuuki#3998', score: '3:13:24', link: ''},
                {name: 'antimatterprism#8058', score: '3:27:59', link: ''},
                {name: 'Bulb Bowling#3689', score: '3:43:59', link: ''},
                {name: 'Mullbra#1234', score: '4:05:20', link: ''},
                {name: 'TTBB#8359', score: '5:47:43', link: ''},
                {name: 'Tapxynyc#6041', score: '7:15:16', link: ''}
            ]
        },
        wacky: {
            title: 'I Wanna Be Wacky',
            tags: [{tag: '▲40', class: 'difficulty'}, {tag: 'Luck', class: 'luck'}],
            maker: 'arzztt',
            desc: 'Ranking criteria: Fewest deaths',
            img: 'img/game/wacky.jpg',
            link: 'https://www.mediafire.com/file/cvfzdma7kfuo72r/I_Wanna_Be_Wacky.zip/file',
            ranking: [
                {name: 'Dijivunda#0791', score: '955.6', link: 'https://youtu.be/dwag6tMjgVA'},
                {name: 'Cosmoing#9001', score: '965.4', link: 'https://youtu.be/4QNYKEnV3ms'},
                {name: 'Thenadertwo#9755', score: '967.2', link: 'https://www.youtube.com/watch?v=-0C1Q3z2npw'},
                {name: 'MirFälltKeinNameEin#4945', score: '979.4', link: 'https://www.twitch.tv/videos/1206104474'},
                {name: 'LAWatson#4618', score: '988.2', link: 'https://www.youtube.com/watch?v=O9Zc1e9kwFk'},
                {name: 'Jety#8150', score: '989', link: 'https://www.youtube.com/watch?v=80eP7Xs5Itc'},
                {name: 'Stonk#3212', score: '997', link: 'https://www.twitch.tv/videos/1205786740'},
                {name: 'Nick24#2510', score: '1032', link: 'https://www.twitch.tv/videos/1206040786'},
                {name: 'Mastermaxify#2893', score: '1053.8', link: 'https://www.twitch.tv/videos/1204622919'},
                {name: 'Wolsk#1111', score: '1095', link: ''},
                {name: 'bummerman222#8700', score: '1110.6', link: 'https://www.youtube.com/watch?v=EyjVpvELuUQ'},
                {name: 'pieceofcheese87#8241', score: '1112.4', link: 'https://www.youtube.com/watch?v=Noupfz67tOU'},
                {name: 'bv#3948', score: '1114', link: 'https://www.twitch.tv/videos/1204649853'},
                {name: 'JoshuaHB#4420', score: '1134.4', link: ''},
                {name: 'Emmanating#7687', score: '1137.4', link: ''},
                {name: 'Wolfiexe', score: '1140.2', link: ''},
                {name: 'Nogard#9860', score: '1143.8', link: 'https://www.twitch.tv/videos/1207356029'},
                {name: 'Athena Venny#5271', score: '1149.8', link: ''},
                {name: 'Verve#4008', score: '1150.4', link: ''},
                {name: 'Chrisay#4955', score: '1156.6', link: ''},
                {name: 'P2#7591', score: '1180.6', link: 'https://www.twitch.tv/videos/1204621322'},
                {name: 'Schulzer#5885', score: '1182', link: ''},
                {name: 'Gaborro#1598', score: '1192.2', link: 'https://www.twitch.tv/videos/1205688278'},
                {name: 'Cabbage#2356', score: '1195', link: ''},
                {name: 'popop614#2441', score: '1198.2', link: 'https://youtu.be/HvLXmtAccac'},
                {name: 'YaBoiMarcAntony', score: '1215', link: 'https://www.youtube.com/watch?v=w_rN9Ewfj4A'},
                {name: 'Tayashie#2812', score: '1238.4', link: 'https://www.youtube.com/watch?v=3z8RPX3_g2g'},
                {name: 'シュガー#6238', score: '1239.4', link: 'https://www.youtube.com/watch?v=IbaaRt-hJdE'},
                {name: 'TetraField#1275', score: '1244.2', link: ''},
                {name: 'RndGuy#7172', score: '1245.6', link: 'https://www.youtube.com/watch?v=JElB9mCB4nY'},
                {name: 'ElRaimon2000#9965', score: '1249.4', link: ''},
                {name: 'Gaphodil#0058', score: '1254.4', link: 'https://youtu.be/UkOiBRjj0W0'},
                {name: 'EchoMask#8965', score: '1266.8', link: 'https://www.twitch.tv/videos/1204485133'},
                {name: 'Jopagu#4728', score: '1290.6', link: 'https://youtu.be/JialEvm7CRk'},
                {name: 'Fatherpucci1#8816', score: '1298.4', link: 'https://youtu.be/tI59L1A66gg'},
                {name: 'Arras#6153', score: '1301', link: 'https://www.twitch.tv/videos/1205304224'},
                {name: 'Natsu#5688', score: '1311.6', link: ''},
                {name: 'Uber Bob#8550', score: '1320.4', link: 'https://www.youtube.com/watch?v=3uWAqCs18n8'},
                {name: 'letcreate#2409', score: '1323', link: 'https://www.twitch.tv/videos/1204650331'},
                {name: 'eevee314#5264', score: '1323', link: 'https://youtu.be/x5ry51bZonA?t=6821'},
                {name: 'Tralexium#7489', score: '1331.4', link: ''},
                {name: 'MKey#1714', score: '1338.6', link: 'https://www.youtube.com/watch?v=63MRxrb-Z7c'},
                {name: 'Redluma#9218', score: '1347.4', link: ''},
                {name: 'kiehi', score: '1352.2', link: 'https://youtu.be/3vmk5o4VSoI'},
                {name: 'Naloa#2570', score: '1355.4', link: 'https://www.youtube.com/watch?v=omHyBZUI1Jg'},
                {name: 'Kiiview#9278', score: '1359', link: ''},
                {name: 'ぎょーざ#5156', score: '1372', link: 'https://www.youtube.com/watch?v=BhtvrzPGShs'},
                {name: 'Huse#7457', score: '1378.6', link: 'https://www.twitch.tv/videos/1204677583'},
                {name: 'Artimax#3541', score: '1382.6', link: ''},
                {name: 'Maxim_new#8032', score: '1401.8', link: 'https://www.twitch.tv/videos/1204452083'},
                {name: 'TheodoraJPEGDemon#6666', score: '1402.4', link: 'https://www.youtube.com/watch?v=EvUCg1m88HY'},
                {name: 'Bulb Bowling#3689', score: '1409', link: ''},
                {name: 'あずもる#3594', score: '1412.2', link: 'https://www.youtube.com/watch?v=SnWmrUZIib4'},
                {name: 'Danil2332#8985', score: '1426.4', link: ''},
                {name: 'Kiyoshi#8258', score: '1453.2', link: 'https://www.youtube.com/watch?v=KK2nRSFl9p0'},
                {name: 'chrisg#0492', score: '1476.4', link: 'https://drive.google.com/drive/folders/1CMLtwzzimt3sNDsumNIqFDBGSjmDVUqb?usp=sharing'},
                {name: 'FictioN#2307', score: '1480.4', link: ''},
                {name: 'D15c4rd#1086', score: '1486', link: 'https://youtu.be/CbAxgSn2YF8'},
                {name: 'shign#4549', score: '1488.2', link: 'https://www.youtube.com/watch?v=tK9e5tEGCJs'},
                {name: 'beaverbounce', score: '1493.4', link: ''},
                {name: 'iraqlobster01#2536', score: '1542', link: 'https://www.dropbox.com/s/6ticag943jpgave/2021-11-13%2016-34-50.flv?dl=0'},
                {name: 'orcishgreenland#8681', score: '1562.2', link: 'https://www.youtube.com/watch?v=V8PMCPq0mKw'},
                {name: 'Daglom#3015', score: '1594.2', link: ''},
                {name: 'entoned #7021', score: '1595', link: ''},
                {name: 'flaviaflave#5883', score: '1620.2', link: 'https://www.twitch.tv/videos/1205024694'},
                {name: 'Byron#6895', score: '1620.6', link: ''},
                {name: 'Sanctuspaladin#0570', score: '1629', link: ''},
                {name: 'Taprus#0468', score: '1630.8', link: 'https://youtu.be/KpHtY8sEdF8'},
                {name: 'idfk again#1005', score: '1631', link: ''},
                {name: 'rikuzyou#7630', score: '1646.8', link: 'https://youtu.be/J5Khr8VYDpk'},
                {name: 'Myragee#2941', score: '1650', link: ''},
                {name: 'genesis1987#3212', score: '1657', link: 'https://www.twitch.tv/videos/1204470829'},
                {name: 'ProtoCloud#1060', score: '1675', link: 'https://www.youtube.com/watch?v=jkJ8BBbfe18'},
                {name: 'touhoe#7049', score: '1704', link: ''},
                {name: 'Ross#0638', score: '1714.4', link: 'https://www.youtube.com/watch?v=Oqc_sDzLZ3E'},
                {name: 'Canus#1888', score: '1777.2', link: 'https://www.youtube.com/watch?v=ar4pmxlh-rA'},
                {name: 'Welowas#2524', score: '1777.6', link: 'https://youtu.be/DqhI3vwV8Lo?t=29006'},
                {name: 'Gothic_lemon#0170', score: '1797.4', link: 'https://www.twitch.tv/videos/1207468307'},
                {name: 'norton_2222#6387', score: '1798.8', link: ''},
                {name: 'zViitor InF™| Yuuki#3998', score: '1911', link: 'https://www.youtube.com/watch?v=nnIE5UYzDak'},
                {name: 'antimatterprism#8058', score: '1914.4', link: ''},
                {name: 'romrom4444#4444', score: '1945.2', link: 'https://drive.google.com/file/d/1ez5wejIXvK0NDdi5tBlSxm7XQd_dZ844/view?usp=sharing'},
                {name: 'Marth#4641', score: '1955.8', link: ''},
                {name: 'Elmur#9293', score: '1962.2', link: 'https://youtu.be/cUawTk1ZfAE'},
                {name: 'TTBB#8359', score: '1994.4', link: ''},
                {name: 'bantsmen#3247', score: '2000.8', link: ''},
                {name: 'どるっぴ#4013', score: '2002', link: 'https://www.youtube.com/watch?v=N0yMDvxlRuo'},
                {name: 'point#6872', score: '2006', link: 'https://youtu.be/StyM_eAVr4o'},
                {name: 'Anuj#7871', score: '2057', link: ''},
                {name: 'R3Ked#7092', score: '2117.4', link: ''},
                {name: 't4llkr#7523', score: '2232.2', link: ''},
                {name: 'ナッツ#0286', score: '2315.2', link: 'https://www.youtube.com/watch?v=aTZy0IWcByA'},
                {name: 'Uber Uber#5605', score: '2380.6', link: ''},
                {name: 'dylancubr9#3167', score: '2449.6', link: 'https://www.youtube.com/watch?v=DcLt1fvG4xE'},
                {name: 'Duncan#8784', score: '2476', link: ''},
                {name: 'Tapxynyc#6041', score: '2703.8', link: ''},
                {name: 'GaspacoZanis#2496', score: '2924.6', link: ''},
                {name: 'Mokmoon#9427', score: '3000.8', link: ''},
                {name: 'hy-oca#5225', score: '3052.2', link: ''},
                {name: 'フライ#9601', score: '4018.8', link: ''},
                {name: 'whiteinky', score: '4738.6', link: ''},
                {name: 'sun5#4524', score: '10640.8', link: 'https://www.youtube.com/watch?v=kTB44W_W_Ww'}
            ]
        },
        seventwofour: {
            title: 'I Wanna be the 724-ish',
            tags: [{tag: '▲65', class: 'difficulty'}, {tag: 'Needle', class: 'needle'}],
            maker: '128-Up',
            desc: 'Ranking critera: Fastest time',
            img: 'img/game/724.jpg',
            link: 'https://www.mediafire.com/file/fvo2m4s62q8ocfk/I_Wanna_be_the_724-ish_v1.00.zip/file',
            ranking: []
        },
        steeledge: {
            title: 'I Wanna Steel Edge',
            tags: [{tag: '▲50', class: 'difficulty'}, {tag: 'Avoidance', class: 'avoidance'}],
            maker: 'RandomChaos_',
            desc: 'Ranking critera: Fastest time 🤠',
            img: 'img/game/steeledge.jpg',
            link: 'https://www.mediafire.com/file/eidtjanj5kvngru/I_Wanna_Steel_Edge.zip/file',
            ranking: []
        }
    }

    var app = new Vue({
        el: '#app',
        data: {
            currentList: [
                games.seventwofour,
                games.steeledge
            ],
            gameList: [
                games.power,
                games.wacky
            ],
            previewList: [
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
                    name: 'xoro1',
                    img: 'img/maker/xoro.jpg    ',
                    links: [{link: 'https://twitter.com/iwxoro', img: 'img/icon/twitter.png'}]
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