<template>
  <div class="singer-album">
    <div class="album-slide">
      <div class="singer-img">
        <img src="../../static/img/Tchaikovsky_by_Reutlinger.jpg" alt="">
      </div>
    </div>
    <div class="des">
      <el-descriptions title="彼得·伊利奇·柴可夫斯基" :column="2" border>
        <el-descriptions-item label="罗马拼音" label-class-name="my-label" content-class-name="my-content">Pyotr Ilyich Tchaikovsky</el-descriptions-item>
        <el-descriptions-item label="俄语">Пётр Ильич Чайковский</el-descriptions-item>
        <el-descriptions-item label="出生">1840年5月7日（儒略历4月25日）
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1544 1024" version="1.1" class="rus"><path d="M10.051534 1017.717791h1519.038037V7.53865H10.051534v1010.179141z m1521.55092 2.512884v-3.769325 3.769325zM3.769325 1024V0h1531.602454V1022.743558H3.769325z" fill="#353636" p-id="3291"></path><path d="M6.282209 680.991411h1525.320245v339.239264H6.282209z" fill="#E51F1F" p-id="3292"></path><path d="M6.282209 343.008589h1525.320245v339.239264H6.282209z" fill="#232B8C" p-id="3293"></path><path d="M6.282209 3.769325h1525.320245v339.239264H6.282209z" fill="#FFFFFF" p-id="3294"></path></svg>
          俄罗斯帝国维亚特卡省沃特金斯克</el-descriptions-item>
        <el-descriptions-item label="逝世">
          1893年11月6日（儒略历10月25日）（53岁）
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1544 1024" version="1.1" class="rus"><path d="M10.051534 1017.717791h1519.038037V7.53865H10.051534v1010.179141z m1521.55092 2.512884v-3.769325 3.769325zM3.769325 1024V0h1531.602454V1022.743558H3.769325z" fill="#353636" p-id="3291"></path><path d="M6.282209 680.991411h1525.320245v339.239264H6.282209z" fill="#E51F1F" p-id="3292"></path><path d="M6.282209 343.008589h1525.320245v339.239264H6.282209z" fill="#232B8C" p-id="3293"></path><path d="M6.282209 3.769325h1525.320245v339.239264H6.282209z" fill="#FFFFFF" p-id="3294"></path></svg>
          俄罗斯帝国圣彼得堡
        </el-descriptions-item>
        <el-descriptions-item label="乐派">
          <el-tag effect="danger">
            浪漫主义
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="擅长类型">管弦乐，芭蕾，歌剧</el-descriptions-item>
        <el-descriptions-item label="国籍">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1544 1024" version="1.1" class="rus"><path d="M10.051534 1017.717791h1519.038037V7.53865H10.051534v1010.179141z m1521.55092 2.512884v-3.769325 3.769325zM3.769325 1024V0h1531.602454V1022.743558H3.769325z" fill="#353636" p-id="3291"></path><path d="M6.282209 680.991411h1525.320245v339.239264H6.282209z" fill="#E51F1F" p-id="3292"></path><path d="M6.282209 343.008589h1525.320245v339.239264H6.282209z" fill="#232B8C" p-id="3293"></path><path d="M6.282209 3.769325h1525.320245v339.239264H6.282209z" fill="#FFFFFF" p-id="3294"></path></svg>
          俄罗斯帝国
        </el-descriptions-item>
        <el-descriptions-item label="生活时期">
          <img src="../../static/img/1280px-Flag_of_the_Russian_Empire_(black-yellow-white).svg.png" alt="" class="rus">
          罗曼诺夫王朝,尼古拉一世,亚历山大二世时期
        </el-descriptions-item>
        <el-descriptions-item label="签名">
          <img src="../../static/img/Tchaikovsky's_signature_(transparent).png" alt="" width="300px">
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="nav">
      <el-menu
        default-active="#early-life"
        default-openeds=""
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Tchaikovsky</span>
          </template>
          <el-submenu index="life" style="display: block">
            <template slot="title">生平</template>
            <a href="#early-life">
              <el-menu-item index="#early-life">早年</el-menu-item>
            </a>
            <a href="#music-life">
              <el-menu-item index="#music-life">音乐生涯</el-menu-item>
            </a>
            <a href="#die">
              <el-menu-item index="#die">去世</el-menu-item>
            </a>
          </el-submenu>
          <el-submenu index="work">
            <template slot="title">作品</template>
            <a href="#symphony">
              <el-menu-item index="#symphony">交响曲</el-menu-item>
            </a>
            <a href="#orchestral">
              <el-menu-item index="#orchestral">管弦乐</el-menu-item>
            </a>
            <a href="#ballet">
              <el-menu-item index="#ballet">芭蕾舞剧</el-menu-item>
            </a>
            <a href="#opera">
              <el-menu-item index="#opera">歌剧</el-menu-item>
            </a>
          </el-submenu>
          <el-submenu index="personal-life">
            <template slot="title">个人生活</template>
            <a href="#sex">
              <el-menu-item index="#sex">性取向</el-menu-item>
            </a>
            <a href="#marrige">
              <el-menu-item index="#marrige">噩梦般的婚姻</el-menu-item>
            </a>
            <a href="#woman">
              <el-menu-item index="#woman">及时的女恩人</el-menu-item>
            </a>
          </el-submenu>
          <el-submenu index="extra-work">
            <template slot="title">衍生作品</template>
            <a href="#culture">
              <el-menu-item index="#culture">大众文化</el-menu-item>
            </a>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>

    <div class="album-content">
      <div class="intro">
        <div class="para-title">
          <span id="life" style="font-size: 1.5em;font-weight: normal;">生平</span>
        </div>
        <el-divider></el-divider>
        <div class="para-title">
          <span id="early-life" style="font-size: 1.2em;font-weight: bold;">早年</span>
        </div>
        <div class="text">彼得·伊利奇·柴可夫斯基（俄语：Пётр Ильич Чайковский[1]、英语：Pyotr Ilyich Tchaikovsky，1840年5月7日－1893年11月6日），俄国浪漫乐派作曲家，其作品有民族乐派特征，但仍以浪漫风格为基准。其风格直接和间接地影响了很多后来者。

