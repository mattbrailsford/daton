QUnit.module("Attributes", () => {

    ['attribute', 'attributes', 'attr', 'attrs'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <a href="www.google.com" data-dtn-${key}="{ 'href' : 'link' }">Link</a>
            </div>`);

            // Act
            let parsed = DATON.parse(el);
            let expected = {
                link: 'www.google.com'
            }

            // Assert
            assert.deepEqual(parsed, expected, `Object matches expected output`);
        
        });

    });

    QUnit.test(`Can parse attribute array syntax`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <a href="www.google.com" title="Google" data-dtn-attr="[ 'href', 'title' ]">Link</a>
        </div>`);

        // Act
        let parsed = DATON.parse(el);
        let expected = {
            href: 'www.google.com',
            title: 'Google'
        }

        // Assert
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

});