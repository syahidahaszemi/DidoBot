
const Telegraf = require('telegraf');


// const { Composer } = require('micro-bot');
// const bot = new Composer

/*bot.start((ctx) => {
    ctx.reply('Hello apa khabar! Saya Dido')
})*/

//desolate-bastion-30036
//https://desolate-bastion-30036.herokuapp.com/ | https://git.heroku.com/desolate-bastion-30036.git
//https://shrouded-springs-65878.herokuapp.com/

//boturl : https://api.telegram.org/bot1410566262:AAFHgqkaSFVYeQU5liSJ1_VGWACn2pWuh3Q/setWebhook?url=https://shrouded-springs-65878.herokuapp.com/

const bot = new Telegraf('1410566262:AAFHgqkaSFVYeQU5liSJ1_VGWACn2pWuh3Q');
            
const axios = require('axios');

//const apikey = "129ceb9231d6a4b260ac296fe0ddde411e7f9db24c10a9a80cab5b5a5d9a1850";

//database//
const mysql = require('mysql');

//mysql://b1d5a4ba692efd:68747ae9@us-cdbr-east-02.cleardb.com/heroku_5be77b62e4f10d6?reconnect=true
//mysql://b5db2f8846099d:48cb9f6c@us-cdbr-east-03.cleardb.com/heroku_3b3e07f0ee19ab1?reconnect=true
const conn = mysql.createConnection({
    host: "us-mm-dca-6531bbe25fcb.g5.cleardb.net", 
    user: "b1d5a4ba692efd", 
    password: "68747ae9", 
    database: "heroku_5be77b62e4f10d6" 
})

dbcon();
function dbcon(){
    console.log("Connected !");

    setInterval(function () {
        conn.query('SELECT 1');
    }, 10000);
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
                telegram_id: item.telegram_id,
                first_name: item.first_name,
                username: item.username,
                type: item.type
            })
        })
    })
    conn.query("SELECT * FROM feedback", function (err, result, fields){
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
                telegram_id: item.telegram_id,
                first_name: item.first_name,
                username: item.username,
                feedback: item.feedback
            })
        })
    })
    conn.query("SELECT * FROM moodsurvey", function (err, result, fields){
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
                telegram_id: item.telegram_id,
                first_name: item.first_name,
                username: item.username,
                age: item.age,
                s1: item.s1,
                s2: item.s2,
                s3: item.s3,
                s4: item.s4,
                s5: item.s5,
                s6: item.s6,
                s7: item.s7,
                s8: item.s8,
                s9: item.s9,
                s10: item.s10,
                s11: item.s11
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

    Untuk bantuan kecemasan:
    /helpSOS

    Kembali ke Bantuan 
    /help

    Untuk mood harian 
    /startmood

    Untuk borak dan tips:
    /borak

    Untuk akhirkan perbualan:
    /bye
`;

bot.command('help', ctx => {
    ctx.reply(helpMessage);
});

bot.action('help', ctx => {
    ctx.reply(helpMessage);
});
//helpinfo//

bot.command('helpSOS', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Hai awak. Jikalau awak betul betul perlukan bantuan, awak boleh telefon 012-2586599 atau klik sahaja url ini untuk terus ke whatsapp Talian Kasih http://wa.me/60122586599`);
    bot.telegram.sendAnimation(ctx.chat.id, 'https://media1.tenor.com/images/a90ee0f3d1ca364529a1fd3d82213686/tenor.gif?itemid=4959049');
})


