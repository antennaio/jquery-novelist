var chai = require("chai"),
    jsdom = require("jsdom"),
    jQuery = require("jQuery");

var expect = chai.expect;

var window = jsdom.jsdom("<html><body></body></html>").createWindow(),
    document = window.document;

var $ = global.jQuery = jQuery.create(window);


$('<textarea />', {
    'id':'user-input',
    'width':'200',
    'height':'40'
}).appendTo('body');

$('<textarea />', {
    'id':'user-input-with-data-attr',
    'data-max-characters':'1000'
}).appendTo('body');

require("../jquery.novelist");


describe('novelist plugin on init with custom options', function () {

    it('should update defaults', function () {
        var Novelist;
        Novelist = new root.Novelist();
        Novelist.init({
            maxCharacters: 3,
            hardLimit:false
        });
        expect(Novelist.options).to.be.a('object');
        expect(Novelist.options.maxCharacters).to.equal(3);
        expect(Novelist.options.hardLimit).to.equal(false);
        expect(Novelist.options.direction).to.equal('vertical');
    });

});


describe('novelist plugin on show', function () {

    before(function () {
        $('#user-input').novelist();
        $('#user-input-with-data-attr').novelist();
    });

    after(function () {
        $('#user-input').novelist('destroy');
        $('#user-input-with-data-attr').novelist('destroy');
    });

    it('should have data', function () {
        expect($('#user-input').data('novelist')).to.be.a('object');
        expect($('#user-input').data('novelist').currentWidth).to.equal($('#user-input').outerWidth());
        expect($('#user-input').data('novelist').currentHeight).to.equal($('#user-input').outerHeight());
        expect($('#user-input').data('novelist').limit).to.equal(100);
    });

    it('should be able to read character limit from data attribute', function () {
        expect($('#user-input-with-data-attr').data('novelist').limit).to.equal(1000);
    });

    it('should reposition background', function () {
        expect($('#user-input').css('backgroundPosition')).to.equal('left 40px');
    });

});


describe('novelist plugin on show with some input', function () {

    var valuesFromCallback = [];

    before(function () {
        $('#user-input').novelist({
            maxCharacters:10,
            onInput: function(value, characters, percent, limit) {
                valuesFromCallback.push(value, characters, percent, limit);
            }
        });

        $('#user-input').val('Hello').trigger('keyup');
    });

    after(function () {
        $('#user-input').novelist('destroy');
    });

    it('should reposition background', function () {
        expect($('#user-input').css('backgroundPosition')).to.equal('left 20px');
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('Hello');
        expect(valuesFromCallback[1]).to.equal(5);
        expect(valuesFromCallback[2]).to.equal(50);
        expect(valuesFromCallback[3]).to.equal(10);
    });

});


describe('novelist plugin on show with too much input', function () {

    var valuesFromCallback = [];

    before(function () {
        $('#user-input').novelist({
            maxCharacters:10,
            onLimitReached: function(value) {
                valuesFromCallback.push(value);
            }
        });

        $('#user-input').val('This is some input.').trigger('keyup');
    });

    after(function () {
        $('#user-input').novelist('destroy');
    });

    it('should truncate text', function () {
        expect($('#user-input').val()).to.equal('This is so');
    });

    it('should reposition background', function () {
        expect($('#user-input').css('backgroundPosition')).to.equal('left 0px');
    });

    it('should pass correct values to a callback', function () {
        expect(valuesFromCallback[0]).to.equal('This is so');
    });

});