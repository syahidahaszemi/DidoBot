const Telegraf = require('telegraf');
//const { Composer } = require('micro-bot')
//const bot = new Composer

/*bot.start((ctx) => {
    ctx.reply('Hello apa khabar')
})*/

// shrouded-springs-65878 id heroku
// https://shrouded-springs-65878.herokuapp.com/ and https://git.heroku.com/shrouded-springs-65878.git server heroku

const bot = new Telegraf('1410566262:AAFHgqkaSFVYeQU5liSJ1_VGWACn2pWuh3Q');

const axios = require('axios');

//const apikey = "129ceb9231d6a4b260ac296fe0ddde411e7f9db24c10a9a80cab5b5a5d9a1850";
//database//
const mysql = require('mysql');

//mysql://b1d5a4ba692efd:68747ae9@us-cdbr-east-02.cleardb.com/heroku_5be77b62e4f10d6?reconnect=true
const conn = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: " ",
    // database: "didobot"
    host: "us-cdbr-east-02.cleardb.com",
    user: "b1d5a4ba692efd",
    password: "68747ae9",
    database: "heroku_5be77b62e4f10d6"
})

dbcon();
function dbcon(){
    console.log("Connected !");

    setInterval(function () {
        db.query('SELECT 1');
    }, 5000);
    conn.query("SELECT * FROM gettoknow", function (err, result, fields){
        if(err){
            throw err;
        }
        dataStore = [];
        //console.log(result);
        result.forEach(item => {
            //console.log(item.name);
            dataStore.push({
                id: item.id,
                mood: item.mood,
            })
        })
    })
}
//database//

//helpinfo//
const helpMessage = `
    Untuk memulakan perbualan:
    /start
    @DiidooBot

    Untuk bantuan:
    /helpSOS

    Untuk borak:
    /borak

    Untuk kata kata rawak:
    /fortune

    Untuk feedback:
    /feedback Baik
    /feedback TidakBaik

    Untuk akhirkan perbualan:
    /bye
`;
bot.action('help', ctx => {
    ctx.reply(helpMessage);
});
//helpinfo//

bot.command('helpSOS', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Hai awak. Jikalau awak betul betul perlukan bantuan, awak boleh telefon 019-2615999 atau klik sahaja url ini untuk terus ke whatsapp Talian Kasih http://wa.me/60192615999`);
    bot.telegram.sendAnimation(ctx.chat.id, 'https://media1.tenor.com/images/a90ee0f3d1ca364529a1fd3d82213686/tenor.gif?itemid=4959049');
})
//welcome//
bot.command('start', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Halo! Apa khabar awak! Saya Dido!");
    bot.telegram.sendMessage(ctx.chat.id, "Adakah awak pertama kali berbual dengan saya?",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Ya', callback_data: 'ya'},
                    { text: 'Tidak', callback_data: 'help'}
                ]
            ]
        }
    })
    //console.log(ctx.chat);
})

bot.command('start', ctx => {
    sendStartMessage(ctx);
});

bot.hears('Siapa awak', ctx => {
    ctx.reply("Saya adalah Dido!");
})

bot.mention('DepressingBot', ctx => {
    ctx.reply('hai! apa boleh saya bantu? (Boleh /help untuk tahu)');

})

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})
//welcome//

//soalan//
bot.action('ya', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Sudikah awak untuk menjawab beberapa soalan untuk saya mengenali diri awak?',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Boleh', callback_data: 'boleh'},
                    { text: 'Tidak mengapa', callback_data: 'tidak'}
                    //{ text: 'Kembali ke menu utama', callback_data: 'menu'}
                ]
            ]
            
        }
    });    
})
//soalan//

//ending//
bot.action('tidak', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Kalau begitu jumpa lagi!');  
})
//ending//

//callbackdata boleh//
bot.action('boleh', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `Bolehkah anda memberitahu saya sedikit tentang apa yang sedang berlaku dalam hidup anda yang telah membawa anda ke sini hari ini?
    Pilih salah satu dari pilihan yang diberi.
    Ia akan membantu saya mula merancang program yang sesuai untuk awak dan juga mengenali sedikit tentang diri awak 😊
    /startmood - untuk memulakan`);
})
//callbackdata boleh//