//welcome//
bot.command('start', (ctx) => {
    //bot.telegram.sendMessage(ctx.chat.id, "Halo! Apa khabar awak! Saya Dido!");
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT FROM NEW USER
    ID: ${ctx.chat.id}`);
    ctx.reply(helpMessage);
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

// bot.action('start', ctx => {
//     ctx.deleteMessage();
//     sendStartMessage(ctx);
// })
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
    bot.telegram.sendMessage(ctx.chat.id, `Apa perasaan awak pada ketika ini? 🌙`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kemurungan (Depression)', callback_data: 'mood1'},
                    {text: 'Kegelisahan (Anxiety)', callback_data: 'mood2'}
                ],
                [
                    {text: 'Kesedihan (Sadness)', callback_data: 'mood3'},
                    {text: 'Kekosongan (Emptiness)', callback_data: 'mood4'}
                ],
                [
                    {text: 'Tidur (Sleep Problems)', callback_data: 'mood5'},
                    {text: 'Hubungan (Relationships Problem)', callback_data: 'mood6'}
                ],
                [
                    {text: 'Kemarahan (Anger)', callback_data: 'mood7'},
                    {text: 'Kesunyian (Loneliness)', callback_data: 'mood8'}
                ],
                [
                    {text: 'Tekanan (Stress)', callback_data: 'mood9'}
                ]
            ]
        }
    })    
})

bot.action('mood1', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kemurungan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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

bot.action('mood2', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kegelisahan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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

bot.action('mood3', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kesedihan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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

bot.action('mood4', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kekosongan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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


bot.action('mood5', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Tidur";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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


bot.action('mood6', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Hubungan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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


bot.action('mood7', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kemarahan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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


bot.action('mood8', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Kesunyian";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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


bot.action('mood9', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let gettoknowMood = "Tekanan";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A DAILY MOOD USER
    ID: ${ctx.chat.id}
    Mood: ${gettoknowMood}`);
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
    bot.telegram.sendMessage(ctx.chat.id, 'Jadi, awak! Sudi tak awak nak teruskan jawab beberapa soalan lagi dari saya? Saya nak kenal lagi lebih tentang awak!',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Okay', callback_data: 'S_1'},
                    { text: 'Tidak mengapa lah', callback_data: 'tidak'}
                ],
                [
                    { text: `Saya nak borak dengan Dido`, callback_data: 'borak2'}
                ]
            ] 
        }
    });    
})

bot.action('S_1', ctx => {
    ctx.reply(`
    💫 Soalan 1:
        Jadi, anda sekarang ada ahli terapi? (ya/tidak)`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S1Y'},
                    {text: 'Tidak', callback_data: 'S1N'}                    
                ]
            ]
        }
    })  
    bot.telegram.sendMessage(ctx.chat.id, );
})

bot.action('S1Y', ctx => {
    //let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS1= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 1
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS1}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s1) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS1}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S1 "${moodsurveyS1}" berhasil ditambahkan ke database`)
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

bot.action('S1N', ctx => {
    //let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS1= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 1
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS1}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s1) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS1}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S1 "${moodsurveyS1}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 2:
        Adakah doktor atau ahli terapi anda sarankan aplikasi mudah alih?`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S2Y'},
                    {text: 'Tidak', callback_data: 'S2N'}                    
                ]
            ]
        }
    })    
})

bot.action('S2Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Amaran! Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS2= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 2
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS2}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s2) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS2}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S2 "${moodsurveyS2}" berhasil ditambahkan ke database`)
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

bot.action('S2N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Amaran! Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS2= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 2
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS2}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s2) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS2}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S2 "${moodsurveyS2}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 3:
        Adakah anda pernah didiagnosis dengan keadaan kesihatan mental? (ya/tidak)`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S3Y'},
                    {text: 'Tidak', callback_data: 'S3N'}                    
                ]
            ]
        }
    }) 
})

bot.action('S3Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS3= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 3
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS3}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s3) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS3}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S3 "${moodsurveyS3}" berhasil ditambahkan ke database`)
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

bot.action('S3N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS3= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 3
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS3}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s3) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS3}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S3 "${moodsurveyS3}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 4:
        Adakah anda sedang mengambil ubat-ubatan untuk keadaan kesihatan mental? (ya/tidak)`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S4Y'},
                    {text: 'Tidak', callback_data: 'S4N'}                    
                ]
            ]
        }
    }) 
})

bot.action('S4Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS4= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 4
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS4}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s4) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS4}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S4 "${moodsurveyS4}" berhasil ditambahkan ke database`)
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

bot.action('S4N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS4= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 4
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS4}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s4) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS4}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S4 "${moodsurveyS4}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 5:
        Adakah anda pernah mengguna aplikasi seperti Dido ini? (ya/tidak)`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S5Y'},
                    {text: 'Tidak', callback_data: 'S5N'}                    
                ]
            ]
        }
    }) 
})

bot.action('S5Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS5= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 5
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS5}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s5) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS5}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S5 "${moodsurveyS5}" berhasil ditambahkan ke database`)
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

bot.action('S5N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS5= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 5
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS5}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s5) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS5}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S5 "${moodsurveyS5}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 6:
        Adakah anda rasa Dido dapat membantu anda? (ya/tidak)`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S6Y'},
                    {text: 'Tidak', callback_data: 'S6N'}                    
                ]
            ]
        }
    }) 
})

