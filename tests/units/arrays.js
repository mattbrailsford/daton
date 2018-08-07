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
            let obj = DATON.parse(el);
        
            // Assert
            assert.ok(obj.hasOwnProperty('items'), `Object has matching key`);
            assert.ok(isArray(obj.items), `Object key value is an array`);
            assert.equal(obj.items.length, 3, `Array contains right ammount of items`);
        
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
        let obj = DATON.parse(el);
    
        // Assert
        assert.ok(obj.items[0] === 'Item 2'
            && obj.items[1] === 'Item 1'
            && obj.items[2] === 'Item 3', 
            "Array is in right order");
    
    });

});