//mood//
bot.command('startmood', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Sila taip /mood *mood awak* daripada pilihan yang di bawah ini",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kemurungan (Depression)', callback_data: 'kemurungan'},
                    {text: 'Kegelisahan (Anxiety)', callback_data: 'kegelisahan'}
                ],
                [
                    {text: 'Kesedihan (Sadness)', callback_data: 'kesedihan'},
                    {text: 'Kekosongan (Emptiness)', callback_data: 'kekosongan'}
                ],
                [
                    {text: 'Tidur (Sleep Problems)', callback_data: 'tidur'},
                    {text: 'Hubungan (Relationships Problem)', callback_data: 'hubungan'}
                ],
                [
                    {text: 'Kemarahan (Anger)', callback_data: 'kemarahan'},
                    {text: 'Kesunyian (Loneliness)', callback_data: 'kesunyian'}
                ],
                [
                    {text: 'Tekanan (Stress)', callback_data: 'tekanan'}
                ]
            ]
            
        }
    })
})

bot.command('mood', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let gettoknowMood = input[1];
    var sql = `INSERT INTO gettoknow (mood, telegram_id, first_name, username, type) VALUES ('${gettoknowMood}', '${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${ctx.chat.type}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data ${gettoknowMood} berhasil ditambahkan ke database`)
        ctx.reply(`Oh, ${gettoknowMood}..`);
        ctx.reply(`Mesti agak sukar untuk awak, ${ctx.chat.username}. Tapi awak datang pada tempat yang betul.`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: '😊', callback_data: 'moodsurvey'}
                    ]
                ]
            }
        })
        dbcon();
    })
})
//mood//

//mood survey//
bot.action('moodsurvey', ctx => {
    //ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Jadi, awak! Sudi tak awak nak teruskan jawab beberapa soalan lagi dari saya? Saya nak kenal lagi dalam tentang awak!',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Okay', callback_data: 'S_1'},
                    { text: 'Tidak mengapa lah', callback_data: 'tidak'}
                ],
                [
                    { text: 'Saya nak borak dengan Dido', callback_data: 'borak'}
                ]
            ] 
        }
    });    
})

bot.action('S_1', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `Sila jawab soalan dengan /S1 *jawapan* Contoh: /S1 ya
    Soalan 1:
    Jadi, anda sekarang ada ahli terapi? (ya/tidak)`);
})

bot.command('S1', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS1= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s1) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS1}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS1}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_2'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_2', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, ` 
    Soalan 2:
    Adakah doktor atau ahli terapi anda sarankan aplikasi mudah alih? (ya/tidak)`);
})

bot.command('S2', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS2= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s2) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS2}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS2}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_3'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_3', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 3:
    Adakah anda pernah didiagnosis dengan keadaan kesihatan mental? (ya/tidak)`);
})

bot.command('S3', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS3= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s3) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS3}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS3}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_4'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_4', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 4:
    Adakah anda sedang mengambil ubat-ubatan untuk keadaan kesihatan mental? (ya/tidak)`);
})

bot.command('S4', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS4= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s4) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS4}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS4}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_5'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_5', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 5:
    Adakah anda pernah mengguna aplikasi seperti Dido ini? (ya/tidak)`);
})

bot.command('S5', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS5= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s5) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS5}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS5}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_6'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_6', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 6:
    Adakah anda rasa Dido dapat membantu anda? (ya/tidak)`);
})

bot.command('S6', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS6= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s6) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS6}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS6}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_7'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_7', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 7:
    Okay, sekarang saya akan tanya soalan khusus tentang apa yang anda rasa
    Sejak 2 minggu kebelakangan ini, seberapa kerap anda terganggu dengan masalah berikut:
        •	Sedikit minat untuk melakukan sesuatu

    a. Tidak sama sekali
    b. Beberapa hari
    c. Lebih dari setengah hari
    d. Hampir Setiap Hari

    (a/b/c/d)`);
})

bot.command('S7', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS7= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s7) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS7}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS7}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_8'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_8', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 8:
    Dan sejak 2 minggu kebelakangan ini, berapa kali anda terganggu dengan perasaan sedih, murung, atau putus asa?

    a.	Tidak sama sekali
    b.	Beberapa hari
    c.	Lebih dari setengah hari
    d.	Hampir setiap hari

    (a/b/c/d)`);
})

bot.command('S8', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS8= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s8) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS8}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS8}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_9'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_9', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 9:
    Dan sejak 2 minggu kebelakangan ini, berapa kali anda terganggu dengan perasaan gelisah, gementar, terdesak, atau tidak dapat berhenti atau mengawal kebimbangan?
    
    a.	Tidak sama sekali
    b.	Beberapa hari
    c.	Lebih dari setengah hari
    d.	Hampir setiap hari

    (a/b/c/d)`);
})

bot.command('S9', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS9= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s9) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS9}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS9}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_10'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_10', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 10:
    Adakah anda ok pada ketika ini?
    (ya/tidak)`);
})

