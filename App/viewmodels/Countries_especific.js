define(['knockout', 'plugins/router'], function (ko, router) {

    var vm = function () {
        console.log('ViewModel initiated...');
        //Vai buscar a url 
        // De seguida  a var split fica com o q está a seguir à #
        // A var final fica com a id
        var url = window.location.href;
        var split = url.split('#')[1];
        var final = split.split('/')[1];
        console.log(final)
        //---Variáveis locais       
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/countries/' + final;
        var leagues = 'http://192.168.160.28/football/api/leagues/' + final;
        console.log(baseUri);
        self.className = 'Countries Details';
        self.error = ko.observable();
        self.countries = ko.observableArray([]);
        self.leagues = ko.observableArray([]);


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
        getCountries = function () {
            console.log('CALL: getLeagues especific...')
            ajaxHelper(baseUri, 'GET').done(function (id) {
                self.countries(id);
                console.log(id)
            });
        };
        getLeagues = function () {
            console.log('CALL: getLeagues especific...')
            ajaxHelper(leagues, 'GET').done(function (data) {
                self.leagues(data);
                console.log(data)
            });
        };

        //---- initial call
        getCountries();
        getLeagues();
    };
    return vm
});


