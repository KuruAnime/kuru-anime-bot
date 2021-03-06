// tslint:disable: no-any
const modulesWebhooksRabbit: any = (data: any) => {
    data.axios.post(process.env.WEBHOOK_RABBIT, {
        "content": data.message.content + " - http://rabbit.kuru-anime.com (@everyone)",
        "embeds": [
            {
                "title": "Rabbit",
                "description": "Watch anime with us!\n\n**Link:** http://rabbit.kuru-anime.com",
                "thumbnail": {
                    "url": "https://i.imgur.com/pyqoFns.png"
                },
                "url": "http://rabbit.kuru-anime.com"
            }
        ]
    })
        .then((response: any) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });
};

module.exports = modulesWebhooksRabbit;