bot.command('S10', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyS10= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s10) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS10}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyS10}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Seterusnya', callback_data: 'S_11'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('S_11', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, `
    Soalan 11:
    Berapakah umur anda?`);
})

bot.command('S11', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyAge= input[1];
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, Age) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyAge}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${moodsurveyAge}" berhasil ditambahkan ke database`)
        ctx.reply(`👇🏻`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Habis!', callback_data: 'habis'}
                    ]
                ]
            }
        })
        dbcon();
    })
})

bot.action('habis', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Terima kasih kerana menjawab soalan dari saya! Awak terbaik!`);
    bot.telegram.sendAnimation(ctx.chat.id, "https://media.tenor.com/images/fb22e549f1f1c9729aeb986783c81371/tenor.gif");
    bot.telegram.sendMessage(ctx.chat.id, "Awak nak teruskan lagi dengan saya tak?", 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak!', callback_data: 'nak'},
                    { text: 'Tidak mengapa', callback_data: 'tidak'}
                ]
            ]
            
        }
    });
})  
//mood survey//

//random quotes//
bot.action('nak', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Awak nak dengar satu kata kata yang rawak tak?',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak (/fortune)', callback_data: 'fortune'},
                    { text: 'Tidak mengapa', callback_data: 'bye'}
                ]
            ]
        }
    });    
})

bot.command('fortune', ctx => {
   axios.get('http://yerkee.com/api/fortune')
   .then(res => {
       ctx.reply(res.data.fortune);
   }).catch(e => {
       console.log(e);
   })
   bot.telegram.sendMessage(ctx.chat.id, 'Apa pendapat awak mengenai perbualan hari ini? (Baik/TidakBaik) [Contoh: /feedback Baik]');       
})

//random quotes//

//feedback//
bot.command('feedback', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let feedbackFeedback= input[1];
    var sql = `INSERT INTO feedback (telegram_id, first_name, username, feedback) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${feedbackFeedback}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data "${feedbackFeedback}" berhasil ditambahkan ke database`)
        ctx.reply(`👍🏻`);
        ctx.reply(helpMessage);
        dbcon();
    })
})

//bye//
bot.command('bye', ctx => {
    ctx.reply(`Okaylah ${ctx.chat.first_name}, saya gembira dapat jumpa dengan awak hari ini! Awak telah melakukan tugasan yang sangat baik!
    Saya teruja untuk terus bekerjasama dengan awak 😊
    Jumpa esok, bye!`
    );
})
//bye// 

//borak//
bot.command('borak', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Pilih salah satu dari pilihan di bawah ini',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '1', callback_data: '1'},
                    { text: '2', callback_data: '2'}
                ],
                [
                    { text: '3', callback_data: '3'},
                    { text: '4', callback_data: '4'}
                ]
            ] 
        }
    });    
})

bot.action('borak2', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Pilih salah satu dari pilihan di bawah ini',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '1', callback_data: '1'},
                    { text: '2', callback_data: '2'}
                ],
                [
                    { text: '3', callback_data: '3'},
                    { text: '4', callback_data: '4'}
                ]
            ] 
        }
    });    
})

bot.action('1', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Awak tau tak, separuh dari sejuta rakyat Malaysia alami simptom depressi?", 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Tau! 😎', callback_data: 'tau'},
                    { text: 'Tak tahu 🤔', callback_data: 'tidaktau'}
                ]
            ]
        }
    })

})

bot.action('tidaktau', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
    Pandemik Covid-19 dan Perintah Kawalan Pergerakan (MCO) telah menyebabkan tekanan emosi kepada banyak orang, berikutan perubahan persekitaran kerja (terpaksa bekerja dari rumah), sementara yang lain kehilangan pendapatan dan bahkan pekerjaan dan takut akan keselamatan mereka.`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😱', callback_data: 'tau'}
                ]
            ]
        }
    })
})