柴可夫斯基出生于沃特金斯克一个贵族家庭，从小在母亲的教导下学习钢琴，由于父亲的反对，进入法学院学习，毕业以后在法院工作。二十二岁时柴可夫斯基辞职，进入圣彼得堡音乐学院，跟随安东·鲁宾斯坦学习音乐创作，成绩优异。毕业后，在尼可莱·鲁宾斯坦（安东·鲁宾斯坦的弟弟）的邀请下，担任莫斯科音乐学院教授。

他被认为有同性恋倾向，并且在当时的社会环境中一直试图压制，因此有意见认为这是婚姻破裂的原因。柴氏在与崇拜自己的女学生的婚姻破裂后，企图自杀，他的朋友把他送到外国疗养。这期间开始和一个热爱音乐的俄国铁路大亨富孀梅克夫人通信。后来梅克夫人成为他的资助人，他后阶段的许多作品都是献给这位夫人的。但奇妙的是两个人从来没有见过面。当他们十四年的书信往来因为这位夫人宣布公司破产而终止时，柴可夫斯基受到了很大的打击，在独自度过忧郁的三年后于莫斯科因不明原因死亡。他的死疑点重重，官方说法是他喝了带有霍乱弧菌病毒的水而染病身亡。但是据后来学者的考证，很有可能是服用砒霜而自杀。但是，这都只限于猜测，真正的原因直到现在还是一个谜
        </div>
        <div class="para-title">
          <span id="music-life" style="font-size: 1.2em;font-weight: bold;">音乐生涯</span>
        </div>
        <div class="text">
          柴可夫斯基自圣彼得堡音乐学院毕业之后，安东·鲁宾斯坦的弟弟，莫斯科音乐学院的和声学教授尼古莱·鲁宾斯坦聘请他做音乐史的教师。当时的柴可夫斯基父亲已经退休，经济上颇为拮据，因此欣然接受教职，接下来的十年都全心投入教学和创作。教书的待遇不特别好，仅能糊口而已，但柴可夫斯基从事这份工作能够有很充裕的时间创作，所以在从事教职的第一年就完成了第一号交响曲“冬之梦”，但听众反应不佳。没多久，他就因为压力太大又过度工作，在1877年时精神崩溃离开学校。休了一年假后，他尝试回到学校继续教书，但是没多久就放弃，决定退休。在瑞士休养一阵子之后，便搬到基辅与妹妹同住。

          1868年开始，柴可夫斯基与俄国国民乐派的成员逐渐走得很近。1869年在巴拉基列夫建议之后，便写了有名的管弦乐序曲《罗密欧与朱丽叶幻想序曲》[9]。但于此后，柴可夫斯基的作曲风格越来越偏向西欧风，而逐渐与强调民族素材及风格的国民乐派渐行渐远。

          有一次，柴可夫斯基在莫斯科临阵上场替代指挥他自己的歌剧“女妖”（Enchantress，俄文原文Чародейка，1885年7月），之后便开始常态性的从事指挥工作。克服与生俱来的舞台恐惧症之后，他逐渐开始习惯在舞台上指挥自己的创作，并常在欧洲各地巡回演出，结识不少当时的音乐家。

          1891年，柴可夫斯基受邀至美国指挥自己的作品，当年的5月5日，他在卡内基大厅的开幕仪式中指挥纽约音乐协会交响乐团演出。美国一行中，他也演出著名的《第一钢琴协奏曲》以及弦乐小夜曲。这首堪称柴可夫斯基最有名的降b小调钢琴协奏曲，1874年完成之初受到前同事尼可莱的恶评，也因此一直束之高阁迟迟未演，未料在美国首演却一炮而红，从此成为柴可夫斯基的招牌。

          1893年，在首演第六号交响曲《悲怆》九天后，柴可夫斯基死于圣彼得堡的家中。有些音乐学家（如Milton Cross及David Ewen）认为，柴可夫斯基对于死亡早有觉悟，而第六号交响曲正是他写给自己的安魂曲。第一主题之后紧接着快速的弦乐变化旋律以及强而有力的和声，随后出现的长号旋律和前后的旋律都没有关连，此种突兀插入的乐段（non sequitur），一般认为是俄罗斯东正教死者弥撒典型的曲式。
        </div>
        <div class="para-title">
          <span id="die" style="font-size: 1.2em;font-weight: bold;">去世</span>
        </div>
        <div class="text">
          柴可夫斯基于1893年11月6日，即第六交响曲“悲怆”在圣彼得堡首演后九天死亡。他的遗体埋葬在圣彼得堡亚历山大·涅夫斯基修道院的季赫温公墓，作曲家亚历山大·鲍罗丁和穆索斯基和格林卡的墓地也在附近[10]。

          大部分当时的学者都认为他死于霍乱，很有可能是因为在死前7天曾喝下受到污染的自来水[11]。但是近几十年来，另外几种理论逐渐流行起来，一般都相信他自杀的可能性很大[12]。他自杀的原因，可能是法学院校友会对同性恋的抵制运动导致。但也有学者认为他的死因主要是梅克夫人的疏远，让他灰心失意所致。

          音乐史学家亚历山德拉·奥尔洛娃（Aleksandra Orlova）在他未出版的《柴可夫斯基点滴》（Tchaikovsky Day by Day）一书手稿中，以口头证词做为证据来支持柴可夫斯基死于自杀的推论。他认为柴可夫斯基服用砒霜自杀，所以死亡日期和尸体处理才会遮遮掩掩，产生前后不一的说词。然而，欧洛娃的论点缺乏书面上的证据，因此受到多方质疑，至今柴可夫斯基的真正死因还是个未解的谜。

          英国籍作曲家麦克·芬尼希（Michael Finnissy）以柴可夫斯基生前的最后几天与死亡为题，作了一部名为“羞耻罪衍”（Shameful Vice）的歌剧。
        </div>
        <div class="para-title">
          <span id="work" style="font-size: 1.5em;font-weight: normal;">作品</span>
        </div>
        <el-divider></el-divider>
        <div class="text">
          在音乐创作上，柴可夫斯基很崇拜莫扎特，尤其他对旋律性的重视；他甚至模仿莫札特的风格创作了一部管弦乐组曲（Suite No. 4 in G major, "Mozartiana", Op. 61）。对于瓦格纳音乐中的一些特性他却很反感，认为瓦格纳过于重视管弦乐队而忽略了声乐，柴可夫斯基主张用现实主义手法来表现歌剧，主导动机只用以描写心理感情等内在方面。
        </div>
        <div class="para-title">
          <span id="symphony" style="font-size: 1.2em;font-weight: bold;">交响曲</span>
        </div>
        <ul>
          <li><a href="">《g小调第一交响曲“冬之梦”》</a>（1866年）──第一号交响曲是受到俄罗斯冬季景象启发写成，所以又名“冬之梦”，虽然柴可夫斯基自认有点瑕疵，但它无疑包藏了美好青年时期的梦与情怀。</li>
          <li><a href="">《c小调第二交响曲》</a>（1872年）</li>
          <li><a href="">《D大调第三交响曲》</a>（1875年）</li>
          <li><a href="">《f小调第四交响曲》</a>（1878年）</li>
          <li><a href="">《曼费德交响曲》</a>（1885年）</li>
          <li><a href="">《e小调第五交响曲》</a>（1888年）</li>
        </ul>
        <div class="para-title">
          <span id="orchestral" style="font-size: 1.2em;font-weight: bold;">管弦乐作品</span>
        </div>
        <ul>
          <li><a href="">《罗密欧与朱丽叶幻想序曲》</a>（1869年）</li>
          <li><a href="">《降b小调第一钢琴协奏曲》</a>（1874年）</li>
          <li><a href="">《D大调小提琴协奏曲》</a>（1878年）</li>
          <li><a href="">《黎密尼的法兰西丝卡》</a>（1876年）：根据但丁的《神曲》〈地狱篇〉其中一段爱情故事，所写的交响诗。</li>
          <li><a href="">《1812序曲》</a>（1880年）</li>
          <li><a href="">《弦乐小夜曲》（1880年）</a>（1880年）</li>
          <li><a href="">《意大利随想曲》（1880年）</a>（1880年）</li>
          <li><a href="">《哈姆雷特》（1888年）</a>（1888年）</li>
        </ul>
        <div class="para-title">
          <span id="ballet" style="font-size: 1.2em;font-weight: bold;">芭蕾舞剧</span>
        </div>
        <ul>
          <li><a href="">《天鹅湖》</a>（1876年）</li>
          <li><a href="">《睡美人》</a>（1889年）</li>
          <li><a href="">《胡桃夹子》</a>（1892年）</li>
        </ul>
        <div class="para-title">
          <span id="opera" style="font-size: 1.2em;font-weight: bold;">歌剧</span>
        </div>
        <ul>
          <li><a href="">《叶甫盖尼·奥涅金》</a>（1879年）</li>
          <li><a href="">《黑桃皇后》</a>（1891年）</li>
        </ul>
        <div class="para-title">
          <span id="personal-life" style="font-size: 1.5em;font-weight: normal;">个人生活</span>
        </div>
        <el-divider></el-divider>
        <div class="para-title">
          <span id="sex" style="font-size: 1.2em;font-weight: bold;">性取向</span>
        </div>
        <div class="text">
          柴可夫斯基的传记作者、历史学家普遍同意他是男同性恋[14][15][16]。莫斯科近郊的“柴可夫斯基博物馆”馆长波莉达·韦德曼女士（Polida Veydman）表示：“有时读到或听到有人说‘柴可夫斯基根本不是同性恋，这全是不爱国的科学家造的谣’，只能让我觉得好笑。否定他是同性恋者很荒谬”。 韦德曼指出，你只要阅读柴可夫斯基的信函、日记，就会发现，他对自己的隐私，从恋爱到失恋等等都有坦白的描述”[17]。

          韦德曼女士表示柴可夫斯基的性倾向和其音乐创作有关。她说：“柴可夫斯基的所有作品都具有浓厚的自传色彩，他人格上的重要内涵当然在作品中起到了关键作用”。中年以后的柴可夫斯基坦然面对自己的同性恋现实，韦德曼排除作曲家曾因其性取向问题遭受迫害的说法，因为当时俄罗斯的上流社会对于同性恋非常宽容[17]。

          尽管俄国总统普丁承认柴可夫斯基是男同性恋[18]，然而在俄国的恐同氛围下，俄罗斯的文化部和其赞助的传记电影公然否认柴可夫斯基的性倾向身份[19]。
        </div>
        <div class="para-title">
          <span id="marrige" style="font-size: 1.2em;font-weight: bold;">噩梦般的婚姻</span>
        </div>
        <div class="text">
          在他于莫斯科音乐学院教书时，一名偏执的女学生安东妮雅·米露可娃（Antonina Miliukova）以大量情书攻势疯狂倒追他，扬言非他不嫁，甚至以死要胁。其实柴可夫斯基根本不记得自己班上有这个学生，但是女学生相当坚持，不断持续写信。当时柴可夫斯基迷上普希金的诗作“叶甫盖尼·奥涅金”，正打算改编成歌剧。由于诗作中的主角叶甫盖尼·奥涅金年轻时拒绝了塔姬雅娜以致后来终生活在悔恨当中，入戏太深的柴可夫斯基将自己想成叶甫盖尼，认为自己不应回绝这段感情。两人于1877年7月18日结婚[20]。
          蜜月还没结束，柴可夫斯基就后悔了，在两人于7月26日回到莫斯科时，他已经濒临崩溃。周遭的朋友们都看得出来他的状况很不好，但是没有人知道严重性。婚后两周，他企图在冰冷的莫斯科河中自杀，但是随后却因为受不住寒冷而放弃，也因此染上严重的肺炎。精神上完全崩溃的柴可夫斯基逃到圣彼得堡。

          他的弟弟安纳托利（Anatoly）到圣彼得堡火车站接他时，几乎认不出面前那个一脸憔悴、濒临崩溃的病弱男子就是自己的哥哥。安纳托利火速将他送到邻近的旅馆，发作了一阵之后，柴可夫斯基昏迷了整整两天。这期间他到底做了什么、说了什么，除了安纳托利之外大概就只有精神医师知道。医师建议柴可夫斯基彻底改变生活形态，要他不要想要尝试改善自己的婚姻，也不要再见新婚妻子。自此之后，柴可夫斯基再也没有见过安东妮雅，但会定期寄生活费给她，到死为止两人的婚姻关系都还保持着。

          此后的几年，柴可夫斯基很害怕安东妮雅会将他们两人分开的内幕公诸于世。安纳托利试着说服她去办理离婚，安东妮雅却不肯离婚，也不愿配合，对外宣称两人婚姻破裂的理由是因为柴可夫斯基有外遇。出版商尤尔金森（Pyotr I. Jürgenson）费尽唇舌为柴可夫斯基争取离婚机会却始终未果，却在1880年的夏天发现安东妮雅另结新欢已有半年，还生了孩子，都被丢到孤儿院。安东妮雅在1896年被诊断出有精神病，并于1917年死于并发症。

          至于柴可夫斯基，他并不将自己的精神崩溃归咎于安东妮雅，而相信那是命定的悲剧，是对于他为了结婚而结婚的惩罚。尽管结婚的经验像是一场梦魇，柴可夫斯基对于婚姻的憧憬却从未消减。当安纳托利订婚时，柴可夫斯基写了一封感人的信给他，信中提到“有时候我真的很希望能够被一个女人温柔的触摸与疼爱。我常幻想被一个慈爱的女人所拥抱，我能够躺在他的腿上亲吻着她...”后世的学者认为柴可夫斯基对于妻子的观念其实是错误的，只是想借由婚姻来取回早逝的母亲罢了。
        </div>
        <div class="para-title">
          <span id="woman" style="font-size: 1.2em;font-weight: bold;">及时的女恩人</span>
        </div>
        <div class="text">
          一个对柴可夫斯基更有影响的是一位有钱的寡妇，名叫娜杰日达·冯·梅克。她和柴可夫斯基于1877年至1890年间互通的信件达一千两百封。在她的坚持下两人从未见面。但在机缘巧合下他们在两个不同场合下偶然地碰上，不过他们没有交谈。她不但提供了一年六千卢布的赞助，亦表达了对柴可夫斯基的音乐事业的关注及其音乐的赞赏。可惜的是这段关系于十三年后结束了，原因是她自称破产。

          有人认为她停止资助的原因是因为她发现了柴可夫斯基的同性恋身份，而不是因为破产。不过，她的二女儿亚历山德拉（Alexandra）（她意外地以文字把她的父亲吓死——她写了一封信告诉父亲说姊妹Milochka并不是他的亲生女儿）在母亲开始资助柴可夫斯基的时候，已经告诉了她柴可夫斯基是同性恋，所以梅克夫人应不会因此而停止资助，她聪明地及极度勤奋地发掘有关柴可夫斯基的一切。有说她对柴可夫斯基一生的感情生活中并不会有女性的存在感到满意。

          据说柴可夫斯基被她的突然终止赞助大受打击，更一路消沉。终其一生他亦未能了解梅克夫人终止赞助的原因。他所不知的内情，只在冯·梅克家族内流传。他们同时也是受害者，因为他们在死前未能解开所有误会。梅克夫人的财政状况比她向外公开的还要差：她的女婿Shirinsky勒索她，威胁要公开他妻子Milochka父亲另有其人的秘密；儿子弗拉基米尔（Vladimir）过度挥霍，要求母亲更多的资助。梅克夫人的病情益发严重，她染上了结核病，而病菌已经感染到了她的喉头。在柴可夫斯基过世三个月后，她也步其后尘，窒息而死。

          另外一个使误会不能解开的原因是梅克夫人的手臂萎缩，使她不能写信。
        </div>
        <div class="para-title">
          <span id="extra-work" style="font-size: 1.5em;font-weight: normal;">衍生作品</span>
        </div>
        <el-divider></el-divider>
        <div class="para-title">
          <span id="culture" style="font-size: 1.2em;font-weight: bold;">大众文化</span>
        </div>
        <div class="text">
          柴可夫斯基的音乐常被流行音乐和电影引用，例如《交响人生》中的柴可夫斯基小提琴协奏曲，仍然可以听出浓厚的俄国风范。1940年华特迪士尼公司的动画电影《幻想曲》采用了《胡桃夹子》中的几首歌曲。2021年电视剧《叛逆者》采用了《四季》中的《六月：船歌》及其变奏作为背景音乐。
        </div>
       </div>
    </div>
<!--      <div class="content">-->
<!--        <album-content :songList="listOfSongs">-->
<!--          <template slot="title">歌单</template>-->
<!--        </album-content>-->
<!--      </div>-->
      </div>
</template>

<script>
export default {
  name: 'Introduction',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    // handleSelect (key, keyPath) {
    //   console.log(key)
    //   window.location.href = 'http://localhost:8082/introduction' + key
    // },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/introduce";
</style>