bot.action('S6Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS6= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 6
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS6}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s6) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS6}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S6 "${moodsurveyS6}" berhasil ditambahkan ke database`)
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

bot.action('S6N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS6= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 6
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS6}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s6) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS6}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S6 "${moodsurveyS6}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 7:
        Okay, sekarang saya akan tanya soalan khusus tentang apa yang anda rasa

        Sejak 2 minggu kebelakangan ini, seberapa kerap anda terganggu dengan masalah berikut:
        •	Sedikit minat untuk melakukan sesuatu

        a. Tidak sama sekali
        b. Beberapa hari
        c. Lebih dari setengah hari
        d. Hampir Setiap Hari
    `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'a', callback_data: 'S7a'},
                    {text: 'b', callback_data: 'S7b'}                    
                ],
                [
                    {text: 'c', callback_data: 'S7c'},
                    {text: 'd', callback_data: 'S7d'}                    
                ]
            ]
        }
    })
})

bot.action('S7a', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS7= "a";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 7
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS7}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s7) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS7}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S7 "${moodsurveyS7}" berhasil ditambahkan ke database`)
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

bot.action('S7b', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS7= "b";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 7
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS7}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s7) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS7}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S7 "${moodsurveyS7}" berhasil ditambahkan ke database`)
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

bot.action('S7c', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS7= "c";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 7
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS7}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s7) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS7}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S7 "${moodsurveyS7}" berhasil ditambahkan ke database`)
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

bot.action('S7d', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS7= "d";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 7
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS7}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s7) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS7}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S7 "${moodsurveyS7}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 8:
        Dan sejak 2 minggu kebelakangan ini, berapa kali anda terganggu dengan perasaan sedih, murung, atau putus asa?

        a.	Tidak sama sekali
        b.	Beberapa hari
        c.	Lebih dari setengah hari
        d.	Hampir setiap hari
    `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'a', callback_data: 'S8a'},
                    {text: 'b', callback_data: 'S8b'}                    
                ],
                [
                    {text: 'c', callback_data: 'S8c'},
                    {text: 'd', callback_data: 'S8d'}                    
                ]
            ]
        }
    })
})

bot.action('S8a', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS8= "a";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 8
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS8}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s8) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS8}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S8 "${moodsurveyS8}" berhasil ditambahkan ke database`)
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

bot.action('S8b', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS8= "b";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 8
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS8}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s8) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS8}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S8 "${moodsurveyS8}" berhasil ditambahkan ke database`)
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

bot.action('S8c', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS8= "c";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 8
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS8}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s8) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS8}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S8 "${moodsurveyS8}" berhasil ditambahkan ke database`)
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

bot.action('S8d', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS8= "d";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 8
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS8}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s8) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS8}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S8 "${moodsurveyS8}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 9:
        Dan sejak 2 minggu kebelakangan ini, berapa kali anda terganggu dengan perasaan gelisah, gementar, terdesak, atau tidak dapat berhenti atau mengawal kebimbangan?
    
        a.	Tidak sama sekali
        b.	Beberapa hari
        c.	Lebih dari setengah hari
        d.	Hampir setiap hari

    `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'a', callback_data: 'S9a'},
                    {text: 'b', callback_data: 'S9b'}                    
                ],
                [
                    {text: 'c', callback_data: 'S9c'},
                    {text: 'd', callback_data: 'S9d'}                    
                ]
            ]
        }
    })
})

bot.action('S9a', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS9= "a";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 9
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS9}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s9) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS9}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S9 "${moodsurveyS9}" berhasil ditambahkan ke database`)
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

bot.action('S9b', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS9= "b";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 9
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS9}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s9) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS9}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S9 "${moodsurveyS9}" berhasil ditambahkan ke database`)
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

bot.action('S9c', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS9= "c";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 9
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS9}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s9) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS9}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S9 "${moodsurveyS9}" berhasil ditambahkan ke database`)
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

bot.action('S9d', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS9= "d";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 9
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS9}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s9) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS9}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S9 "${moodsurveyS9}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 10:
        Adakah anda ok pada ketika ini?`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Ya', callback_data: 'S10Y'},
                    {text: 'Tidak', callback_data: 'S10N'}                    
                ]
            ]
        }
    })
})

bot.action('S10Y', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS10= "Ya";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 10
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS10}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s10) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS10}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S10 "${moodsurveyS10}" berhasil ditambahkan ke database`)
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

bot.action('S10N', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let moodsurveyS10= "Tidak";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 10
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyS10}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, s10) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyS10}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S10 "${moodsurveyS10}" berhasil ditambahkan ke database`)
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
    ctx.reply(`
    💫 Soalan 11:
        Berapakah umur anda?
        Sila taip /S11 *umur anda* Contoh: /S11 23`
    );
})