bot.action('tau', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
    Saya harap keadaan mental awak berada dalam keadaan yang baik ☺️`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '☺️', callback_data: 'borak2'},
                    { text: '😞', callback_data: 'startmood'}
                ]
            ]
        }
    })
})

bot.action('2', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Sebagai kawan bot kepada awak, saya rasa saya perlu bagitahu tentang apa itu Depresi.
Depresi ditakrifkan sebagai kehadiran mood yang tertekan dan / atau hilangnya minat / keseronokan,
digabungkan dengan lima atau lebih gejala berikut: perubahan selera makan atau berat badan, masalah tidur,
pergolakan atau keterbelakangan psikomotor, keletihan, perasaan tidak berharga, kehilangan tumpuan, atau pemikiran bunuh diri yang berulang.

Awak ada alami situasi begini?`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Pernah', callback_data: 'pernah'},
                    { text: 'Tidak pernah', callback_data: 'tidakpernah'}
                ]
            ]
        }
    })

})

bot.action('pernah', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Sedihnya apabila awak pernah mengalaminya. Jikalau awak nak perlukan bantuan boleh /helpSOS okay? 

    Saya memahami bahawa perasaan pendam itu sangat menyakitkan. Saya harap awak dapat meluahkan perasaan kepada sesiapa yang awak rasa boleh dipercayai.
    Jika tidak, awak boleh borak dengan saya :)`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Baik Dido', callback_data: 'borak2'},
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('tidakpernah', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Tahniah kerana awak adalah seorang yang terbaik dalam menjaga emosi awak!`);
    bot.telegram.sendAnimation(ctx.chat.id, "https://media.tenor.com/images/8a070cf60f5a02dbe17aebc0fb0623ab/tenor.gif",
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'borak2'},
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('3', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Nak lihat video berkenaan 6 cara untuk sembuhkan simptom depresi?',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak', callback_data: 'video'},
                    { text: 'Tidak mengapa', callback_data: 'borak2'},
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('video', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `https://youtu.be/chE00kGtg48`);
})

bot.action('4', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Hai awak, nak luahkan sesuatu?',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak', callback_data: 'video'},
                    { text: 'Tidak mengapa', callback_data: 'borak2'},
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})
//borak//

bot.launch();
//module.exports = bot

/*function sendStartMessage(ctx){
    let startMessage = 'Selamat datang, bot ini memberikan informasi mengenai mata wang crypto';
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Harga crypto", callback_data: 'price'}
                    ],
                    [
                        {text: "Coin Market Cap", url: 'https://www.cryptocompare.com/'}
                    ]
                ]
            }
        })
}

bot.command('start', ctx => {
    let startMessage = 'Selamat datang, bot ini memberikan informasi mengenai mata wang crypto';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Harga crypto", callback_data: 'price'}
                    ],
                    [
                        {text: "Coin Market Cap", url: 'https://www.cryptocompare.com/'}
                    ]
                ]
            }
        })

});

bot.action('price', ctx => {
    let priceMessage = 'Dapatkan informasi harga, pilih satu mata wang crypto dibawah ini';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
        {
            reply_markup:{
                inline_keyboard: [
                    [
                        {text: "BTC", callback_data: 'price-BTC'},
                        {text: "ETH", callback_data: 'price-ETH'}
                    ],
                    [
                        {text: "BCH", callback_data: 'price-BCH'},
                        {text: "BSV", callback_data: 'price-BSV'}
                    ],
                    [
                        {text: "Kembali ke menu", callback_data: 'start'}
                    ]
                ]
            }
        })
})

let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-BSV'];
bot.action(priceActionList, async ctx => {
   //console.log(ctx.match);
   let symbol = ctx.match.split('-')[1];
   //console.log(symbol);
   try{
       let res = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=MYR&api_key=${apikey}');
       console.log(res);
    }catch(err){
       console.log(err);
       ctx.reply("Error ditemukan");
   }
})

//inline keyboard
bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Menu Utama',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Lihat list buah', callback_data: 'buah'},
                    { text: 'Lihat list sayur', callback_data: 'sayur'}
                ],
                [
                    { text: 'Lihat list daging', callback_data: 'daging'},
                    
                ]
            ]
        }
    })
})

bot.action('daging', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'List Daging: \n-Daging Ayam\n-Daging Lembu',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Kembali ke menu utama', callback_data: 'menu'}
                ]
            ]
            
        }

    });    
})

bot.action('menu', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Menu Utama',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Lihat list buah', callback_data: 'buah'},
                    { text: 'Lihat list sayur', callback_data: 'sayur'}
                ],
                [
                    { text: 'Lihat list daging', callback_data: 'daging'},
                    
                ]
            ]
        }
    });    
})*/
