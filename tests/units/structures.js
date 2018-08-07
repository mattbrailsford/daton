QUnit.module("Structures", () => {

    QUnit.test(`Can parse nested attributes`, (assert) => {

        // // Arrange
        let el = createHtml(`<div id="data">
            <div data-dtn-array="people">
                <div data-dtn-obj>
                    <h3 data-dtn-value="name">John</h3>
                    <p data-dtn-value="role">Director</p>
                    <ul data-dtn-array="contacts">
                        <li data-dtn-obj>
                            <h4 data-dtn-value="name">Home</h4>
                            <p>Telephone: <a href="tel:0123456789" data-dtn-value="telephone">0123456789</a></p>
                        </li>
                        <li data-dtn-obj>
                            <h4 data-dtn-value="name">Work</h4>
                            <p>Telephone: <a href="tel:03216549887" data-dtn-value="telephone">0321654987</a></p>
                        </li>
                    </ul>
                    <a href="www.google.com" data-dtn-attr="{ 'href':'link' }">Link</a>
                </div>
                <div data-dtn-obj>
                    <h3 data-dtn-value="name">Jane</h3>
                    <p data-dtn-value="role">Director</p>
                    <ul data-dtn-array="contacts">
                        <li data-dtn-obj>
                            <h4 data-dtn-value="name">Home</h4>
                            <p>Telephone: <a href="tel:0987654321" data-dtn-value="telephone">0987654321</a></p>
                        </li>
                        <li data-dtn-obj>
                            <h4 data-dtn-value="name">Mobile</h4>
                            <p>Telephone: <a href="tel:0789456123" data-dtn-value="telephone">0789456123</a></p>
                        </li>
                    </ul>
                    <a href="www.yahoo.com" data-dtn-attr="{ 'href':'link' }">Link</a>
                </div>
            </div>
        </div>`);

        // // Act
        let parsed = DATON.parse(el);
        let expected = {
            "people": [
                {
                  "name": "John",
                  "role": "Director",
                  "link": "www.google.com",
                  "contacts": [
                    {
                      "name": "Home",
                      "telephone": "0123456789"
                    },
                    {
                      "name": "Work",
                      "telephone": "0321654987"
                    }
                  ]
                },
                {
                  "name": "Jane",
                  "role": "Director",
                  "link": "www.yahoo.com",
                  "contacts": [
                    {
                      "name": "Home",
                      "telephone": "0987654321"
                    },
                    {
                      "name": "Mobile",
                      "telephone": "0789456123"
                    }
                  ]
                }
            ]
        }

        // // Assert
        assert.expect(1);
        assert.deepEqual(parsed, expected, `Object matches expected output`);
    
    });

});