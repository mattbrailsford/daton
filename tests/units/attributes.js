QUnit.module("Attributes", () => {

    ['attribute', 'attributes', 'attr', 'attrs'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <a href="www.google.com" data-dtn-${key}="{ 'href' : 'link' }">Link</a>
            </div>`);

            // Act
            let obj = DATON.parse(el);

            // Assert
            assert.ok(obj.hasOwnProperty('link'), `Object has matching key`);
            assert.ok(obj.link === 'www.google.com', `Property values match template`);
        
        });

    });

    QUnit.test(`Can parse attribute array syntax`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <a href="www.google.com" title="Google" data-dtn-attr="[ 'href', 'title' ]">Link</a>
        </div>`);

        // Act
        let obj = DATON.parse(el);

        // Assert
        assert.ok(obj.hasOwnProperty('href') && obj.hasOwnProperty('title'), `Object has matching key`);
        assert.ok(obj.href === 'www.google.com' && obj.title === 'Google', `Property values match template`);
    
    });

});