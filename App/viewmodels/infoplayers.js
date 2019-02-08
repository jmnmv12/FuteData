define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //Vai buscar a url 
        // De seguida  a var split fica com o q está a seguir à #
        // A var final fica com a id
        var url = window.location.href;
        var site = url.split('#')[1];
        console.log(site)
        var final = site.split('/')[1];
        console.log(final)
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/players/' + final;
        self.className = 'Teams';
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
        getplayersinfo = function () {

            console.log('CALL: getTeams...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.players(data);                                                              
            });            
        };
        //---- initial call
        getplayersinfo();       
    };
    return vm    
});