bot.command('S11', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama mood pada argument ke 2");
        return;
    }
    let moodsurveyAge= input[1];
    bot.telegram.sendMessage(`@DidoBotAdmin`, `REPORT OF A USER FROM SURVEY QUESTION 11
    ID: ${ctx.chat.id}
    Mood: ${moodsurveyAge}`);
    var sql = `INSERT INTO moodsurvey (telegram_id, first_name, username, Age) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${moodsurveyAge}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data S11 "${moodsurveyAge}" berhasil ditambahkan ke database`)
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
                    { text: 'Nak', callback_data: 'fortune'},
                    { text: 'Tidak mengapa', callback_data: 'help'}
                ]
            ]
        }
    });    
})

bot.action('fortune', ctx => {
    ctx.reply(`Apa pendapat awak mengenai perbualan hari ini?`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Baik ', callback_data: 'baik'},
                    { text: 'Tidak Baik', callback_data: 'tidakbaik'}
                ]
            ]
            
        }
    })   
   axios.get('http://yerkee.com/api/fortune')
   .then(res => {
       ctx.reply(res.data.fortune);
   }).catch(e => {
       console.log(e);
   })
       
})

bot.command('fortune', ctx => {
    ctx.reply(`Apa pendapat awak mengenai perbualan hari ini?`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Baik ', callback_data: 'baik'},
                    { text: 'Tidak Baik', callback_data: 'tidakbaik'}
                ]
            ]
            
        }
    })   
   axios.get('http://yerkee.com/api/fortune')
   .then(res => {
       ctx.reply(res.data.fortune);
   }).catch(e => {
       console.log(e);
   })
       
})

//random quotes//

//feedback//
bot.action('baik', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let feedbackFeedback= "baik";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `FEEDBACK
    ID: ${ctx.chat.id}
    Mood: ${feedbackFeedback}`);
    var sql = `INSERT INTO feedback (telegram_id, first_name, username, feedback) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${feedbackFeedback}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data feedback "${feedbackFeedback}" berhasil ditambahkan ke database`)
        bot.telegram.sendMessage(`👍🏻`);
        ctx.reply(helpMessage);
        dbcon();
    })
})
bot.action('tidakbaik', ctx => {
    // let input = ctx.message.text.split(" ");
    // if(input.length != 2){
    //     ctx.reply("Anda harus memberi nama mood pada argument ke 2");
    //     return;
    // }
    let feedbackFeedback= "tidak baik";
    bot.telegram.sendMessage(`@DidoBotAdmin`, `FEEDBACK
    ID: ${ctx.chat.id}
    Mood: ${feedbackFeedback}`);
    var sql = `INSERT INTO feedback (telegram_id, first_name, username, feedback) VALUES ('${ctx.chat.id}', '${ctx.chat.first_name}', '${ctx.chat.username}', '${feedbackFeedback}')`;
    conn.query(sql, function(err, result){
        if(err){
            throw err;
        };
        console.log(`data feedback "${feedbackFeedback}" berhasil ditambahkan ke database`)
        bot.telegram.sendMessage(`👍🏻`);
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
                    { text: 'Fakta Depresi', callback_data: '1'},
                    { text: 'Apa itu Depresi?', callback_data: '2'}
                ],
                [
                    { text: 'Video', callback_data: '3'},
                    { text: 'Tips', callback_data: '4'}
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
                    { text: 'Fakta Depresi', callback_data: '1'},
                    { text: 'Apa itu Depresi?', callback_data: '2'}
                ],
                [
                    { text: 'Video', callback_data: '3'},
                    { text: 'Tips', callback_data: '4'}
                ],
                [
                    { text: 'Kembali ke Bantuan', callback_data: 'help'}
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
                    //{ text: '😞', callback_data: 'startmood'}
                ]
            ]
        }
    })
})

bot.action('2', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Sebagai kawan bot kepada awak, saya rasa saya perlu bagitahu tentang apa itu Depresi. Depresi ditakrifkan sebagai kehadiran mood yang tertekan dan / atau hilangnya minat / keseronokan,
digabungkan dengan lima atau lebih gejala berikut: perubahan selera makan atau berat badan, masalah tidur, pergolakan atau keterbelakangan psikomotor, keletihan, perasaan tidak berharga, kehilangan tumpuan, atau pemikiran bunuh diri yang berulang.

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
    bot.telegram.sendMessage(ctx.chat.id, `
Sedihnya apabila awak pernah mengalaminya. Jikalau awak nak perlukan bantuan boleh /helpSOS okay? 

Saya memahami bahawa perasaan pendam itu sangat menyakitkan. Saya harap awak dapat meluahkan perasaan kepada sesiapa yang awak rasa boleh dipercayai.
Jika tidak, awak boleh borak dengan saya :)`, 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Baik Dido', callback_data: 'borak2'}
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
                    { text: 'Tidak mengapa', callback_data: 'borak2'}
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('video', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `https://youtu.be/chE00kGtg48`);
    bot.telegram.sendMessage(ctx.chat.id, `Nak teruskan berborak dengan saya?`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak', callback_data: 'borak2'},
                    { text: 'Tidak mengapa', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('4', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Hai awak nak tahu 5 cara untuk menbantu diri awak dari kemurungan ?',
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Nak!', callback_data: 'tips'},
                    { text: 'Tidak mengapa', callback_data: 'borak2'}
                    //{ text: 'Saya nak luahkan sesuatu', callback_data: 'borak2'}
                ]
            ]
        }
    })
})

