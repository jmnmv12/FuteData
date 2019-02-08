define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/players';  
        self.error = ko.observable();
        self.players = ko.observableArray([]);
        self.term = ko.observable('');
        //--- Internal functions
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
        getplayers = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.players(data);
            });
        };
        //---- initial call
        getplayers();

        getPlayers2 = function (searchvalue) {
            console.log('CALL: getplayers term...')
            
            ajaxHelper(baseUri + '/search?srcStr=' + searchvalue, 'GET').done(function (data) {
                self.players(data);
                console.log(data)
            });
        };
        //Procurar players
        this.gPlayers2 = function () {
            getPlayers2(self.term());

        };
        //Delete players
        this.deletePlayers = function () {
            self.players.removeAll()
        };

        
        
    };
    return vm
});