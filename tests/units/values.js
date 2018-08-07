QUnit.module("Values", () => {

    ['value', 'val'].forEach(key => {

        QUnit.test(`Can parse data-dtn-${key} attribute`, (assert) => {

            // Arrange
            let el = createHtml(`<div id="data">
                <div data-dtn-${key}="name">John</div>
            </div>`);
        
            // Act
            let obj = DATON.parse(el);
        
            // Assert
            assert.ok(obj.hasOwnProperty('name'), `Object has matching key`);
            assert.equal(obj.name, "John", `Object value matches template value`);
        
        });

    });
    
    QUnit.test("Error if value attribute has no value", (assert) => {
    
        // Arrange
        let el = createHtml(`<div id="data">
            <div data-dtn-value>John</div>
        </div>`);
    
        // Act/Assert
        assert.throws(function () {
            DATON.parse(el);
        },
        'Throws error when attribte value is empty');
    
    });

});

