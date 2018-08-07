// Helpers
const createHtml = (html) => {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

// Unit tests
QUnit.test("Can parse value attribute", function (assert) {

    // Arrange
    let el = createHtml(`<div id="data">
        <div data-dtn-value="name">John</div>
    </div>`);

    // Act
    let obj = DATON.parse(el);

    // Assert
    assert.ok(obj.hasOwnProperty('name'), "Object has matching key");
    assert.equal(obj.name, "John", "Object value matches template value");

});