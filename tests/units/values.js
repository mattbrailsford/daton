QUnit.module("Values", () => {

    ['value', 'val'].forEach(key => {

        QUnit.test(`Can parse ${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <div data-dtn-${key}="name">John</div>
            </div>`);
        
            // Act
            let parsed = DATON.parse(el);
            let expected = {
                name: 'John'   
            };
        
            // Assert
            assert.expect(1);
            assert.deepEqual(parsed, expected, `Object matches expected output`);
        
        });

    });
    
    QUnit.test("Error if value attribute has no value", (assert) => {
    
        // Arrange
        let el = createHtml(`<div id="data">
            <div data-dtn-value>John</div>
        </div>`);
    
        // Act/Assert
        assert.expect(1);
        assert.throws(function () {
            DATON.parse(el);
        }, 'Throws error when attribte value is empty');
    
    });
    
    QUnit.test("Can parse object syntax attribute", (assert) => {
    
        // Arrange
        let el = createHtml(`<div id="data">
            <div data-dtn-value="{ 'name': 'Jane' }">John</div>
        </div>`);
    
        // Act/Assert
        let parsed = DATON.parse(el);
        let expected = {
            name: 'Jane'   
        };
    
        // Assert
        assert.expect(1);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

});

