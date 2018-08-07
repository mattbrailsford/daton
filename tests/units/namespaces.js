QUnit.module("Namespaces", () => {

    QUnit.test(`Can change the default namespace`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <div data-test-array="people">
                <div data-test-obj>
                    <h3 data-test-value="name">John</h3>
                    <p data-test-value="role">Director</p>
                    <a href="www.google.com" data-test-attr="{ 'link' : 'href' }">Link</a>
                </div>
                <div data-test-obj>
                    <h3 data-test-value="name">Jane</h3>
                    <p data-test-value="role">Director</p>
                    <a href="www.yahoo.com" data-test-attr="{ 'link' : 'href' }">Link</a>
                </div>
            </div>
        </div>`);

        // Act
        let parsed = DATON.parse(el, 'test');

        let expected = {
            people: [
                {
                    name: 'John',
                    role: 'Director',
                    link: 'www.google.com'
                },
                {
                    name: 'Jane',
                    role: 'Director',
                    link: 'www.yahoo.com'
                }
            ]
        }

        // Assert
        assert.expect(2);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
        assert.deepEqual(DATON.parse(el), {}, "Default parse returns empty object")
    
    });

});