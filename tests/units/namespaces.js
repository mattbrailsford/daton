QUnit.module("Namespaces", () => {

    QUnit.test(`Can change the default namespace`, (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <div data-test-array="people">
                <div data-test-obj>
                    <h3 data-test-value="name">John</h3>
                    <p data-test-value="role">Director</p>
                    <a href="www.google.com" data-test-attr="{ 'href':'link' }">Link</a>
                </div>
                <div data-test-obj>
                    <h3 data-test-value="name">Jane</h3>
                    <p data-test-value="role">Director</p>
                    <a href="www.yahoo.com" data-test-attr="{ 'href':'link' }">Link</a>
                </div>
            </div>
        </div>`);

        // Act
        let obj = DATON.parse(el, 'test');

        // Assert
        assert.ok(obj.hasOwnProperty('people'), `Object has matching key`);
        assert.ok(isArray(obj.people), `Object key is the right type`);
        assert.ok(obj.people[0].name === 'John'
            && obj.people[0].link === 'www.google.com'
            && obj.people[1].name === 'Jane'
            && obj.people[1].link === 'www.yahoo.com', 
            `Object has correct property values`);
    
    });

});