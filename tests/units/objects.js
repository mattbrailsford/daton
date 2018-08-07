QUnit.module("Objects", () => {

    ['object', 'obj'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <div data-dtn-${key}="person">
                    <h3 data-dtn-value="name">John</h3>
                    <p data-dtn-value="role">Director</p>
                </div>
            </div>`);

            // Act
            let parsed = DATON.parse(el);
            let expected = {
                person: {
                    name: 'John',
                    role: 'Director'
                }
            }

            // Assert
            assert.expect(1);
            assert.deepEqual(parsed, expected, `Object matches expected output`);
        
        });

    });

});