define(['knockout', 'plugins/router'], function (ko, router) {
 
    var vm=function () {
        console.log('ViewModel initiated...');
        var url = window.location.href;
        var split = url.split('#')[1];
        var final = split.split('/')[1];
        console.log(final)
        //---Variáveis locais       
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/leagues/' + final;
        console.log(baseUri);
        self.className = 'League Teams';
        self.description = 'This page aims to demonstrate the use of the football web API for Teams and the interconnection with other entities.<br > Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.league = ko.observableArray([]);
        
        
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
        getLeague = function () {
            console.log('CALL: getLeagues especific...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.league(data);
                console.log(data)
            });
        };
        
        //---- initial call
        getLeague();         
    };
    return vm
        
    

    
    


});