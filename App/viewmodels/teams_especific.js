//define(['knockout','jquery'], function (ko,$) {
define(['jquery', 'knockout'], function ($, ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //id da equipa
        //Vai buscar a url 
        // De seguida  a var split fica com o q está a seguir à #
        // A var final fica com a id
        // A var fifa fica com o id da fifa
        var a;
        var indice;
        var url = window.location.href;
        var site = url.split('#')[1];
        console.log(site)
        var final = site.split('/')[1];
        console.log(final)
        var fifa = site.split('/')[2];
        console.log(fifa)       
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams/' + final;
        var seasonUri = 'http://192.168.160.28/football/api/teams/seasons/'       
        self.error = ko.observable();
        self.teams = ko.observableArray([]);
        self.term = ko.observable('');
        self.season = ko.observableArray([]);
        self.tshirts = ko.observableArray([]);
        
        //--- Para obter informação inical sobre equipa
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        //--- Externel functions (accessible outside)
        getTeams = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.teams(data);
                console.log(data);
                
                
                
                
            });
        };
        //---para obter informação sobre season
        getSeason = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(seasonUri, 'GET').done(function (data) {
                self.season(data);
                console.log(data)



            });
        };
        //---para obter informação sobre thsirts
        mostarshirt = function (a) {
            self.tshirts.removeAll();
            console.log(a)

            $('#menuTshirts').slideDown(1000);
            a = a.slice(-2);
            console.log(a)
            for (var i = 0; i <= 3; i++) {
                self.tshirts.push('https://cdn.sofifa.org/' + a + '/kits/' + fifa + '/' + i + '_0.png')
                var x = 'https://cdn.sofifa.org/' + a + '/kits/' + fifa + '/' + i + '_0.png'
                console.log(x)
            }
        } 
        //-- tshirt texto header
        tshirttexto = function (a) {
            document.getElementById('data1').innerHTML = '<h1>' + a + ' Season Kits</h1>'
            console.log(a)

            
        } 
        //-- atributos texto header
        atributostexto = function (a) {
            document.getElementById('data2').innerHTML = '<h1>' + a + ' Team Atributes</h1>'
            console.log(a)


        }
        //--- Array apra atributos
        var atributosUri = seasonUri + final;
        self.infoTeams = ko.observableArray([]);
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        //--- Externel functions (accessible outside)
        // analisa qual é a season
        getInfoTeams = function (a) {
            console.log('CALL: getInfoTeams...')
            if (a == '2016') {
                indice = 0
            }
            if (a == '2015') {
                indice = 1
            }
            if (a == '2014') {
                indice = 2
            }
            if (a == '2013') {
                indice = 3
            }
            if (a == '2012') {
                indice = 4
            }
            if (a == '2011') {
                indice = 5
            }
            if (a == '2010') {
                indice = 6
            }
            if (a == '2009') {
                indice = 7
            }
            console.log(indice)

            ajaxHelper(atributosUri, 'GET').done(function (data) {
                console.log('Buscar...')
                self.infoTeams(data[indice]);
                console.log(data)
            });
        };


        //---- initial call
        getSeason();
        getTeams();
        getInfoTeams();
        

        
        
        

        
        
    };
    
    
    return vm
});