bot.action('tips', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `Ada 5 cara! Tekan di bawah untuk tahu lebih lanjut :)`,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '🏃🏻‍♀️', callback_data: 'senaman'},
                    { text: '🍏', callback_data: 'makan'}
                ],
                [
                    { text: '⛅️', callback_data: 'masalah'},
                    { text: '✨', callback_data: 'ekspresi'}
                ],
                [
                    { text: '☘️', callback_data: 'perkara'},
                ],
                [
                    { text: 'Kembali ke Bantuan', callback_data: 'help'},
                ]
            ]
        }
    })
})

bot.action('senaman', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `🏃🏻‍♀️ Senaman 🏃🏻‍♀️
    Berjalan kaki selama 15 hingga 30 minit setiap hari - atau menari, berjoging, atau basikal jika anda mahu. Orang yang mengalami kemurungan mungkin tidak merasa seperti aktif. Tetapi jadikan diri anda tetap melakukannya 
(minta rakan untuk bersenam jika anda perlu diberi motivasi). Sebaik sahaja anda terbiasa dengan latihan, tidak akan mengambil masa yang lama untuk melihat perbezaan mood anda. `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'tips'},
                ]
            ]
        }
    })
})

bot.action('makan', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `🍏 Memelihara diri dengan pemakanan yang baik 🍏
    Kemurungan boleh mempengaruhi selera makan. Seseorang mungkin tidak merasa makan sama sekali, tetapi yang lain mungkin makan berlebihan. Sekiranya kemurungan mempengaruhi makanan anda, anda perlu lebih berhati-hati untuk mendapatkan makanan yang betul. 
Pemakanan yang betul dapat mempengaruhi mood dan tenaga seseorang. Oleh itu, makan banyak buah-buahan dan sayur-sayuran dan dapatkan makanan biasa 
(walaupun anda tidak merasa lapar, cubalah makan sesuatu yang ringan, seperti sepotong buah, agar anda terus berjalan).  `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'tips'},
                ]
            ]
        }
    })
})

bot.action('masalah', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `⛅️ Kenal pasti masalah, tetapi jangan memikirkannya ⛅️
    Cuba kenal pasti keadaan yang menyebabkan kemurungan anda. 
    Apabila anda tahu apa yang membuat anda merasa biru dan mengapa, 
    berbincanglah dengan rakan yang prihatin. 
    Bercakap adalah cara untuk melepaskan perasaan dan menerima pemahaman.  `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'tips'},
                ]
            ]
        }
    })
})

bot.action('ekspresi', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `✨ Ekspresikan diri ✨
    Dengan kemurungan, kreativiti dan keseronokan seseorang mungkin tersekat. Lakukan imaginasi anda (melukis, melukis, mencoret-coret,
menjahit, menulis, menari, menyusun muzik, dan lain-lain) dan anda bukan sahaja membuat jus kreatif mengalir, anda juga melonggarkan beberapa emosi positif. Luangkan masa untuk bermain dengan rakan atau haiwan kesayangan, atau buat sesuatu yang menyeronokkan untuk diri sendiri. 
Cari sesuatu untuk ditertawakan - mungkin filem yang lucu. Ketawa membantu meringankan mood anda.  `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'tips'},
                ]
            ]
        }
    })
})

bot.action('perkara', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `☘️ Cuba perhatikan perkara yang baik ☘️
    Depresi mempengaruhi pemikiran seseorang, menjadikan semuanya kelihatan suram, negatif, dan putus asa. 
Sekiranya anda mengalami kemurungan hanya melihat yang negatif, berusahalah untuk memperhatikan perkara baik dalam hidup. 
Cuba perhatikan satu perkara, kemudian cuba fikirkan satu perkara lagi. Pertimbangkan kekuatan, hadiah, atau berkat anda. 
Yang paling penting, jangan lupa bersabar dengan diri sendiri. Depresi memerlukan masa untuk sembuh. 😚 `,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '😚', callback_data: 'tips'},
                ]
            ]
        }
    })
})
//borak//




bot.launch();
// module.exports = bot

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
