QUnit.module("Arrays", () => {

    ['array', 'arr'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <ul data-dtn-${key}="items">
                    <li data-dtn-value>Item 1</li>
                    <li data-dtn-value>Item 2</li>
                    <li data-dtn-value>Item 3</li>
                </ul>
            </div>`);
        
            // Act
            let parsed = DATON.parse(el);
            let expected = {
                items: ['Item 1', 'Item 2', 'Item 3']
            }

            // Assert
            assert.deepEqual(parsed, expected, `Object matches expected output`);
        
        });

    });
    
    QUnit.test("Can define array order", (assert) => {

        // Arrange
        let el = createHtml(`<div id="data">
            <ul data-dtn-array="items">
                <li data-dtn-value="1">Item 1</li>
                <li data-dtn-value="0">Item 2</li>
                <li data-dtn-value="2">Item 3</li>
            </ul>
        </div>`);
    
        // Act
        let parsed = DATON.parse(el);
        let expected = {
            items: ['Item 2', 'Item 1', 'Item 3']
        }
        // Assert
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

});