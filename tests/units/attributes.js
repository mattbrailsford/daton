QUnit.module("Attributes", () => {

    ['attribute', 'attributes', 'attr', 'attrs'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <a href="www.google.com" data-dtn-${key}="{ 'link' : 'href' }">Link</a>
            </div>`);

            // Act
            let parsed = DATON.parse(el);
            let expected = {
                link: 'www.google.com'
            }

            // Assert
            assert.expect(1);
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
        assert.expect(1);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

    QUnit.test(`Can parse single attribute syntax`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <a href="www.google.com" title="Google" data-dtn-attr="href">
                <img src="/image/img.png" data-dtn-attr="src">Link</a>
            </a>
        </div>`);

        // Act
        let parsed = DATON.parse(el);
        let expected = {
            href: 'www.google.com',
            src: '/image/img.png'
        }

        // Assert
        assert.expect(1);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

    QUnit.test(`Can parse attribute with single quotes`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <a href="www.google.com" title="Google" data-dtn-attr="{ 'href\\'s' : 'href', 'title\\'s' : 'title' }">Link</a>
        </div>`);

        // Act
        let parsed = DATON.parse(el);
        let expected = {
            'href\'s': 'www.google.com',
            'title\'s': 'Google'
        }

        // Assert
        assert.expect(1);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

});