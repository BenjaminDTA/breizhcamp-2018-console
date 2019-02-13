var service = require('./service');

exports.start = function () {
    service.init(function (nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });
}
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// version synchrone
//var resultat =  service.init();

// version asynchrone
//service.init(function(resultat) {})

exports.menu = function menu() {
    console.log('************************');
    console.log('1. Rafraichir les données');
    console.log('2. Lister les sessions');
    console.log('99. Quitter');

    rl.question('', function (saisie) {
        console.log(`Vous avez saisi : ${saisie}`);
        if (saisie === '1') {
            service.init(function (nb) {
                console.log('[init]', nb, 'sessions trouvées.')
                console.log('... Données mises à jour');
                menu();
            });
        } else if (saisie === '2') {
            service.listerSession(function (talks) {
                talks.forEach(function (uneSession) {

                    var titre = '';
                    if (uneSession.name) {
                        titre += uneSession.name.toUpperCase()
                    } else {
                        console.log('Pas de titre')
                    }
                    var speakers = '';
                    if (uneSession.speakers) {
                        speakers += uneSession.speakers.toUpperCase()
                    } else {
                        console.log('Pas de Speakers associé à :' + uneSession.name)
                    }

                    console.log(titre + '  ' + '(' + speakers + ')')

                })
                menu();
            });

        } else if (saisie === '99') {
            rl.close();
        }

    });
}